import React, { useState, useCallback, useRef } from 'react';
import styles from '../styles/Home.module.scss';
import { getGames } from '../lib/games';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { Game } from '../types/game';
import { Filter } from '../types/filter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Filters from '../components/Filters';

export default function Home({
  props,
}: {
  props: {
    games: Game[];
  };
}) {
  const [search, setSearch] = useState('');
  const [appear, setAppear] = useState(true);
  const [filterModalOn, setFilterModalOn] = useState(false);
  const [filter, setFilter] = useState<Filter>({});
  const [showSearchFab, setShowSearchFab] = useState(true);
  const searchRef = useRef<any>(null);

  const clearSearch = () => {
    setSearch('');
  };

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const openFilter = useCallback(() => {
    if (window.innerWidth <= 380) setShowSearchFab(false);
    setFilterModalOn(true);
  }, []);

  const focusSearch = useCallback(() => {
    window.scrollTo(0, 0);
    searchRef?.current?.focus();
  }, []);

  const closeModalFilter = () => {
    setFilterModalOn(false);
    if (window.innerWidth <= 380) setShowSearchFab(true);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header
          handleSearch={handleSearch}
          ref={searchRef}
          search={search}
          clearSearch={clearSearch}
        />

        <TransitionGroup className={styles.GamesContainer}>
          {props.games
            .filter((game: Game) =>
              search.length > 0
                ? game.game.toUpperCase().includes(search.toUpperCase()) ||
                  game.subdesc.toUpperCase().includes(search.toUpperCase())
                : game,
            )
            .filter((game: Game) =>
              filter?.players
                ? filter.players <= game.maxPlayers &&
                  filter.players >= game.minPlayers
                : game,
            )
            .filter((game: Game) =>
              filter?.time
                ? filter.time <= game.maxTime && filter.time >= game.minTime
                : game,
            )
            .filter((game: Game) =>
              filter?.easy && filter?.medium && filter?.hard
                ? game
                : filter?.easy && filter?.medium
                ? game.difficulty == 1 || game.difficulty == 2
                : filter?.easy && filter?.hard
                ? game.difficulty == 1 || game.difficulty == 3
                : filter?.medium && filter?.hard
                ? game.difficulty == 2 || game.difficulty == 3
                : filter?.easy
                ? game.difficulty === 1
                : filter?.medium
                ? game.difficulty === 2
                : filter?.hard
                ? game.difficulty === 3
                : game,
            )
            .filter((game: Game) =>
              filter?.classic && filter?.party && filter?.strategy
                ? game
                : filter?.classic && filter?.party
                ? game.type == 1 || game.type == 2
                : filter?.classic && filter?.strategy
                ? game.type == 1 || game.type == 3
                : filter?.party && filter?.strategy
                ? game.type == 2 || game.type == 3
                : filter?.classic
                ? game.type === 1
                : filter?.party
                ? game.type === 2
                : filter?.strategy
                ? game.type === 3
                : game,
            )
            .map((game: Game, index) => (
              <CSSTransition
                in={appear}
                appear={true}
                timeout={500}
                key={index}>
                <GameCard jogo={game} />
              </CSSTransition>
            ))}
        </TransitionGroup>

        <div className={styles.filterButtonContainer}>
          <Fab
            size="medium"
            color="primary"
            onClick={openFilter}
            aria-label="filter-button">
            <FilterListIcon />
          </Fab>
          <Filters
            isVisible={filterModalOn}
            closeModalFilter={closeModalFilter}
            setFilter={setFilter}
            clearSearch={clearSearch}
          />
        </div>
        {showSearchFab && (
          <div className={styles.filterSearchContainer}>
            <Fab
              size="medium"
              color="primary"
              onClick={focusSearch}
              aria-label="search-button">
              <SearchIcon />
            </Fab>
          </div>
        )}
      </main>
      <a
        className={styles.jabaContainer}
        target="_blank"
        href="https://www.linkedin.com/in/hugo-fusinato/">
        <div>
          <p className={styles.jabaText}>Desenvolvido por:</p>
          <p className={styles.jabaTextName}>Hugo Fusinato</p>
        </div>

        <img
          className={styles.jabaImage}
          src="https://media-exp1.licdn.com/dms/image/C4D03AQGILXP4OKOLFA/profile-displayphoto-shrink_200_200/0?e=1611187200&v=beta&t=VcU6pN8OJH3aAkYmZ1KwLhI4wHJvXTZm80hDygktm1s"></img>
      </a>
    </div>
  );
}

Home.getInitialProps = async () => {
  const games = await getGames();
  return {
    props: { games: games.filter((game) => game.subdesc.length > 0) },
    revalidate: 43200,
  };
};
