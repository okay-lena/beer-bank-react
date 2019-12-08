import React from 'react';
import classes from './RandomBeers.module.css'
import BeerCard from '../../BeersList/BeerCard/BeerCard'

const RandomBeers = props => {
  let randomBeerIndices = []
  for (let i = 0; i < 3; i++) {
      randomBeerIndices.push(
        Math.floor(Math.random() * props.allBeers.length)
        );
  }
  // console.log(props.beers);
  return (
    <div className={classes.RandomBeers}>
      {randomBeerIndices.map((index, key) =>
        <BeerCard
          modalWindow = {props.modalWindow}
          beer = {props.allBeers[index]}
          allBeers = {props.allBeers}
          key = {key}
          favoriteBeers = {props.favoriteBeers}
          onStarClick = {props.onStarClick}
          showModalWindow = {props.showModalWindow}
          hideModalWindow = {props.hideModalWindow}
        />
      )}
    </div>
  )
}

export default RandomBeers
