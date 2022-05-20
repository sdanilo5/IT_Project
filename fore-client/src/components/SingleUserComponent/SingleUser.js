import React from 'react';
import {Image, Card} from 'react-bootstrap';
import img from './../../opasnost.jpg';

const SingleUser = (props) => {
    return (
        <div 
            className={`card text-center border border-white rounded shadow`}
            style={{ 
                cursor: 'pointer', 
                backgroundColor: 'rgba(169, 169, 169, 0.6)' }}
        >
            <div className='' style={{display: 'table-row',zIndex:'1'}}>
                <Image
                    style={{width: '9rem', height: '9rem', position: 'relative', margin: '2rem 2rem 0rem 2rem'}}
                    src={img}
                    className='rounded-circle'
                />
                <hr style={{borderTop: '1px solid rgba(255, 255, 255)', marginBottom: '0'}}></hr>
            </div>
            <div className='' style={{display: 'table-row'}}>
                <Card.Body>
                    <Card.Title>{props.user.name}</Card.Title>
                    <Card.Text></Card.Text>
                </Card.Body>
            </div>
        </div>
    )
}

export default SingleUser;