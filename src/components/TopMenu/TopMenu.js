import React from 'react'
import classes from './TopMenu.module.css'

const TopMenu = props => {
  return (
  <div className={classes.TopMenu}>
    <a href="#Home" onClick={(event) => props.showAllBeers(event)}>Home</a>
    <a href="#Favorites" onClick={(event) => props.showFavorites(event)}>Favorites</a>
  </div>
)}

export default TopMenu
