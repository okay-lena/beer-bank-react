import axios from 'axios'

import {
  ADD_ALL_BEERS_TO_STATE,
  UPDATE_FAVORITE_BEERS,
  SHOW_MODAL_WINDOW,
  HIDE_MODAL_WINDOW,
  UPDATE_BEERS_TO_SHOW,
  SHOW_ADVANCED_SEARCH_TRUE,
  SHOW_INSTANT_SEARCH_TRUE,
  BEERS_ARE_LOADING,
  GET_MIN_IBU,
  GET_MAX_IBU,
  GET_MIN_ABV,
  GET_MAX_ABV,
  GET_MIN_EBC,
  GET_MAX_EBC,
  GET_BREWED_FROM,
  GET_BREWED_TO,
  FINISH_ASYNC_SEARCH_BEERS
} from './actionTypes'

export function fetchAllBeers() {
  return async (dispatch, getState) => {
    try {
      let beersToGet = getState().allBeers.concat()
      for (let i = 1; i < 6; i ++) {
        const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
        beersToGet = beersToGet.concat(response.data)
      }
      dispatch(addBeersToState(beersToGet))
    } catch (e) {
      console.log(e)
    }
  }
}

export function addBeersToState(beersToGet) {
  return {
    type: ADD_ALL_BEERS_TO_STATE,
    allBeers: beersToGet,
    beersToShow: beersToGet
  }
}

export function loadFavoriteBeersFromLocalStorage() {
  // check if favorite beers exists in localStorage
  return (dispatch, getState) => {
    const state = getState()
    if ( localStorage.getItem("favoriteBeersLS") ) {
      let favoriteBeersList = state.favoriteBeers.concat()
      favoriteBeersList.splice(0, state.favoriteBeers.length)
      dispatch(updateFavoriteBeers(favoriteBeersList))
      // if there are some ids in LS, put them to favoriteBeers state
      let favBeersFromLocalStorage = JSON.parse(localStorage.getItem("favoriteBeersLS"))
      favoriteBeersList = state.favoriteBeers.concat()
      for (let beerId of favBeersFromLocalStorage) {
        favoriteBeersList.push(beerId)
      }
      dispatch(updateFavoriteBeers(favoriteBeersList))
    }
  }
}

export function onStarClickHandler(event, beerId) {
  return (dispatch, getState) => {
    const state = getState()
    // check if favorite beers does not exist in localStorage
    if (localStorage.getItem("favoriteBeersLS") === null) {
      // add beer id to future state & update favorite status
      const favoriteBeersList = state.favoriteBeers.concat()
      favoriteBeersList.push(beerId)
      dispatch(updateFavoriteBeers(favoriteBeersList))
      // add beer id to localStorage
      localStorage.setItem("favoriteBeersLS", JSON.stringify(state.favoriteBeers))
    } else {
      // null favoriteBeers state, we'll populate it later
      dispatch(updateFavoriteBeers([]))

      // if beer is favorite
      if ( state.favoriteBeers.includes(beerId) ) {
        // remove from favoriteBeers state
        const favoriteBeersList = state.favoriteBeers.concat()
        favoriteBeersList.splice(state.favoriteBeers.indexOf(beerId), 1)
        dispatch(updateFavoriteBeers(favoriteBeersList))
        // update LS
        localStorage.setItem("favoriteBeersLS", JSON.stringify(state.favoriteBeers))
      } else {
        // add beerId to favoriteBeers state
        const favoriteBeersList = state.favoriteBeers.concat()
        favoriteBeersList.push(beerId)
        dispatch(updateFavoriteBeers(favoriteBeersList))
        // update LS
        localStorage.setItem("favoriteBeersLS", JSON.stringify(state.favoriteBeers))
      }
    }
    event.stopPropagation()
  }
}

export function updateFavoriteBeers(favoriteBeersList) {
  return {
    type: UPDATE_FAVORITE_BEERS,
    favoriteBeers: favoriteBeersList
  }
}

export function showModalWindow(currentBeerId) {
  return {
    type: SHOW_MODAL_WINDOW,
    isShown: true,
    currentBeerId: currentBeerId
  }
}

export function hideModalWindow() {
  return {
    type: HIDE_MODAL_WINDOW,
    isShown: false,
    currentBeerId: 1
  }
}

export function showFavorites(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState()
    const favoriteBeers = state.favoriteBeers
    const beersCopy = state.allBeers.concat()
    let beersToShow = []
    
    beersCopy.forEach((beer) => {
      if ( favoriteBeers.find(beerId => beerId === beer.id) ) {
        beersToShow.push(beer)
      }
      dispatch(updateBeersToShow(beersToShow))
    })
  }
}

export function showAllBeers(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState()
    const beersCopy = state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      beersToShow.push(beer)
    })
    dispatch(updateBeersToShow(beersToShow))
  }
}

export function updateBeersToShow(beersToShow) {
  return {
    type: UPDATE_BEERS_TO_SHOW,
    beersToShow: beersToShow
  }
}

export function instantlySearchForBeer(event) {
  return (dispatch, getState) => {
    const state = getState()
    let beerToFind = event.target.value.toLowerCase()
    const beersCopy = state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      if ( beer.name.toLowerCase().includes(beerToFind) ) {
        beersToShow.push(beer)
      }
    })
    dispatch(updateBeersToShow(beersToShow))
  }
}

export function showAdvancedHideInstant(event) {
  event.preventDefault()
  return (dispatch) => {
    dispatch(showAdvancedSearchTrue())
  }
}

export function showAdvancedSearchTrue() {
  return {
    type: SHOW_ADVANCED_SEARCH_TRUE,
    showAdvancedSearch: true,
    showInstantSearch: false
  }
}

export function hideAdvancedShowInstant(event) {
  event.preventDefault()
  return (dispatch) => {
    dispatch(showInstantSearchTrue())
  }
}

export function showInstantSearchTrue() {
  return {
    type: SHOW_INSTANT_SEARCH_TRUE,
    showAdvancedSearch: false,
    showInstantSearch: true
  }
}

export function findBeers(event) {
  return async (dispatch, getState) => {
    event.preventDefault()
    const state = getState()
    dispatch(startLoadingBeers())

    try {
      const minIbu = state.minIbu
      const maxIbu = state.maxIbu
      const minAbv = state.minAbv
      const maxAbv = state.maxAbv
      const minEbc = state.minEbc
      const maxEbc = state.maxEbc
      const brewedFrom = state.brewedFrom
      const brewedTo = state.brewedTo

      const response = await axios.get(`https://api.punkapi.com/v2/beers/?page=1&per_page=80&ibu_gt=${minIbu}&ibu_lt=${maxIbu}&abv_gt=${minAbv}&abv_lt=${maxAbv}&ebc_gt=${minEbc}&ebc_lt=${maxEbc}&brewed_after=${brewedFrom}&brewed_before=${brewedTo}`)

      dispatch(finishAsyncSearchBeers(response.data))

      if (response.data.length === 0) {
        alert("There are no beers matching search criteria.")
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function startLoadingBeers() {
  return {
    type: BEERS_ARE_LOADING,
    beersAreLoading: true
  }
}

export function getMinIbu(event) {
  return {
    type: GET_MIN_IBU,
    minIbu: event.target.value
  }
}

export function getMaxIbu(event) {
  return {
    type: GET_MAX_IBU,
    maxIbu: event.target.value
  }
}

export function getMinAbv(event) {
  return {
    type: GET_MIN_ABV,
    minAbv: event.target.value
  }
}

export function getMaxAbv(event) {
  return {
    type: GET_MAX_ABV,
    maxAbv: event.target.value
  }
}

export function getMinEbc(event) {
  return {
    type: GET_MIN_EBC,
    minEbc: event.target.value
  }
}

export function getMaxEbc(event) {
  return {
    type: GET_MAX_EBC,
    maxEbc: event.target.value
  }
}

export function getBrewedFrom(event) {
  return {
    type: GET_BREWED_FROM,
    brewedFrom: event.target.value
  }
}

export function getBrewedTo(event) {
  return {
    type: GET_BREWED_TO,
    brewedTo: event.target.value
  }
}

export function finishAsyncSearchBeers(beers) {
  return {
    type: FINISH_ASYNC_SEARCH_BEERS,
    beersToShow: beers,
    beersAreLoading: false
  }
}
