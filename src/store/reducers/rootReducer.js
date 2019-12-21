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
} from '../actions/actionTypes';

const initialState = {
  beersAreLoading: true,
  favoriteBeers: [],  // beer IDs
  allBeers: [],
  beersToShow: [], // beer objects to show in different lists - favs, all, search...
  modalWindowState : {
    currentBeerId: 1,
    isShown: false
  },
  showInstantSearch: true,
  showAdvancedSearch: false,
  minIbu: 0,
  maxIbu: 100,
  minAbv: 0,
  maxAbv: 100,
  minEbc: 0,
  maxEbc: 100,
  brewedFrom: "01-1970",
  brewedTo: "01-2100"
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_BEERS_TO_STATE:
      return {
        ...state,
        allBeers: action.allBeers,
        beersToShow: action.allBeers,
        beersAreLoading: false
      }
    case UPDATE_FAVORITE_BEERS:
      return {
        ...state,
        favoriteBeers: action.favoriteBeers
      }
    case SHOW_MODAL_WINDOW:
      return {
        ...state,
        modalWindowState : {
          isShown: action.isShown,
          currentBeerId: action.currentBeerId
        }
      }
    case HIDE_MODAL_WINDOW:
      return {
        ...state,
        modalWindowState : {
          isShown: action.isShown,
          currentBeerId: action.currentBeerId
        }
      }
      case UPDATE_BEERS_TO_SHOW:
        return {
          ...state,
          beersToShow: action.beersToShow
        }
      case SHOW_ADVANCED_SEARCH_TRUE:
        return {
          ...state,
          showAdvancedSearch: true,
          showInstantSearch: false
        }
      case SHOW_INSTANT_SEARCH_TRUE:
        return {
          ...state,
          showAdvancedSearch: false,
          showInstantSearch: true
        }
      case BEERS_ARE_LOADING:
        return {
          ...state,
          beersAreLoading: true
        }
      case GET_MIN_IBU:
        return {
          ...state,
          minIbu: action.minIbu
        }
      case GET_MAX_IBU:
        return {
          ...state,
          maxIbu: action.maxIbu
        }
      case GET_MIN_ABV:
        return {
          ...state,
          minAbv: action.minAbv
        }
      case GET_MAX_ABV:
        return {
          ...state,
          maxAbv: action.maxAbv
        }
      case GET_MIN_EBC:
        return {
          ...state,
          minEbc: action.minEbc
        }
      case GET_MAX_EBC:
        return {
          ...state,
          maxEbc: action.maxEbc
        }
      case GET_BREWED_FROM:
        return {
          ...state,
          brewedFrom: action.brewedFrom
        }
      case GET_BREWED_TO:
        return {
          ...state,
          brewedTo: action.brewedTo
        }
      case FINISH_ASYNC_SEARCH_BEERS:
        return {
          ...state,
          beersToShow: action.beersToShow,
          beersAreLoading: false
        }
    default:
      return state
  }
}
