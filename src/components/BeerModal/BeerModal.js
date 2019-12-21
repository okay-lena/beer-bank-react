import React from 'react';
import classes from './BeerModal.module.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import RandomBeers from './RandomBeers/RandomBeers'

const BeerModal = (props) => {

  const getBeerById = (id) => {
   for (let i = 0; i < props.allBeers.length; i++){
     if (props.allBeers[i].id === id) return props.allBeers[i]
   }
   return null;
 }

  const beer = getBeerById(props.beerId)

  return (
    <Modal style={{maxWidth: 800}} isOpen={props.isShown} toggle={props.hideModalWindow} className={classes.BeerModal}>
    <ModalHeader style={{borderBottom: 0}}></ModalHeader>
      <ModalBody>
        <Container>
            <Row>
                <Col xs="4">
                  { beer.image_url
                    ? <img src={beer.image_url} className={classes.modalImg} alt={beer.name} />
                    : <img src='/stub-beer.png' className={classes.modalImg} alt={beer.name} />
                  }
                </Col>
                <Col xs="8">
                  <span className={classes.detailsBeerName}>{beer.name}</span>
                  <span className={classes.detailsTagline}>{beer.tagline}</span>
                  <span className={classes.line}></span>
                  <span className={classes.ibu}><b>IBU:</b> {beer.ibu}</span>
                  <span className={classes.abv}><b>ABV:</b> {beer.abv}</span>
                  <span className={classes.ebc}><b>EBC:</b> {beer.ebc}</span>
                  <span className={classes.description}>{beer.description}</span>
                  <span className={classes.bestServed}><b>Best served with:</b></span>
                  <ul className={classes.foodPairing}>
                    {beer.food_pairing.map((food, index) =>
                      <li className={classes.food} key={index}>{food}</li>
                    )}
                  </ul>
                </Col>
            </Row>
            <Row>
                <span><h2>You might also like:</h2></span>
                <RandomBeers
                  showModalWindow = {props.showModalWindow}
                  hideModalWindow = {props.hideModalWindow}
                  modalWindow = {this}
                  beer = {beer}
                  allBeers = {props.allBeers}
                  favoriteBeers = {props.favoriteBeers}
                  onStarClick = {props.onStarClick}
                />
            </Row>
          </Container>
      </ModalBody>
    </Modal>
  )

}

export default BeerModal
