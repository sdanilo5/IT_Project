import React from 'react';
import BackgroundImage from '../BackgroundImageComponent/BackgroundImage';
import {Link} from 'react-router-dom';
import {Card, Container, Col} from 'react-bootstrap';
import JokeDtailsModalComponent from '../JokeDetailsModalComponent/JokeDetailsModalComponent';
import axios from 'axios';

var variants = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info',  'Light', 'Dark'];

const SingleJoke = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    var variant = variants[Math.floor(Math.random() * variants.length)];

    return (
        <>
            <Card
                bg={variant.toLowerCase()}
                key={variant}
                text={variant.toLowerCase() === 'light' || variant.toLowerCase() === 'warning' ? 'dark' : 'white'}
                style={{ width: '18rem' }}
                className={variant.toLowerCase() === 'light' || variant.toLowerCase() === 'warning' ? `col-sm-2 col-md-4 col-lg-4 mb-5 btn-outline-dark` : `col-sm-2 col-md-4 col-lg-4 mb-5 btn-outline-light`}
                onClick={() => setModalShow(true)}
                >
                <Card.Header>{props.user.name}</Card.Header>
                <Card.Body>
                    <Card.Title> {props.joke.question} </Card.Title>
                    <Card.Text> {props.joke.answer} </Card.Text>
                </Card.Body>
            </Card>

            <JokeDtailsModalComponent 
                id={props.joke.id} 
                question={props.joke.question} 
                answer={props.joke.answer} 
                dateCreated={props.joke.dateCreated}
                dateUpdated={props.joke.dateUpdated} 
                user={props.user}

                show={modalShow} 
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default SingleJoke;