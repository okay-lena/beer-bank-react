import React from 'react';
import classes from './BeersList.module.css'
import BeerCard from './BeerCard/BeerCard'

const BeersList = props => {
  return (
    <div className={classes.BeersList}>
      { props.allBeers.map((beer, index) => {
        return (
          <BeerCard
            beer = {beer}
            favoriteBeers = {props.favoriteBeers}
            key = {index}
            onStarClick = {props.onStarClick}
            allBeers = {props.allBeers}
            showModalWindow = {props.showModalWindow}
            hideModalWindow = {props.hideModalWindow}
          />
        )
      }) }

    </div>

  )
}

export default BeersList
