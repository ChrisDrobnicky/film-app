import React from 'react';

import styles from './Header.stylesheet.css';

const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.navWrapper}>
      <div className={styles.appLogo}>
        Movie Picker
        <i className="film big icon"> </i>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navListItem}><a href="#" className={styles.navLink}>Search Movies</a></li>
        <li className={styles.navListItem}><a href="#" className={styles.navLink}>Your Movies</a></li>
        <li className={styles.navListItem}><a href="#" className={styles.navLink}>About</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
