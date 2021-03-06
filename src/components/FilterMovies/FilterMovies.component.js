import React, {Component} from 'react';
import Select from 'react-select';
import omit from 'lodash/omit';
import 'react-select/dist/react-select.css';

import {getGenres} from '../../services/services';
import styles from './FilterMovies.stylesheet.css';

const votes = ['Any', '0-1000', '1000-5000', '5000-10000', '10000-'];
const votesOptions = votes.map(vote => {
  return <option value={vote} key={vote}>{vote}</option>
});

class FilterMovies extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.generateNumericalOptions = this.generateNumericalOptions.bind(this);
    this.generateGenresOptions = this.generateGenresOptions.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);

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
      },
      genresOptions: [],
      genres: {
        apiName: 'with_genres',
        value: [],
        isList: true
      },
      runtimeMin: {
        apiName: 'with_runtime.gte',
        value: 0
      },
      runtimeMax: {
        apiName: 'with_runtime.lte',
        value: 300
      },
    };
  }

  componentDidMount() {
    this.generateGenresOptions();
  }

  handleChange(event, isRange) {
    const targetSelect = event.target.name;
    const objToSave = {
      apiName: this.state[targetSelect].apiName,
      value: (!isRange ? Number(event.target.value) : event.target.value.split('-'))
    };
    this.setState({
      [targetSelect]: objToSave
    });
  }

  handleGenreSelect(value) {
    const objToSave = {
      apiName: this.state.genres.apiName,
      isList: this.state.genres.isList,
      value: value
    };
    this.setState({
      genres: objToSave
    })
  }

  handleSearchClick(status) {
    this.props.updateMovies(omit(this.state, 'genresOptions'), status);
  }

  generateGenresOptions() {
    getGenres().then(res => {
      const genresOptions = res.data.genres.map(genre => {
        return {
          value: genre.id,
          label: genre.name
        }
      });
      this.setState({genresOptions})
    });
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
      <div className={`ui compact form ${styles.Wrapper}`}>
        <fieldset className="field">
          <legend className="ui brown ribbon big label">Set filters:</legend>
          <div className="two fields">
            <fieldset className="field">
              <legend className="ui brown horizontal label">
                <i className="hashtag large icon"></i>
                Genres
              </legend>
              <Select
                name="form-field-name"
                value={this.state.genres.value}
                options={this.state.genresOptions}
                isLoading={this.state.genresOptions.length === 0}
                multi={true}
                onChange={this.handleGenreSelect}
              />
            </fieldset>
            <fieldset className="field">
              <legend className="ui brown horizontal label">
                <i className="calendar outline large icon"></i>
                Release Year
              </legend>
              <label htmlFor="releaseYearFrom">From:</label>
              <select
                id="releaseYearFrom"
                name="releaseYearFrom"
                value={this.state.releaseYearFrom.value}
                onChange={this.handleChange}
              >
                {this.generateNumericalOptions(1930, this.state.releaseYearTo.value || new Date().getFullYear())}
              </select>
              <label htmlFor="releaseYearTo">To:</label>
              <select
                id="releaseYearTo"
                name="releaseYearTo"
                value={this.state.releaseYearTo.value}
                onChange={this.handleChange}
              >
                {this.generateNumericalOptions(this.state.releaseYearFrom.value || 1930, new Date().getFullYear())}
              </select>
            </fieldset>
          </div>
          <div className="three fields">
            <fieldset className="field">
              <legend className="ui brown horizontal label">
                <i className="empty star large icon"></i>
                Rating
              </legend>
              <label htmlFor="ratingMin">Min:</label>
              <select
                id="ratingMin"
                name="ratingMin"
                value={this.state.ratingMin.value}
                onChange={this.handleChange}
              >
                {this.generateNumericalOptions(0, this.state.ratingMax.value || 10)}
              </select>
              <label htmlFor="ratingMax">Max:</label>
              <select
                id="ratingMax"
                name="ratingMax"
                value={this.state.ratingMax.value}
                onChange={this.handleChange}
              >
                {this.generateNumericalOptions(this.state.ratingMin.value || 0, 10)}
              </select>
            </fieldset>
            <fieldset className="field">
              <legend className="ui brown horizontal label">
                <i className="users large icon"></i>
                Votes
              </legend>
              <label htmlFor="votesMin">Range</label>
              <select
                id="votes"
                name="votes"
                value={this.state.votes.value === 'Any' ? 'Any' : `${this.state.votes.value[0]}-${this.state.votes.value[1]}`}
                onChange={event => this.handleChange(event, true)}
              >
                {votesOptions}
              </select>
            </fieldset>
            <fieldset className="field">
              <legend className="ui brown horizontal label">
                <i className="hourglass empty large icon"></i>
                Runtime (minutes)
              </legend>
              <label htmlFor="runtimeMin">Min:</label>
              <input
                id="runtimeMin"
                name="runtimeMin"
                type="number"
                min="0"
                max={this.state.runtimeMax.value}
                step="15"
                value={this.state.runtimeMin.value}
                onChange={this.handleChange}
              />
              <label htmlFor="runtimeMax">Max:</label>
              <input
                id="runtimeMax"
                name="runtimeMax"
                type="number"
                min={this.state.runtimeMin.value}
                step="15"
                value={this.state.runtimeMax.value}
                onChange={this.handleChange}
              />
            </fieldset>
          </div>
          <div className={styles.filterButtons}>
            <div className={`ui ${window.innerWidth < 570 ? 'tiny' : 'medium'} buttons`}>
              <button
                className={`${styles.searchButton} ui ${window.innerWidth < 570 ? 'tiny' : 'medium'} teal button`}
                onClick={() => this.handleSearchClick(false)}
              >
                Search
              </button>
              <div className="or"></div>
              <button
                className={`${styles.randomSearchButton} ui ${window.innerWidth < 570 ? 'tiny' : 'medium'} grey button`}
                onClick={() => this.handleSearchClick(true)}
                title="Just pick one movie for me based on filters"
              >
                Random Search
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}

export default FilterMovies;
