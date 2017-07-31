import React, {Component} from 'react';

import styles from './FilterMovies.stylesheet.css';

class FilterMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isComponentLoading: true
    }
  }


  render() {
    return(
      <div className={styles.Wrapper}>
        <span>filters here</span>
      </div>
    )
  }
}

export default FilterMovies;
