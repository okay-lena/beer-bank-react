import React, {Component} from 'react';
import classes from './Main.module.css'
import TopMenu from '../../components/TopMenu/TopMenu'
import BeersList from '../../components/BeersList/BeersList'

class Main extends Component {
  state = {
    showFavorites: false,
    showBeerModal: false,
    favoriteBeers: [],  // beer IDs
    beers: [
      {
        "id": 1,
        "name": "Buzz",
        "tagline": "A Real Bitter Experience.",
        "first_brewed": "09/2007",
        "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
        "image_url": "https://images.punkapi.com/v2/keg.png",
        "abv": 4.5,
        "ibu": 60,
        "ebc": 20,
        "food_pairing": ["Spicy chicken tikka masala", "Grilled chicken quesadilla", "Caramel toffee cake"]
      },
      {
        "id": 2,
        "name": "Trashy Blonde",
        "tagline": "You Know You Shouldn't",
        "first_brewed": "04/2008",
        "description": "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
        "image_url": "https://images.punkapi.com/v2/2.png",
        "abv": 4.1,
        "ibu": 41.5,
        "ebc": 15,
        "food_pairing": ["Fresh crab with lemon", "Garlic butter dipping sauce", "Goats cheese salad", "Creamy lemon bar doused in powdered sugar"]
      }
    ]
  }

  onBeerCardClickHandler = (beerId) => {
    console.log(beerId)
  }

  onStarClickHandler = (event, beerId) => {
    if ( this.state.favoriteBeers.includes(beerId) ) {
      // remove from favoriteBeers and update state
      this.state.favoriteBeers.splice(this.state.favoriteBeers.indexOf(beerId), 1)
      this.setState({
          favoriteBeers: this.state.favoriteBeers
      })
    } else {
      // add beerId to update favoriteBeers and state
      this.state.favoriteBeers.push(beerId)
      this.setState({
          favoriteBeers: this.state.favoriteBeers
      })
    }
    event.stopPropagation()
  }

  render() {
    return (
      <div className = {classes.Main}>
        <TopMenu />
        <header>
          <h1>The Beer Bank</h1>
          <p>Find your favorite beer here</p>
        </header>
        <div className="container">
          <BeersList
            beers = {this.state.beers}
            favoriteBeers = {this.state.favoriteBeers}
            onBeerCardClick = {this.onBeerCardClickHandler}
            onStarClick = {this.onStarClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Main
