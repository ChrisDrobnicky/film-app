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
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
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
  }

  handleSelectChange(event) {
    const targetSelect = event.target.name;
    const objToSave = {
      apiName: this.state[targetSelect].apiName,
      value: Number(event.target.value)
    };
    this.setState({
      [targetSelect]: objToSave
    });
  }

  handleSearchClick() {
    this.props.updateMovies(this.state);
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
          <button
            className="positive ui tiny button"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </fieldset>
      </div>
    )
  }
}

export default FilterMovies;
