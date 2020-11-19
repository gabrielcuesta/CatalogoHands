import React from 'react';
import SearchBar from '../SearchBar';
import styles from './Header.module.scss';

interface Props {
  handleSearch(e: any): void;
}

const Header: React.FC<Props> = ({ handleSearch }) => {
  return (
    <div className={styles.HeaderContainer}>
      <img alt="Logo" className={styles.Logo} src="images/Hands.svg"></img>
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
};

export default Header;
