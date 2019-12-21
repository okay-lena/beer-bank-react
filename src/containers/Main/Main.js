import React, {Component} from 'react';
import classes from './Main.module.css'
import {connect} from 'react-redux'
import TopMenu from '../../components/TopMenu/TopMenu'
import InstantSearch from '../../components/InstantSearch/InstantSearch'
import AdvancedSearch from '../../components/AdvancedSearch/AdvancedSearch'
import BeersList from '../../components/BeersList/BeersList'
import BeerModal from '../../components/BeerModal/BeerModal'
import Loader from '../../components/Loader/Loader'
import {
  fetchAllBeers, loadFavoriteBeersFromLocalStorage, onStarClickHandler,
  showModalWindow, hideModalWindow,
  showFavorites, showAllBeers,
  showAdvancedHideInstant, hideAdvancedShowInstant,
  instantlySearchForBeer,
  getMinIbu, getMaxIbu,
  getMinAbv, getMaxAbv,
  getMinEbc, getMaxEbc,
  getBrewedFrom, getBrewedTo,
  findBeers
} from '../../store/actions/main'

class Main extends Component {

  componentDidMount() {
    this.props.fetchAllBeers()
    this.props.loadFavoriteBeersFromLocalStorage()
  }

  render() {
    return (
      <div className = {classes.Main}>
        <TopMenu
          showFavorites = {this.props.showFavorites}
          showAllBeers = {this.props.showAllBeers}
          />
        <header>
          <h1>The Beer Bank</h1>
          <p>Find your favorite beer here</p>
          { this.props.showInstantSearch
            ? <InstantSearch
                instantlySearchForBeer = {this.props.instantlySearchForBeer}
                showAdvancedHideInstant = {this.props.showAdvancedHideInstant}
              />
            : <AdvancedSearch
                findBeers = {this.props.findBeers}
                getMinIbu = {this.props.getMinIbu}
                getMaxIbu = {this.props.getMaxIbu}
                getMinAbv = {this.props.getMinAbv}
                getMaxAbv = {this.props.getMaxAbv}
                getMinEbc = {this.props.getMinEbc}
                getMaxEbc = {this.props.getMaxEbc}
                getBrewedFrom = {this.props.getBrewedFrom}
                getBrewedTo = {this.props.getBrewedTo}
                hideAdvancedShowInstant = {this.props.hideAdvancedShowInstant}
              />
          }
        </header>
        { this.props.beersAreLoading
          ? <Loader />
          :
          <div className= {classes.container}>
            <BeersList
              beersToShow = {this.props.beersToShow}
              favoriteBeers = {this.props.favoriteBeers}
              onStarClick = {this.props.onStarClickHandler}
              showModalWindow = {this.props.showModalWindow}
              hideModalWindow = {this.props.hideModalWindow}
            />
            <BeerModal
              beerId = {this.props.modalWindowState.currentBeerId}
              favoriteBeers = {this.props.favoriteBeers}
              onStarClick = {this.props.onStarClickHandler}
              allBeers = {this.props.allBeers}
              isShown = {this.props.modalWindowState.isShown}
              showModalWindow = {this.props.showModalWindow}
              hideModalWindow = {this.props.hideModalWindow}
            />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      beersAreLoading: state.beersAreLoading,
      favoriteBeers: state.favoriteBeers,
      allBeers: state.allBeers,
      beersToShow: state.beersToShow,
      modalWindowState : state.modalWindowState,
      showInstantSearch: state.showInstantSearch,
      showAdvancedSearch: state.showAdvancedSearch,
      minIbu: state.minIbu,
      maxIbu: state.maxIbu,
      minAbv: state.minAbv,
      maxAbv: state.maxAbv,
      minEbc: state.minEbc,
      maxEbc: state.maxEbc,
      brewedFrom: state.brewedFrom,
      brewedTo: state.brewedTo
    }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllBeers: () => dispatch(fetchAllBeers()),
    loadFavoriteBeersFromLocalStorage: () => dispatch(loadFavoriteBeersFromLocalStorage()),
    onStarClickHandler: (event, beerId) => dispatch(onStarClickHandler(event, beerId)),
    showModalWindow: currentBeerId => dispatch(showModalWindow(currentBeerId)),
    hideModalWindow: () => dispatch(hideModalWindow()),
    showFavorites: (event) => dispatch(showFavorites(event)),
    showAllBeers: (event) => dispatch(showAllBeers(event)),
    showAdvancedHideInstant: (event) => dispatch(showAdvancedHideInstant(event)),
    hideAdvancedShowInstant: (event) => dispatch(hideAdvancedShowInstant(event)),
    instantlySearchForBeer: (event) => dispatch(instantlySearchForBeer(event)),
    findBeers: (event) => dispatch(findBeers(event)),
    getMinIbu: (event) => dispatch(getMinIbu(event)),
    getMaxIbu: (event) => dispatch(getMaxIbu(event)),
    getMinAbv: (event) => dispatch(getMinAbv(event)),
    getMaxAbv: (event) => dispatch(getMaxAbv(event)),
    getMinEbc: (event) => dispatch(getMinEbc(event)),
    getMaxEbc: (event) => dispatch(getMaxEbc(event)),
    getBrewedFrom: (event) => dispatch(getBrewedFrom(event)),
    getBrewedTo: (event) => dispatch(getBrewedTo(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
