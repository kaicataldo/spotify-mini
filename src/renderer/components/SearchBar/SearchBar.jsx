import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.css';
import searchSvg from 'open-iconic/svg/magnifying-glass.svg';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });

    // TODO This must be debounced
    this.props.search(value);
  }

  render() {
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
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {/* TODO: Actually render results */ JSON.stringify(
            this.props.searchResults
          )}
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchResults: PropTypes.object,
  search: PropTypes.func
};
