import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.stylesheet.css';


const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.navWrapper}>
      <h3 className={styles.appHeading}>
        <NavLink to="/" replace className={styles.navLink} >
          <span className={styles.navLinkName}>
            <i className={`film ${window.innerWidth < 570 ? 'large' : 'big'} icon`}/>
            Movie Picker
          </span>
        </NavLink>
      </h3>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <NavLink exact to="/" replace className={styles.navLink} activeClassName={styles.active} >Search Movies</NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink to="/my-movies" replace className={styles.navLink} activeClassName={styles.active} >My Movies</NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink to="/about" replace className={styles.navLink} activeClassName={styles.active} >About</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
