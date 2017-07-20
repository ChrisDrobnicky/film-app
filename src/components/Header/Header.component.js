import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.stylesheet.css';


const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.navWrapper}>
      <h1 className={styles.appHeading}>
        <Link to="/" replace className={styles.navLink}>
          Movie Picker
          <i className="film big icon"> </i>
        </Link>
      </h1>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link to="/" replace className={styles.navLink}>Search Movies</Link>
        </li>
        <li className={styles.navListItem}>
          <Link to="/your-movies" replace className={styles.navLink}>Your Movies</Link>
        </li>
        <li className={styles.navListItem}>
          <Link to="/about" replace className={styles.navLink}>About</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
