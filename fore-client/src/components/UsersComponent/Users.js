import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import SingleUser from '../SingleUserComponent/SingleUser';
import jwt_decode from "jwt-decode";

const Users = (props) => {
    const [users1, setUsers1] = useState([]);
    const [token, setToken] = React.useState('');

    useEffect(() => {
        axios('http://localhost:3000/users')
            .then(response => {
                setToken(sessionStorage.getItem('token'));
                setUsers1(response.data);
            })
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
                        !token || (token && jwt_decode(token).id !== u.id) ? <SingleUser user={u}/> : <></>
                    ))
                }
            </Container>
        </>
    )
}

export default Users;