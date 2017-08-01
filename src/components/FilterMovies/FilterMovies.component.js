import React, {Component} from 'react';

import styles from './FilterMovies.stylesheet.css';

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
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    const targetSelect = event.target.id;
    this.setState({
      [targetSelect]:{value: event.target.value}
    });

  }


  render() {
    return(
      <div className={styles.Wrapper}>
        <h3 className={styles.filterHeader}>Set filters:</h3>
        <select className="" id="releaseYearFrom" value={this.state.releaseYearFrom.value} onChange={this.handleSelectChange} >
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
        </select>
        <select className="" id="releaseYearTo" value={this.state.releaseYearTo.value} onChange={this.handleSelectChange}>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
        </select>
      </div>
    )
  }
}

export default FilterMovies;
