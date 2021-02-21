import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import styles from '../styles/Home.module.scss'
import { getGames } from '../lib/games'
import Header from '../components/Header'
import GameCard from '../components/GameCard'
import { Game } from '../types/game'
import { Filter } from '../types/filter'
import Fab from '@material-ui/core/Fab'
import FilterListIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import Filters from '../components/Filters'
import InfiniteScroll from 'react-infinite-scroll-component'

const mobileItemsPerPage = 5
const desktopItemsPerPage = 15
export default function Home({
  props,
}: {
  props: {
    games: Game[]
  }
}) {
  const [search, setSearch] = useState('')
  const [filterModalOn, setFilterModalOn] = useState(false)
  const [filter, setFilter] = useState<Filter>({})
  const [showSearchFab, setShowSearchFab] = useState(true)
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [maxItemsPerPage, setMaxItemsPerPage] = useState<number>(15)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 767 ? setMaxItemsPerPage(desktopItemsPerPage) : setMaxItemsPerPage(mobileItemsPerPage)
    }
  }, [])

  const searchRef = useRef<any>(null)

  const clearSearch = () => {
    setSearch('')
  }

  const handleSearch = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const openFilter = useCallback(() => {
    if (window.innerWidth <= 380) setShowSearchFab(false)
    setFilterModalOn(true)
  }, [])

  const focusSearch = useCallback(() => {
    window.scrollTo(0, 0)
    searchRef?.current?.focus()
  }, [])

  const closeModalFilter = () => {
    setFilterModalOn(false)
    if (window.innerWidth <= 380) setShowSearchFab(true)
  }

  const isFiltered = () =>
    filter?.players ||
    filter?.time ||
    filter?.classic ||
    filter?.party ||
    filter?.strategy ||
    filter?.easy ||
    filter?.medium ||
    filter?.hard ||
    search.length > 0

  const filterGame = (game: Game) => {
    const isSearched =
      search.length > 0
        ? game.game
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              search
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            ) ||
          game.subdesc
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              search
                .toUpperCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            )
        : true

    const havePlayers = filter?.players ? filter.players <= game.maxPlayers && filter.players >= game.minPlayers : true

    const haveTime = filter?.time ? filter.time <= game.maxTime && filter.time >= game.minTime : true

    const difficultySelected =
      filter?.easy && filter?.medium && filter?.hard
        ? true
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
        : true

    const typeSelected =
      filter?.classic && filter?.party && filter?.strategy
        ? true
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
        : true

    return isSearched && havePlayers && haveTime && difficultySelected && typeSelected
  }

  const filteredGames = useMemo(
    () => (isFiltered() ? props.games.filter((game: Game) => filterGame(game)) : props.games),
    [search, filter]
  )

  const paginatedGames = useMemo(() => {
    return filteredGames.slice(0, (page + 1) * maxItemsPerPage)
  }, [filteredGames, maxItemsPerPage, page, filter, search])

  const nextGames = useCallback(() => {
    setPage(page => page + 1)
    setHasMore(!(filteredGames.length <= paginatedGames.length))
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header handleSearch={handleSearch} ref={searchRef} search={search} clearSearch={clearSearch} />

        <div>
          <InfiniteScroll
            className={styles.GamesContainer}
            dataLength={paginatedGames.length}
            next={nextGames}
            hasMore={hasMore}
            loader={<div className={styles.spinner}></div>}
          >
            {paginatedGames.map((game: Game, index) => (
              <GameCard jogo={game} key={index} />
            ))}
            {paginatedGames.length === 0 && (
              <p className={styles.noGamesFound}>Não encontramos nenhum jogo com sua busca 😔</p>
            )}
          </InfiniteScroll>
        </div>

        <div className={styles.filterButtonContainer}>
          <Fab size="medium" color="primary" onClick={openFilter} aria-label="filter-button">
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
            <Fab size="medium" color="primary" onClick={focusSearch} aria-label="search-button">
              <SearchIcon />
            </Fab>
          </div>
        )}
      </main>
      <a className={styles.jabaContainer} target="_blank" href="https://www.linkedin.com/in/hugo-fusinato/">
        <div>
          <p className={styles.jabaText}>Desenvolvido por:</p>
          <p className={styles.jabaTextName}>Hugo Fusinato</p>
        </div>

        <img className={styles.jabaImage} src="images/hugo.jpeg"></img>
      </a>
    </div>
  )
}

Home.getInitialProps = async () => {
  const games = await getGames()
  return {
    props: { games: games.filter(game => game.subdesc.length > 0) },
    revalidate: 43200,
  }
}
