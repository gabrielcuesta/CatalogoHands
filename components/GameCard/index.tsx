import React, { useState } from 'react';
import { Game } from '../../types/game';
import styles from './GameCard.module.scss';

const GameCard = ({ jogo }: { jogo: Game }) => {
  return (
    <div className={styles.Card}>
      <div className={styles.CardName}>
        <p className={styles.TitleText}>{jogo.game}</p>
      </div>

      <div className={styles.CardContainer}>
        <div></div>
        <div className={styles.MiddleContainer}>
          <div className={styles.TextContainer}>
            <p className={styles.TextSubdesc}>{jogo.subdesc}</p>
          </div>
          <img className={styles.MainImage} src={jogo.imgMain} />
        </div>

        <div className={styles.FooterContainer}>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/players.svg" />
            <p className={styles.TextDesc}>
              {jogo.minPlayers == jogo.maxPlayers
                ? jogo.maxPlayers
                : jogo.minPlayers + ' a ' + jogo.maxPlayers}
            </p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/age.svg" />
            <p className={styles.TextDesc}>
              +{jogo.minAge.toString().replace('+', '')}
            </p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/time.svg" />
            <p className={styles.TextDesc}>
              {jogo.minTime} - {jogo.maxTime} min
            </p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/difficulty.svg" />
            <p className={styles.TextDesc}>
              {jogo.difficulty == 1
                ? 'Fácil'
                : jogo.difficulty == 2
                ? 'Médio'
                : jogo.difficulty == 3
                ? 'Difícil'
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
