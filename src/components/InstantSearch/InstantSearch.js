import React from 'react';
import classes from './InstantSearch.module.css'

const InstantSearch = props => {

  return (
    <div className={classes.InstantSearch}>
      <form>
          <input type="text" placeholder="Search for beer name" name="search" id="searchBar"
          onKeyUp={props.instantlySearchForBeer}
          />
      </form>
      <span className={classes.advancedSearchLink}>
        <a href="./advanced-search.html">Advanced Search</a>
      </span>
    </div>
  )
}

export default InstantSearch
