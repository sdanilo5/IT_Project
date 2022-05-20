import React from 'react';
import {Image} from 'react-bootstrap';
import img from './../../opasnost.jpg';

const SingleUser = (props) => {
    return (
        <>
            <div 
                className={`user-card-div text-center border border-white rounded shadow`}
            >
                <div className='' style={{display: 'table-row'}}>
                    <Image
                        style={{width: '9rem', height: '9rem', position: 'relative', marginTop: '2rem'}}
                        src={img}
                        className='rounded-circle'
                    />
                </div>
                <div className='' style={{display: 'table-row'}}>
                    <hr style={{borderTop: '1px solid rgba(255, 255, 255)'}}></hr>
                    <h4 className='text-center text-dark'>{props.user.name}</h4>
                </div>
            </div>
        </>
    )
}

export default SingleUser;