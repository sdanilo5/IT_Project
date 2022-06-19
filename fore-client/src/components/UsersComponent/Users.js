import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import SingleUser from '../SingleUserComponent/SingleUser';
import jwt_decode from "jwt-decode";

const Users = (props) => {
    const [users1, setUsers1] = useState([]);
    const [token, setToken] = React.useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setToken(sessionStorage.getItem('token'));
                setUsers1(response.data);
            })
            .catch(err => {
                console.error("Error: ", err);
            })
    }, [])

    
    const isInputEmpty = () => {
        setTimeout(()=> {
            const searchWords = document.getElementById('search-users').value;
            if(!searchWords){
                searchUsers();
            }
            console.log('bri');
        }, 1000)
    }

    const searchUsers = () => {
        const searchWords = document.getElementById('search-users').value;

        axios.get('http://localhost:3000/users')
            .then(response => {
                let users = [];
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].name.includes(searchWords)){
                        users.push(response.data[i]);
                    }
                }
                setUsers1(users);
            })
            .catch(err => {
                console.error("Error: ", err);
            })
    }

    const handleKeyPressed = (event) => {
        if(event.key === "Enter"){
          //event.preventDefault();
          searchUsers();
        }
    }

    return(
        <>
            <h1 className='text-center text-light'>Users Page</h1>

            <div className='d-flex justify-content-center'>
                <div class="container">
                    <div class="row height d-flex justify-content-center align-items-center">
                        <div class="col-md-6 col-sm-7 col-7">
                            <div class="form">
                                <input id='search-users' 
                                    type="text" 
                                    class="form-control form-input" 
                                    placeholder="Search users..." 
                                    onKeyDown={handleKeyPressed}
                                    onChange={() => isInputEmpty()}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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