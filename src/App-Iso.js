import React, { Component } from 'react';
import './App.css';
import Beers from './Beers'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      beerList: [],
      likedBeers: []
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

  likeButton = (index)=>{
    const likedBeer = this.state.beerList[index];
    let currLikedBeers = this.state.likedBeers;
    currLikedBeers = [...currLikedBeers, likedBeer];
    this.setState({likedBeers: currLikedBeers});
  } 

  unlikeButton = (index) =>{
    
    let currLikedBeers = this.state.likedBeers;
    currLikedBeers.splice(index, 1);
    this.setState({likedBeers: currLikedBeers});
  }


  render () {
    return (
      <div className="App">
       <div>
       {
         this.state.beerList.map((beer, index) => (
           <Beers
              name = {beer.name}
              tagline = {beer.tagline}
              image = {beer.image}
              key = {index}
              index = {index}
              likeButton = {this.likeButton}
              buttonText = "Like"
           />
         ))
       }
       </div> 
       <div>
       {
         this.state.likedBeers.map((beer, index) => (
           <Beers
              name = {beer.name}
              tagline = {beer.tagline}
              image = {beer.image}
              key = {index}
              index = {index}
              likeButton = {this.unlikeButton}
              buttonText = "Unlike"
           />
         ))
       }
       </div> 
      </div>
    )
  }
}

export default App;
