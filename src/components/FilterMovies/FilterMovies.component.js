import React, {Component} from 'react';

import styles from './FilterMovies.stylesheet.css';

const years = [];
for (let i = 1900; i <= (new Date().getFullYear()); i++) {
  years.push(i);
}
const option = years.map(year =>
  <option value={year} key={year}>{year}</option>
);

class FilterMovies extends Component {
  constructor() {
    super();
    this.state = {
      releaseYearFrom: {
        apiName: 'primary_release_date.gte',
        value: new Date().getFullYear()
      },
      releaseYearTo: {
        apiName: 'primary_release_date.lte',
        value: new Date().getFullYear()
      }
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    debugger;
    const targetSelect = event.target.name;
    debugger;
    this.setState({
      [targetSelect]:{value: event.target.value}
    });

  }


  render() {
    return(
      <div className={styles.Wrapper}>
        <fieldset>
          <legend className={styles.filterHeader}>Set filters:</legend>
          <label htmlFor="releaseYearFrom">Year from:</label>
          <select
            className=""
            id="releaseYearFrom"
            name="releaseYearFrom"
            value={this.state.releaseYearFrom.value}
            onChange={this.handleSelectChange}
          >
            {option}
          </select>
          <label htmlFor="releaseYearTo">Year to:</label>
          <select
            className=""
            id="releaseYearTo"
            name="releaseYearTo"
            value={this.state.releaseYearTo.value}
            onChange={this.handleSelectChange}
          >
            {option}
          </select>
          <button className="positive ui tiny button">Search</button>
        </fieldset>
      </div>
    )
  }
}

export default FilterMovies;
