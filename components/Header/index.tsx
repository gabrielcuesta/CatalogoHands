import React from 'react';
import SearchBar from '../SearchBar';
import styles from './Header.module.scss';

export default function Header(props) {
  return (
    <div className={styles.HeaderContainer}>
      <img alt="Logo" className={styles.Logo} src="images/Hands.svg"></img>
      <SearchBar handleSearch={props.handleSearch} />
    </div>
  );
}
