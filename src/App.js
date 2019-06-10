import React, { Component } from 'react';
import './App.css';
import Beers from './Beers'

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
    let likedBeer = this.state.beerList[index];
    let currLikedBeers = this.state.likedBeers;
    let currBeers = this.state.beerList;
    currLikedBeers = [...currLikedBeers, likedBeer];
    currBeers.splice(index, 1);
    this.setState({
      likedBeers: currLikedBeers,
      beerList: currBeers
    });
  } 

  unlikeButton = (index) =>{
    
    let currLikedBeers = this.state.likedBeers;
    let unlikedBeer = currLikedBeers.splice(index, 1);
    let currBeer = this.state.beerList;
    let newBeerList = currBeer.concat(unlikedBeer)
    this.setState({
      likedBeers: currLikedBeers,
      beerList: newBeerList
    });
  }


  render () {
    return (
      <div className="App">
       <div>
         <h3>Beer List</h3>
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
         <h3>Liked Beers</h3>
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
