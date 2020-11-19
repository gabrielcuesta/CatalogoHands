import React, { useState } from 'react';
import styles from './GameCard.module.scss';

const GameCard = (props) => {
  return (
    <div className={styles.Card}>
      <div className={styles.CardName}>
        <p className={styles.TitleText}>{props.jogo.game}</p>
      </div>

      <div className={styles.CardContainer}>
        <div></div>
        <div className={styles.MiddleContainer}>
          <div className={styles.TextContainer}>
            <p className={styles.TextSubdesc}>{props.jogo.subdesc}</p>
          </div>
          <img
            className={styles.MainImage}
            mode="contain"
            src={props.jogo.imgMain}
          />
        </div>

        <div className={styles.FooterContainer}>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/players.svg" />
            <p className={styles.TextDesc}>
              {props.jogo.minPlayers == props.jogo.maxPlayers
                ? props.jogo.maxPlayers
                : props.jogo.minPlayers + ' a ' + props.jogo.maxPlayers}
            </p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/age.svg" />
            <p className={styles.TextDesc}>+{props.jogo.minAge}</p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/time.svg" />
            <p className={styles.TextDesc}>
              {props.jogo.minTime} - {props.jogo.maxTime} min
            </p>
          </div>
          <div className={styles.Division}></div>
          <div className={styles.DescContainer}>
            <img className={styles.FooterIcon} src="images/difficulty.svg" />
            <p className={styles.TextDesc}>
              {props.jogo.difficulty == 1
                ? 'Fácil'
                : props.jogo.difficulty == 2
                ? 'Médio'
                : props.jogo.difficulty == 3
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
