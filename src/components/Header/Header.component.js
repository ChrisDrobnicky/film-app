import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.stylesheet.css';


const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.navWrapper}>
      <h1 className={styles.appHeading}>
        Movie Picker
        <i className="film big icon"> </i>
      </h1>
      <ul className={styles.navList}>
        <li className={styles.navListItem}><Link to="/searchmovies" className={styles.navLink}>Search Movies</Link></li>
        <li className={styles.navListItem}><Link to="/yourmovies" className={styles.navLink}>Your Movies</Link></li>
        <li className={styles.navListItem}><Link to="/about" className={styles.navLink}>About</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
