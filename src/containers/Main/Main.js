import React, {Component} from 'react';
import classes from './Main.module.css'
import TopMenu from '../../components/TopMenu/TopMenu'
import BeersList from '../../components/BeersList/BeersList'
import BeerModal from '../../components/BeerModal/BeerModal'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'


class Main extends Component {
  state = {
    showFavorites: false,
    beersAreLoading: true,
    favoriteBeers: [],  // beer IDs
    beers: [],
    modalWindowState : {
      currentBeerId: 1,
      isShown: false
    }
  }

  addIsHiddenFalseToBeer = () => {
    const beersCopy = this.state.beers.concat()
    for (let beer of beersCopy) {
      beer.isHidden = false
    }
    this.setState({
      beers: beersCopy
    })
  }

  loadFavoriteBeersFromLocalStorage = () => {
    // check if favorite beers exists in localStorage
    if ( localStorage.getItem("favoriteBeersLS") ) {
      this.setState({
        favoriteBeers: this.state.favoriteBeers.splice(0, this.state.favoriteBeers.length)
      })
      // if there are some ids in LS, put them to favoriteBeers state
      let favBeersFromLocalStorage = JSON.parse(localStorage.getItem("favoriteBeersLS"))
      for (let beerId of favBeersFromLocalStorage) {
        this.state.favoriteBeers.push(beerId)
      }
      this.setState({
          favoriteBeers: this.state.favoriteBeers
      })
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers')
      this.setState({
        beers: response.data,
        beersAreLoading: false
      })
      this.loadFavoriteBeersFromLocalStorage()
      this.addIsHiddenFalseToBeer()
    } catch (e) {
      console.log(e)
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

  showFavorites = (event) => {
    event.preventDefault()
    const favoriteBeers = this.state.favoriteBeers
    const beersCopy = this.state.beers.concat()

    beersCopy.forEach((beer) => {
      for (let beerProperty in beer) {
        if ( beerProperty === 'id' && favoriteBeers.find(beerId => beerId === beer.id) ) {
          beer.isHidden = false
          this.setState({
            beers: beersCopy
          })
        } else if ( beerProperty === 'id' && !favoriteBeers.find(beerId => beerId === beer.id) ) {
          beer.isHidden = true
          this.setState({
            beers: beersCopy
          })
        }
      }
    })
  }

  showAllBeers = (event) => {
    event.preventDefault()
    const beersCopy = this.state.beers.concat()

    beersCopy.forEach((beer) => {
      beer.isHidden = false
          this.setState({
            beers: beersCopy
          })
      })
  }

  onStarClickHandler = (event, beerId) => {
    // check if favorite beers does not exist in localStorage
    if (localStorage.getItem("favoriteBeersLS") === null) {
      // add beer id to state & update favorite status
      this.state.favoriteBeers.push(beerId)
      this.setState({
        favoriteBeers: this.state.favoriteBeers
      })
      // add beer id to localStorage
      localStorage.setItem("favoriteBeersLS", JSON.stringify(this.state.favoriteBeers))
    } else {
      // null favoriteBeers state, we'll populate it later
      this.loadFavoriteBeersFromLocalStorage()

      // if beer is favorite
      if ( this.state.favoriteBeers.includes(beerId) ) {
        // remove from favoriteBeers state
        this.state.favoriteBeers.splice(this.state.favoriteBeers.indexOf(beerId), 1)
        this.setState({
            favoriteBeers: this.state.favoriteBeers
        })
        // update LS
        localStorage.setItem("favoriteBeersLS", JSON.stringify(this.state.favoriteBeers))
      } else {
        // add beerId to favoriteBeers state
        this.state.favoriteBeers.push(beerId)
        this.setState({
            favoriteBeers: this.state.favoriteBeers
        })
        // update LS
        localStorage.setItem("favoriteBeersLS", JSON.stringify(this.state.favoriteBeers))
      }
    }


    // if ( this.state.favoriteBeers.includes(beerId) ) {
    //   // remove from favoriteBeers and update state
    //   this.state.favoriteBeers.splice(this.state.favoriteBeers.indexOf(beerId), 1)
    //   this.setState({
    //       favoriteBeers: this.state.favoriteBeers
    //   })
    // } else {
    //   // add beerId to update favoriteBeers and state
    //   this.state.favoriteBeers.push(beerId)
    //   this.setState({
    //       favoriteBeers: this.state.favoriteBeers
    //   })
    // }
    event.stopPropagation()
  }

  render() {
    return (
      <div className = {classes.Main}>
        <TopMenu
          beers = {this.state.beers}
          favoriteBeers = {this.state.favoriteBeers}
          showFavorites = {this.showFavorites}
          showAllBeers = {this.showAllBeers}
          />
        <header>
          <h1>The Beer Bank</h1>
          <p>Find your favorite beer here</p>
          />
        </header>
        { this.state.beersAreLoading
          ? <Loader />
          :
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
        }
      </div>
    )
  }
}

export default Main
