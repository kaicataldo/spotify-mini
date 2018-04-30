import React from 'react';
import PropTypes from 'prop-types';
import styles from './BottomBar.css';

export default function BottomBar({ children }) {
  return <div className={styles.bottomBar}>{children}</div>;
}

BottomBar.propTypes = {
  children: PropTypes.node
};
