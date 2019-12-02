import React, { useState } from 'react';
import classes from './BeerCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons' //regular star
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons' // solid star
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const BeerCard = props => {
  let starIcon = "";
  if ( props.favoriteBeers.includes(props.beer.id) ) {
    starIcon = <FontAwesomeIcon icon={fasFaStar} color="orange" />
  } else {
    starIcon = <FontAwesomeIcon icon={farFaStar} color="#777" />
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className={classes.BeerCard} onClick={toggle}>
      <span className={classes.BeerCardId}>{props.beer.id}</span>
      <span className={classes.BeerCardStar}
        onClick = {(event) => props.onStarClick(event, props.beer.id)}>
        {starIcon}
      </span>
      <img src={props.beer.image_url} alt={props.beer.name} />
      <span className={classes.BeerCardName}>{props.beer.name}</span>
      <span className={classes.BeerCardTagline}>{props.beer.tagline}</span>

      <div>
          <Modal isOpen={modal} toggle={toggle} className={classes.modalBeerdetails}>
          <ModalHeader toggle={toggle} style={{borderBottom: 0}}></ModalHeader>
            <ModalBody>
              <Container>
                  <Row>
                      <Col xs="4">
                        <img src={props.beer.image_url} className={classes.modalImg} alt={props.beer.name} />
                      </Col>
                      <Col xs="8">
                        <span className={classes.detailsBeerName}>{props.beer.name}</span>
                        <span className={classes.detailsTagline}>{props.beer.tagline}</span>
                        <span className={classes.line}></span>
                        <span className={classes.ibu}><b>IBU:</b> {props.beer.ibu}</span>
                        <span className={classes.abv}><b>ABV:</b> {props.beer.abv}</span>
                        <span className={classes.ebc}><b>EBC:</b> {props.beer.ebc}</span>
                        <span className={classes.description}>{props.beer.description}</span>
                        <span className={classes.bestServed}><b>Best served with:</b></span>
                        <ul className={classes.foodPairing}>
                          {props.beer.food_pairing.map((food, index) =>
                            <li className={classes.food} key={index}>{food}</li>
                          )}
                        </ul>
                      </Col>
                  </Row>
                  <Row>
                      <span><h2>You might also like:</h2></span>
                  </Row>
                </Container>
            </ModalBody>
          </Modal>
        </div>

    </div>
)}

export default BeerCard
