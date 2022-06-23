import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const LogInModal = (props) => {

    const logInBtnClick = () => {
        var userEmail = document.getElementById('email-lg-input').value;
        var userPassword = document.getElementById('password-lg-input').value;
        
        if(userEmail && userPassword){
            const article = {
                email: userEmail,
                password: userPassword
            }
            
            axios.post('http://localhost:3000/login/', article)
                .then(response =>{
                    let token = response.data.token;
                    sessionStorage.setItem('token', token);
                    document.getElementById('email-lg-input').style.borderColor = 'lightgray';
                    document.getElementById('password-lg-input').style.borderColor = 'lightgray';
                    window.location.assign(`http://localhost:3001/`);
                })
                .catch(err => {
                    //console.error(err);
                    alert('Invalid email or password!');
                });
        }
        else{
            if(!userEmail)
                document.getElementById('email-lg-input').style.borderColor = 'red';
            if(!userPassword)
                document.getElementById('password-lg-input').style.borderColor = 'red';
        }
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
                    <Form.Group className="mb-3">
                        <h5>Email</h5>
                        <Form.Control id='email-lg-input' type="email" placeholder="Email"/>
                        <br></br>
                        <h5>Password</h5>
                        <Form.Control id='password-lg-input' type="password" placeholder="Password"/>
                    </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => logInBtnClick()}>Log In</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LogInModal;