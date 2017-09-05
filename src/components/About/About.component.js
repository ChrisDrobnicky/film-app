import React from 'react';

import styles from './About.css';

const About = () => (
  <div className={styles.Wrapper}>
    <p>
      Movie Picker gives you possibility to search for movies and TV shows based on filters.
    </p>
    <p>Choose "Search" to see list of movies based on your filters.
      Choose "Random Search" to pick just one movie based on filters.
    </p>
    <p>You can also create your own movie list.</p>
    <p>
      Movie Picker uses The Movie Database API.
    </p>
    <p>Click here to find out more:
      <a href="https://www.themoviedb.org/" target="_blank">
        <i className="linkify icon"/>
      </a>
    </p>
  </div>
);

export default About;
