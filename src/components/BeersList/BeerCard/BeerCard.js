import React from 'react';
import './BeerCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons' //regular star
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons' // solid star

const BeerCard = props => {

  const cardClasses = ['BeerCard']
  if (props.beer.isHidden) {
    cardClasses.push('isHidden')
  }

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
    <div className={cardClasses.join(' ')} onClick={showModalWindow}>
      <span className='BeerCardId'>{props.beer.id}</span>
      <span className='BeerCardStar'
        onClick = {(event) => props.onStarClick(event, props.beer.id)}>
        {starIcon}
      </span>
      <img src={props.beer.image_url} alt={props.beer.name} />
      <span className='BeerCardName'>{props.beer.name}</span>
      <span className='BeerCardTagline'>{props.beer.tagline}</span>
    </div>
)}

export default BeerCard
