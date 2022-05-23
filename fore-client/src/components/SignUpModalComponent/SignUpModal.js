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

const SignUpModal = (props) => {
    var file = '';
    
    const signUpBtnClick = () => {
        var userName = document.getElementById('username-su-input').value;
        var userEmail = document.getElementById('email-su-input').value;
        var userPassword = stringToHash(document.getElementById('password-su-input').value);
        
        const article = {
            name: userName,
            email: userEmail,
            password: userPassword
        }

        axios.post('http://localhost:3000/users/', article)
            .then(response =>{
                const id = window.location.replace("http://localhost:3001/");
                if(file[0].name !== ''){
                    // sacuvaj file
                    console.log(file); // radi
                    
                }
            })
            .catch(err => console.log(err));
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
                <h1>Sign Up</h1>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <h5>Username</h5>
                        <Form.Control id='username-su-input' type="text" placeholder="Username"/>
                        <br></br>
                        <h5>Email</h5>
                        <Form.Control id='email-su-input' type="email" placeholder="Email"/>
                        <br></br>
                        <h5>Password</h5>
                        <Form.Control id='password-su-input' type="password" placeholder="Password"/>
                    </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => signUpBtnClick()}>Sign up</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <small>already registerd <a className='text-primary text-decoration-none' href='#'>log in</a>?</small>
            </Modal.Footer>
        </Modal>
    )
}

export default SignUpModal;