import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import SingleUser from '../SingleUserComponent/SingleUser';

const Users = (props) => {
    const [users1, setUsers1] = useState([]);

    useEffect(() => {
        axios('http://localhost:3000/users')
            .then(response => setUsers1(response.data))
            .catch(err => {
                console.error("Error: ", err);
            })
    }, [])

    return(
        <>
            <h1 className='text-center text-light'>Users Page</h1>
            <Container className='card-container'>
                {
                    users1.map(u => (
                        <SingleUser user={u}/>
                    ))
                }
            </Container>
        </>
    )
}

export default Users;