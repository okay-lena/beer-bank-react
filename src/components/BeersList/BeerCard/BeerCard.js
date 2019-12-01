import React from 'react';
import classes from './BeerCard.module.css'

const BeerCard = props => {
  let starClass = "";

  if ( props.favoriteBeers.includes(props.beer.id) ) {
    starClass = "fas fa-star"
  } else {
    starClass = "far fa-star"
  }

  return (
    <div
      className={classes.BeerCard}
      onClick = {() => props.onBeerCardClick(props.beer.id)}
    >
      <span className={classes.BeerCardId}>{props.beer.id}</span>
      <span className={classes.BeerCardStar}>
        <i className={starClass}
          onClick = {(event) => props.onStarClick(event, props.beer.id)}
           />
      </span>
      <img src={props.beer.image_url} alt={props.beer.name} />
      <span className={classes.BeerCardName}>{props.beer.name}</span>
      <span className={classes.BeerCardTagline}>{props.beer.tagline}</span>
    </div>
)}

export default BeerCard
