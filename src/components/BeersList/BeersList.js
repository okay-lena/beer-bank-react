import React from 'react';
import classes from './BeersList.module.css'
import BeerCard from './BeerCard/BeerCard'

const BeersList = props => {
  return (
    <div className={classes.BeersList}>
      { props.beers.map((beer, index) => {
        return (
          <BeerCard
            beer = {beer}
            favoriteBeers = {props.favoriteBeers}
            key = {index}
            onBeerCardClick = {props.onBeerCardClick}
            onStarClick = {props.onStarClick}
          />
        )
      }) }
    </div>
  )
}

export default BeersList
