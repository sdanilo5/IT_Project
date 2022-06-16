import React from 'react';
import {Toast} from 'react-bootstrap';
import defaultImg from './../../images/users/default-user-image.jpg';

const Notification = (props) => {
    
    return (
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
            <Toast.Body>{props.notification.description}</Toast.Body>
        </Toast>
    )
}

export default Notification;