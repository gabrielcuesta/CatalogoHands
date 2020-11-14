import { GetStaticProps } from "next";

import fetch from "isomorphic-unfetch";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Game } from "../types/game";

export default function Home({ props }) {
  console.log(props.games);
  return (
    <div className={styles.container}>
      <Head>
        <title>Hands Board Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/hugohvf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Hugo Fusinato
        </a>
      </footer>
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(process.env.GAME_SHEET_URL);
  const games: Game[] = await res.json();
  return { props: { games: games }, revalidate: 100 };
};
