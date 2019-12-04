import React from 'react';
import classes from './BeerCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons' //regular star
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons' // solid star

const BeerCard = props => {
  let starIcon = "";
  if ( props.favoriteBeers.includes(props.beer.id) ) {
    starIcon = <FontAwesomeIcon icon={fasFaStar} color="orange" />
  } else {
    starIcon = <FontAwesomeIcon icon={farFaStar} color="#777" />
  }

  const showModalWindow = () => {
    props.showModalWindow(props.beer.id)
  }


  return (
    <div className={classes.BeerCard} onClick={showModalWindow}>
      <span className={classes.BeerCardId}>{props.beer.id}</span>
      <span className={classes.BeerCardStar}
        onClick = {(event) => props.onStarClick(event, props.beer.id)}>
        {starIcon}
      </span>
      <img src={props.beer.image_url} alt={props.beer.name} />
      <span className={classes.BeerCardName}>{props.beer.name}</span>
      <span className={classes.BeerCardTagline}>{props.beer.tagline}</span>
    </div>
)}

export default BeerCard
