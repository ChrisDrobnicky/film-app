import React, {Component} from 'react';

import styles from './FilterMovies.stylesheet.css';

const votes = ['Any', '0-1000', '1000-5000', '5000-10000', '10000-'];

const votesOptions = votes.map(vote => {
  return <option value={vote.split('-')} key={vote}>{vote}</option>
});

class FilterMovies extends Component {
  constructor() {
    super();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.generateYearOptions = this.generateYearOptions.bind(this);
    this.state = {
      releaseYearFrom: {
        apiName: 'primary_release_date.gte',
        value: new Date().getFullYear()
      },
      releaseYearTo: {
        apiName: 'primary_release_date.lte',
        value: new Date().getFullYear()
      },
      votes: {
        apiName: ['vote_count.gte', 'vote_count.lte'],
        value: 'Any'
      },
    };
  }

  handleSelectChange(event) {
    const targetSelect = event.target.name;
    const objToSave = {
      apiName: this.state[targetSelect].apiName,
      value: (targetSelect !== 'votes' ? Number(event.target.value) : event.target.value)
    };
    this.setState({
      [targetSelect]: objToSave
    });
  }

  handleSearchClick() {
    this.props.updateMovies(this.state);
  }

  generateYearOptions(yearFrom, yearTo) {
    const years = [];
    for (let i = yearFrom; i <= yearTo; i++) {
      years.push(i);
    }
    const yearOptions = years.map(year =>
    <option value={year} key={year}>{year}</option>
    );
    return yearOptions.reverse();
  }

  render() {
    return(
      <div className={styles.Wrapper}>
        <fieldset>
          <legend className={styles.filterHeader}>Set filters:</legend>
          <fieldset>
            <legend>Release date</legend>
            <label htmlFor="releaseYearFrom">Year from:</label>
            <select
              className=""
              id="releaseYearFrom"
              name="releaseYearFrom"
              value={this.state.releaseYearFrom.value}
              onChange={this.handleSelectChange}
            >
              {this.generateYearOptions(1950, this.state.releaseYearTo.value || new Date().getFullYear())}
            </select>
            <label htmlFor="releaseYearTo">Year to:</label>
            <select
              className=""
              id="releaseYearTo"
              name="releaseYearTo"
              value={this.state.releaseYearTo.value}
              onChange={this.handleSelectChange}
            >
              {this.generateYearOptions(this.state.releaseYearFrom.value || 1950, new Date().getFullYear())}
            </select>
          </fieldset>
          <fieldset>
            <legend>Votes</legend>
            <label htmlFor="votesMin">Range:</label>
            <select
              className=""
              id="votes"
              name="votes"
              value={this.state.votes.value}
              onChange={this.handleSelectChange}
            >
              {votesOptions}
            </select>
          </fieldset>
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
