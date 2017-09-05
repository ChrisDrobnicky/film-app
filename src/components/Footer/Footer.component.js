import React from 'react';
import styles from './Footer.stylesheet.css';

const Footer = () => (
  <footer className={styles.Footer}>
    <p className={styles.footerText}>
      &copy; Krzysztof Drobnicki
      <a href="https://github.com/ChrisDrobnicky">
        <i className="github big icon"></i>
      </a>
    </p>
  </footer>
);

export default Footer;