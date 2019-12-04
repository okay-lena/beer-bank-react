import React, {Component} from 'react';
import classes from './Main.module.css'
import TopMenu from '../../components/TopMenu/TopMenu'
import BeersList from '../../components/BeersList/BeersList'
import BeerModal from '../../components/BeerModal/BeerModal'

class Main extends Component {
  state = {
    showFavorites: false,
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
        "food_pairing": [
          "Spicy chicken tikka masala",
          "Grilled chicken quesadilla",
          "Caramel toffee cake"
        ]
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
        "food_pairing": [
          "Fresh crab with lemon",
          "Garlic butter dipping sauce",
          "Goats cheese salad",
          "Creamy lemon bar doused in powdered sugar"
        ]
      },
      {
        "id" : 3,
        "name" : "Berliner Weisse With Yuzu - B-Sides",
        "tagline" : "Japanese Citrus Berliner Weisse.",
        "first_brewed" : "11/2015",
        "description" : "Japanese citrus fruit intensifies the sour nature of this German classic.",
        "image_url" : "https://images.punkapi.com/v2/keg.png",
        "abv" : 4.2,
        "ibu" : 8,
        "ebc" : 8,
        "food_pairing" : [ "Smoked chicken wings", "Miso ramen", "Yuzu cheesecake" ]
      },
      {
        "id": 4,
        "name": "Pilsen Lager",
        "tagline": "Unleash the Yeast Series.",
        "first_brewed": "09/2013",
        "description": "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
        "image_url": "https://images.punkapi.com/v2/4.png",
        "abv": 6.3,
        "ibu": 55,
        "ebc": 30,
        "food_pairing": [ "Spicy crab cakes", "Spicy cucumber and carrot Thai salad", "Sweet filled dumplings" ]
      }
    ],
    modalWindowState : {
      currentBeerId: 1,
      isShown: false
    }
  }

  showModalWindow = (currentBeerId) => {
    this.setState({
      modalWindowState : {
        isShown: true,
        currentBeerId: currentBeerId
      }
    })
  }

  hideModalWindow = () => {
    this.setState({
      modalWindowState : {
        isShown: false,
        currentBeerId: 1
      }
    })
  }

  toggleModalWindow = () => {
    if (this.state.modalWindowState.isShown) {
      this.hideModalWindow()
    }
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
      <div className = {classes.Main} onClick={this.toggleModalWindow}>
        <TopMenu />
        <header>
          <h1>The Beer Bank</h1>
          <p>Find your favorite beer here</p>
        </header>
        <div className= {classes.container}>
          <BeersList
            beers = {this.state.beers}
            favoriteBeers = {this.state.favoriteBeers}
            onStarClick = {this.onStarClickHandler}
            showModalWindow = {this.showModalWindow}
            hideModalWindow = {this.hideModalWindow}
          />
        <BeerModal
          beerId = {this.state.modalWindowState.currentBeerId}
          favoriteBeers = {this.state.favoriteBeers}
          onStarClick = {this.state.onStarClick}
          beers = {this.state.beers}
          isShown = {this.state.modalWindowState.isShown}
          showModalWindow = {this.showModalWindow}
          hideModalWindow = {this.hideModalWindow}
          />
        </div>
      </div>
    )
  }
}

export default Main
