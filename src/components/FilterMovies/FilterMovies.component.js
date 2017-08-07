import React, {Component} from 'react';

import styles from './FilterMovies.stylesheet.css';

const votes = ['Any', '0-1000', '1000-5000', '5000-10000', '10000-'];
const votesOptions = votes.map(vote => {
  return <option value={vote} key={vote}>{vote}</option>
});

class FilterMovies extends Component {
  constructor() {
    super();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.generateNumericalOptions = this.generateNumericalOptions.bind(this);
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
      ratingMin: {
        apiName: 'vote_average.gte',
        value: 0
      },
      ratingMax: {
        apiName: 'vote_average.lte',
        value: 10
      }
    };
  }

  handleSelectChange(event, isRange) {
    const targetSelect = event.target.name;
    const objToSave = {
      apiName: this.state[targetSelect].apiName,
      value: (!isRange ? Number(event.target.value) : event.target.value.split('-'))
    };
    this.setState({
      [targetSelect]: objToSave
    });
  }

  handleSearchClick() {
    this.props.updateMovies(this.state);
  }

  generateNumericalOptions(min, max) {
    const numbers = [];
    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }
    const numericalOptions = numbers.map(number =>
    <option value={number} key={number}>{number}</option>
    );
    return numericalOptions.reverse();
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
              {this.generateNumericalOptions(1950, this.state.releaseYearTo.value || new Date().getFullYear())}
            </select>
            <label htmlFor="releaseYearTo">Year to:</label>
            <select
              className=""
              id="releaseYearTo"
              name="releaseYearTo"
              value={this.state.releaseYearTo.value}
              onChange={this.handleSelectChange}
            >
              {this.generateNumericalOptions(this.state.releaseYearFrom.value || 1950, new Date().getFullYear())}
            </select>
          </fieldset>
          <fieldset>
            <legend>Votes</legend>
            <label htmlFor="votesMin">Range:</label>
            <select
              className=""
              id="votes"
              name="votes"
              value={this.state.votes.value === 'Any' ? 'Any' : `${this.state.votes.value[0]}-${this.state.votes.value[1]}`}
              onChange={event => this.handleSelectChange(event, true)}
            >
              {votesOptions}
            </select>
          </fieldset>
          <fieldset>
            <legend>Rating:</legend>
            <label htmlFor="ratingMin">Min:</label>
            <select
              className=""
              id="ratingMin"
              name="ratingMin"
              value={this.state.ratingMin.value}
              onChange={this.handleSelectChange}
            >
              {this.generateNumericalOptions(0, this.state.ratingMax.value || 10)}
            </select>
            <label htmlFor="ratingMax">Max:</label>
            <select
              className=""
              id="ratingMax"
              name="ratingMax"
              value={this.state.ratingMax.value}
              onChange={this.handleSelectChange}
            >
              {this.generateNumericalOptions(this.state.ratingMin.value || 0, 10)}
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
