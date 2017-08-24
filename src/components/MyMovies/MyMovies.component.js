import React from 'react';
import styles from './MyMovies.stylesheet.css';
import {getMyMovies} from '../../services/services';

const MyMovies = () => (
  <div className={styles.Wrapper}>
    I'm 'Your Movies' Component
  </div>
);

export default MyMovies;
