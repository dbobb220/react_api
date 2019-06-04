import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      beerList: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://api.punkapi.com/v2/beers')
      .then(res => res.json())
      .then(data => data.map(beer => ({
        name: beer.name,
        id: beer.id,
        tagline: beer.tagline,
        image: beer.image_url
      })))
      .then(beerList => this.setState({
        beerList,
        isLoading: false,
      }))
      .catch(err => console.log('There was an error', err))
  }

  render () {
    return (
      <div className="App">
        <App/>
      </div>
    )
  }
}

export default App;
