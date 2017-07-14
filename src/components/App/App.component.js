import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Header from '../Header/Header.component';
import SearchMovies from '../SearchMovies/SearchMovies.component';
import YourMovies from '../YourMovies/YourMovies.component';
import About from '../About/About.component';
import Footer from '../Footer/Footer.component';

import styles from './App.stylesheet.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" component={SearchMovies}/>
          <Route path="/your-movies" component={YourMovies} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
