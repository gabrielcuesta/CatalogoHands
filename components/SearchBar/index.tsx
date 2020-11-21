import React, { MutableRefObject, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InputBase from '@material-ui/core/InputBase';

import styles from './SearchBar.module.scss';

interface Props {
  handleSearch(e: any): void;
  search: string;
  clearSearch: () => void;
}

const SearchBar = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
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
      onChange={props.handleSearch}
      inputRef={ref}
      value={props.search}
    />
    {props.search.length > 0 && (
      <button onClick={props.clearSearch} className={styles.clearSearchIcon}>
        <HighlightOffIcon />
      </button>
    )}
  </div>
));

export default SearchBar;
