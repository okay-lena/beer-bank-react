import React from 'react';
import classes from './RandomBeers.module.css'
import BeerCard from '../../BeersList/BeerCard/BeerCard'

const RandomBeers = props => {
  let randomBeerIDs = []
  for (let i = 0; i < 3; i++) {
      randomBeerIDs.push(Math.floor(Math.random() * props.beers.length));
  }

  return (
    <div className={classes.RandomBeers}>
      {randomBeerIDs.map((id, index) =>
        <BeerCard
          modalWindow = {props.modalWindow}
          beer = {props.beers[id]}
          key = {index}
          favoriteBeers = {props.favoriteBeers}
          onStarClick = {props.onStarClick}
          beers = {props.beers}
          showModalWindow = {props.showModalWindow}
          hideModalWindow = {props.hideModalWindow}
        />
    )}
  </div>
  )
}

export default RandomBeers
