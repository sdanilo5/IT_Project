import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

function stringToHash(string) {
                  
    var hash = 0;
      
    if (string.length == 0) return hash;
      
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
      
    return hash;
}

const LogInModal = (props) => {

    const logInBtnClick = () => {
        var userEmail = document.getElementById('email-su-input').value;
        var userPassword = document.getElementById('password-su-input').value;
        
        const article = {
            email: userEmail,
            password: userPassword
        }
        
        axios.post('http://localhost:3000/login/', article)
            .then(response =>{
                console.log(response);
                let token = response.data.token;
                sessionStorage.setItem('token', token);
                window.location.replace(`http://localhost:3001/`);
            })
            .catch(err => {
                console.log(err);
                alert('Invalid email or password!');
            });
    }

    return(
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation
          autoFocus
        >
            <Modal.Header className='justify-content-center'>
                <h1>Log In</h1>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <h5>Email</h5>
                        <Form.Control id='email-su-input' type="email" placeholder="Email"/>
                        <br></br>
                        <h5>Password</h5>
                        <Form.Control id='password-su-input' type="password" placeholder="Password"/>
                    </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => logInBtnClick()}>Log In</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small>dont have an account <a className='text-primary text-decoration-none' href='#'>sign up</a>?</small>
            </Modal.Footer>
        </Modal>
    )
}

export default LogInModal;