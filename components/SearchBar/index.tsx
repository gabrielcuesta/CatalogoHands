import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import styles from './SearchBar.module.scss';

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (e: any) => void;
}) {
  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Pesquisar…"
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
      />
    </div>
  );
}
