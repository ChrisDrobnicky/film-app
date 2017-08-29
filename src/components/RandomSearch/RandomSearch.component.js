import React, {Component} from 'react';
import styles from './RandomSearch.stylesheet.css';
import config from '../../config';
import {getMovieDetails, saveMyMovie, deleteMyMovie, getMyMovies} from '../../services/services';

class RandomSearch extends Component {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleMyMoviesClick = this.handleMyMoviesClick.bind(this);
    this.isMovieInMyMovies = this.isMovieInMyMovies.bind(this);
    this.state = {
      genres: [],
      runtime: '',
      isMovieInMyMovies: false
    }
  }

  componentDidMount() {
    getMovieDetails(this.props.id).then(res => {
      const genres = res.data.genres.map(genre => {
        return genre.name;
      });
      const runtime = res.data.runtime;
      const isMovieInMyMovies = this.isMovieInMyMovies(this.props.id);
      this.setState({
        genres,
        runtime,
        isMovieInMyMovies
      })
    })
  }

  handleDetailsClick(movieID) {
    this.props.saveMovieID(movieID);
  }

  handleMyMoviesClick() {
    let isMovieInMyMovies = this.state.isMovieInMyMovies;
    let myMovie = {
      id: this.props.id,
      title: this.props.title,
      poster: this.props.posterPath,
      genres: this.state.genres,
      rating: this.props.voteAverage,
      votes: this.props.voteCount,
      releaseYear: this.props.releaseYear,
      runtime: this.state.runtime,
      overview: this.props.overview
    };
    let myMovieID = this.props.id;
    isMovieInMyMovies ? deleteMyMovie(myMovieID) : saveMyMovie(myMovie);
    this.setState( (prevState) => {
      return {isMovieInMyMovies: !prevState.isMovieInMyMovies }
    })
  }

  isMovieInMyMovies(movieID) {
    let myMovies = getMyMovies();
    let myMovie = myMovies.find( (movie) => {
        return movie.id === movieID
      }
    );
    return !!myMovie;
  }

  render() {
    const imageBaseURL = config.imageBaseURL;
    const imageMedium = config.imageMedium;
    const genreToDisplay = this.state.genres.map((genre, index) => {
      return index === this.state.genres.length - 1 ? genre : `${genre}, `;
    });
    const runtimeHours = Math.floor(this.state.runtime / 60);
    const runtimeMinutes = this.state.runtime % 60;

    return (
      <div className={styles.wrapper}>
        <div className="ui card">
          <div
            className={`content ${styles.mainContent}`}
            onClick={(status, movieID) => this.handleDetailsClick(true, this.props.id)}
            title="Show movie details"
          >
            <div className={styles.titleWrapper}>
              <h3 className="header">{this.props.title}</h3>
            </div>
            <div className={`meta ${styles.dateWrapper}`}>
              <span className="date">({this.props.releaseYear})</span>
            </div>
            <div className={styles.imageWrapper}>
              <div className="image">
                <img src={`${imageBaseURL}${imageMedium}${this.props.posterPath}`} alt="Movie Poster"/>
              </div>
            </div>
            <div className="description">
              {this.props.overview}
            </div>
          </div>
          <div className="content">
            <div className={styles.contentWrapper}>
              <span className={styles.rating}>
                <i className="yellow star large icon"/>
                {this.props.voteAverage}/10 ({this.props.voteCount} votes)
              </span>
              <span className={styles.runtime}>
                <i className="hourglass empty large icon"/>
                {runtimeHours}h {runtimeMinutes}min
              </span>
              <span
                className={styles.myMovies}>
                <i
                  className={this.state.isMovieInMyMovies ? 'large red heart icon' : 'large red empty heart icon'}
                  title={this.state.isMovieInMyMovies ? 'Remove from My Movies' : 'Add to My Movies'}
                  onClick={this.handleMyMoviesClick}
                />
              </span>
            </div>
          </div>
          <div className="extra content">
            <span>
              <span className="movieGenre">Genres:</span> {genreToDisplay}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default RandomSearch;
