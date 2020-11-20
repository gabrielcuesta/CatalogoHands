import React, { useState, useCallback } from 'react';
import { GetStaticProps } from 'next';

import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { getGames } from '../lib/games';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { Game } from '../types/game';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { createMuiTheme } from '@material-ui/core/styles';
export default function Home({
  props,
}: {
  props: {
    games: Game[];
  };
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [appear, setAppear] = useState(true);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const openFilter = useCallback(() => {
    console.log('a');
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Hands Board Games</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main className={styles.main}>
        <Header handleSearch={handleSearch} />
        <TransitionGroup className={styles.GamesContainer}>
          {props.games
            .filter((game: Game) =>
              search.length > 0
                ? game.game.toUpperCase().includes(search.toUpperCase()) ||
                  game.subdesc.toUpperCase().includes(search.toUpperCase())
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
            // classes={{ colorInherit: 'inherit' }}
            aria-label="filter">
            <FilterListIcon />
          </Fab>
        </div>
      </main>
    </div>
  );
}

Home.getInitialProps = async () => {
  const games = await getGames();
  return { props: { games: games }, revalidate: 43200 };
};
