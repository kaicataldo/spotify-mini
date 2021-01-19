import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';
import searchSvg from 'open-iconic/svg/magnifying-glass.svg';

export default function SearchBar({ search, searchResults }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setValue(value);
    // TODO This must be debounced
    search(value);
  }

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <span
          className={styles.searchIcon}
          dangerouslySetInnerHTML={{ __html: searchSvg }}
        />
        <input
          className={styles.searchInput}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* TODO: Actually render results */}
        {JSON.stringify(searchResults)}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchResults: PropTypes.object,
  search: PropTypes.func,
};
