import React from 'react';
import {Card} from 'react-bootstrap';
import JokeDetailsModal from '../JokeDetailsModalComponent/JokeDetailsModal';

const SingleJoke = React.memo((props) => {
    const [modalShow, setModalShow] = React.useState(false);
    var variant = props.variant;

    return (
        <>
            <Card
                bg={variant.toLowerCase()}
                key={`joke-card-${props.joke.id}`}
                text={variant.toLowerCase() === 'light' || variant.toLowerCase() === 'warning' ? 'dark' : 'white'}
                style={{ width: '18rem', cursor:'pointer' }}
                className={variant.toLowerCase() === 'light' || variant.toLowerCase() === 'warning' ? `col-sm-2 col-md-4 col-lg-4 mb-5 btn-outline-dark` : `col-sm-2 col-md-4 col-lg-4 mb-5 btn-outline-light`}
                onClick={() => setModalShow(true)}
                >
                <Card.Header><strong>{props.user.name}</strong></Card.Header>
                <Card.Body 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                    <Card.Title className={'text-center'}> {props.joke.question} </Card.Title>
                    <Card.Text className={'text-center'}> {props.joke.answer} </Card.Text>
                </Card.Body>
            </Card>

            <JokeDetailsModal
                key={`joke-modal-${props.joke.id}`}
                id={props.joke.id} 
                question={props.joke.question} 
                answer={props.joke.answer} 
                date_created={props.joke.dateCreated}
                date_updated={props.joke.dateUpdated} 
                user={props.user}
                
                show={modalShow} 
                onHide={() => setModalShow(false)}
                favourites = {props.favourites}
            />
        </>
    )
})

export default SingleJoke;