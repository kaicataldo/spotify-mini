import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

export default function Button({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};
