import React from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import SingleUser from '../SingleUserComponent/SingleUser';
import jwt_decode from "jwt-decode";

const BlockedUsers = () => {
    const [users1, setUsers1] = React.useState([]);
    const [token, setToken] = React.useState('');

    React.useEffect(() => {
        setToken(sessionStorage.getItem('token'));
        axios.get('http://localhost:3000/users/blocked', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          })
            .then(response => {
                setUsers1(response.data);
            })
            .catch(err => {
                console.error("Error: ", err);
            })
    }, [])

    return(
        <>
            <h1 className='text-center text-light'>Blocked Users Page</h1>
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

export default BlockedUsers;