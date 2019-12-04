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

  async componentDidMount() {
    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers')
      this.setState({
        beers: response.data,
        beersAreLoading: false
      })
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
