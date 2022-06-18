import React from 'react';
import {Toast, Dropdown} from 'react-bootstrap';
import defaultImg from './../../images/users/default-user-image.jpg';
import axios from 'axios';
import JokeDetailsModal from './../JokeDetailsModalComponent/JokeDetailsModal';

const Notification = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [joke, setJoke] = React.useState({});
    const [user, setUser] = React.useState({}); // receiver

    React.useEffect(() => {
        axios.get(`http://localhost:3000/jokes/${props.notification.foraId}`)
            .then(response => {
                setJoke(response.data);
            })
            .catch(err => console.error(err));

        axios.get(`http://localhost:3000/users/${props.notification.receiverId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.error(err));

    }, [])

    return (
        <>
            <Dropdown.Item onClick={() => setModalShow(true)}>
                <Toast>
                    <Toast.Header>
                    <img 
                        src={!props.notification.pictureName ? defaultImg : `${window.location.origin}/images/${props.notification.pictureName}`}
                        style={{width: '1rem', height: '1rem'}}
                        className="rounded-circle me-2" 
                        alt="" 
                        />
                    <strong className="me-auto">{props.notification.name}</strong>
                    <small className="text-muted">{props.notification.dateCreated.split('T')[0]}</small>
                    </Toast.Header>
                    <Toast.Body>
                        {props.notification.description}
                    </Toast.Body>
                </Toast>
            </Dropdown.Item>

            <JokeDetailsModal
                id={joke.id} 
                question={joke.question} 
                answer={joke.answer} 
                dateCreated={joke.dateCreated}
                dateUpdated={joke.dateUpdated} 
                user={user}

                show={modalShow} 
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Notification;