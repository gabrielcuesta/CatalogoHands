import React, { memo, MutableRefObject, Ref } from 'react';
import SearchBar from '../SearchBar';
import styles from './Header.module.scss';

interface Props {
  handleSearch(e: any): void;
  refSearch?: MutableRefObject<any>;
  search: string;
  clearSearch: () => void;
}

const Header = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className={styles.HeaderContainer}>
      <img alt="Logo" className={styles.Logo} src="images/Hands.svg"></img>
      <SearchBar ref={ref} {...props} />
    </div>
  );
});

export default memo(Header);
