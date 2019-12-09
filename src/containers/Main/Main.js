import React, {Component} from 'react';
import classes from './Main.module.css'
import TopMenu from '../../components/TopMenu/TopMenu'
import InstantSearch from '../../components/InstantSearch/InstantSearch'
import AdvancedSearch from '../../components/AdvancedSearch/AdvancedSearch'
import BeersList from '../../components/BeersList/BeersList'
import BeerModal from '../../components/BeerModal/BeerModal'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'


class Main extends Component {
  state = {
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
    brewedFrom: Date.parse("01/01/1970"),
    brewedTo: Date.parse("01/01/2100")
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
        allBeers: response.data,
        beersAreLoading: false
      })
      this.loadFavoriteBeersFromLocalStorage()
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
    const beersCopy = this.state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      if ( favoriteBeers.find(beerId => beerId === beer.id) ) {
        beersToShow.push(beer)
      }
      this.setState({
        beersToShow: beersToShow
      })
    })
  }

  showAllBeers = (event) => {
    event.preventDefault()
    const beersCopy = this.state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      beersToShow.push(beer)
    })
    this.setState({
      beersToShow: beersToShow
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

  instantlySearchForBeer = (event) => {
    let beerToFind = event.target.value.toLowerCase()
    const beersCopy = this.state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      if ( beer.name.toLowerCase().includes(beerToFind) ) {
        beersToShow.push(beer)
      }
    })
    this.setState({
      beersToShow: beersToShow
    })
  }

  getMinIbu = (event) => {
    this.setState({
      minIbu: event.target.value
    })
  }

  getMaxIbu = (event) => {
    this.setState({
      maxIbu: event.target.value
    })
  }

  getMinAbv = (event) => {
    this.setState({
      minAbv: event.target.value
    })
  }

  getMaxAbv = (event) => {
    this.setState({
      maxAbv: event.target.value
    })
  }

  getMinEbc = (event) => {
    this.setState({
      minEbc: event.target.value
    })
  }

  getMaxEbc = (event) => {
    this.setState({
      maxEbc: event.target.value
    })
  }

  getBrewedFrom = (event) => {
    if ( isNaN(Date.parse(event.target.value)) ) {
      this.setState({
        brewedFrom: Date.parse("01/01/1970")
      })
    } else {
      this.setState({
        brewedFrom: Date.parse(event.target.value)
      })
    }
  }

  getBrewedTo = (event) => {
    if ( isNaN(Date.parse(event.target.value)) ) {
      this.setState({
        brewedTo: Date.parse("01/01/2100")
      })
    } else {
      this.setState({
        brewedTo: Date.parse(event.target.value)
      })
    }
  }

  findBeers = (event) => {
    event.preventDefault()
    const beersCopy = this.state.allBeers.concat()
    let beersToShow = []

    beersCopy.forEach((beer) => {
      if ( !isNaN(Date.parse("01/" + beer.first_brewed)) ) {
          beer.first_brewed = Date.parse("01/" + beer.first_brewed);
      }
      if (
          (beer.ibu >= this.state.minIbu && beer.ibu <= this.state.maxIbu) &&
          (beer.abv >= this.state.minAbv && beer.abv <= this.state.maxAbv) &&
          (beer.ebc >= this.state.minEbc && beer.ebc <= this.state.maxEbc) &&
          (beer.first_brewed >= this.state.brewedFrom && beer.first_brewed <= this.state.brewedTo)
          )
      {
        beersToShow.push(beer)
      }
    })

    if (beersToShow.length > 0) {
      this.setState({
        beersToShow: beersToShow
      })
    } else {
      console.log("There are no beers matching search criteria.");
    }
  }

  showAdvancedHideInstant = (event) => {
    event.preventDefault()
    this.setState({
      showAdvancedSearch: true,
      showInstantSearch: false
    })
  }

  hideAdvancedShowInstant = (event) => {
    event.preventDefault()
    this.setState({
      showAdvancedSearch: false,
      showInstantSearch: true
    })
  }



  render() {
    return (
      <div className = {classes.Main}>
        <TopMenu
          showFavorites = {this.showFavorites}
          showAllBeers = {this.showAllBeers}
          />
        <header>
          <h1>The Beer Bank</h1>
          <p>Find your favorite beer here</p>
          { this.state.showInstantSearch
            ? <InstantSearch
                instantlySearchForBeer = {this.instantlySearchForBeer}
                showAdvancedHideInstant = {this.showAdvancedHideInstant}
              />
            : <AdvancedSearch
                findBeers = {this.findBeers}
                getMinIbu = {this.getMinIbu}
                getMaxIbu = {this.getMaxIbu}
                getMinAbv = {this.getMinAbv}
                getMaxAbv = {this.getMaxAbv}
                getMinEbc = {this.getMinEbc}
                getMaxEbc = {this.getMaxEbc}
                getBrewedFrom = {this.getBrewedFrom}
                getBrewedTo = {this.getBrewedTo}
                hideAdvancedShowInstant = {this.hideAdvancedShowInstant}
              />
          }
        </header>
        { this.state.beersAreLoading
          ? <Loader />
          :
          <div className= {classes.container}>
            <BeersList
              beersToShow = {this.state.beersToShow}
              favoriteBeers = {this.state.favoriteBeers}
              onStarClick = {this.onStarClickHandler}
              showModalWindow = {this.showModalWindow}
              hideModalWindow = {this.hideModalWindow}
            />
            <BeerModal
              beerId = {this.state.modalWindowState.currentBeerId}
              favoriteBeers = {this.state.favoriteBeers}
              onStarClick = {this.onStarClickHandler}
              allBeers = {this.state.allBeers}
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
