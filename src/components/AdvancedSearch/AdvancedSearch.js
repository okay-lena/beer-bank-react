import React from 'react';
import classes from './AdvancedSearch.module.css'

const AdvancedSearch = props => {
  return (
    <div className={classes.AdvancedSearch}>
      <form>
        <span className={classes.searchIbu}>
          <label htmlFor="minIbu">IBU from</label>
            <input onChange={props.getMinIbu} type="number" placeholder="try 40" name="minIbu" autoFocus />
          <label htmlFor="maxIbu">to</label>
            <input onChange={props.getMaxIbu} type="number" placeholder="try 60" name="maxIbu" />
        </span>
        <span className={classes.searchAbv}>
          <label htmlFor="minAbv">ABV from</label>
            <input onChange={props.getMinAbv} type="number" placeholder="try 4" name="minAbv" />
          <label htmlFor="maxAbv">to</label>
            <input onChange={props.getMaxAbv} type="number" placeholder="try 10" name="maxAbv" />
        </span>
        <span className={classes.searchEbc}>
          <label htmlFor="minEbc">EBC from</label>
            <input onChange={props.getMinEbc} type="number" placeholder="try 10" name="minEbc" />
          <label htmlFor="maxEbc">to</label>
            <input onChange={props.getMaxEbc} type="number" placeholder="try 16" name="maxEbc" />
        </span>
        <span className={classes.searchBrewedDate}>
          <label htmlFor="brewedFrom">Brewed from</label>
            <input onChange={props.getBrewedFrom} type="string" placeholder="try 01-2011" name="brewedFrom" />
          <label htmlFor="brewedTo">to</label>
            <input onChange={props.getBrewedTo} type="string" placeholder="try 01-2016" name="brewedTo" />
        </span>
        <span className={classes.searchBtn}>
          <input className="btn btn-primary btn-sm"
            type="submit"
            value="Search"
            onClick={props.findBeers}
          />
        </span>
      </form>
      <span className={classes.instantSearchLink}>
        <a href="./" onClick={(event) => props.hideAdvancedShowInstant(event)}>Instant Search</a>
      </span>
    </div>
  )
}

export default AdvancedSearch
