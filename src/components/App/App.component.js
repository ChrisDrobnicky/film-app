import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from '../Header/Header.component';
import Home from '../Home/Home.component';
import SearchMovies from '../SearchMovies/SearchMovies.component';
import YourMovies from '../YourMovies/YourMovies.component';
import About from '../About/About.component';
import styles from './App.stylesheet.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/searchmovies" component={SearchMovies} />
          <Route path="/yourmovies" component={YourMovies} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
