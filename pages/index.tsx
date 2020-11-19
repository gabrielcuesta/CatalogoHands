import React, { useState, useCallback } from 'react';
import { GetStaticProps } from 'next';

import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { getGames } from '../lib/games';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { Game } from '../types/game';

export default function Home({ props }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [appear, setAppear] = useState(true);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

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
        <span className={styles.GamesContainer}>
          {props.games
            .filter((game: Game) =>
              search.length > 0
                ? game.game.toUpperCase().includes(search.toUpperCase()) ||
                  game.subdesc.toUpperCase().includes(search.toUpperCase())
                : game,
            )
            .map((game: Game) => (
              <GameCard jogo={game} />
            ))}
        </span>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://github.com/hugohvf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Hugo Fusinato
        </a>
      </footer> */}
    </div>
  );
}

Home.getInitialProps = async () => {
  const games = await getGames();
  return { props: { games: games }, revalidate: 43200 };
};
