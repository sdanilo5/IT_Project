import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const SignUpModal = (props) => {
    
    const signUpBtnClick = () => {
        var userName = document.getElementById('username-su-input').value;
        var userEmail = document.getElementById('email-su-input').value;
        var userPassword = document.getElementById('password-su-input').value;
        var userConfirmPassword = document.getElementById('confirm-password-su-input').value;
        
        if(userName && userEmail && userPassword && userConfirmPassword && userPassword === userConfirmPassword){
            const article = {
                name: userName,
                email: userEmail,
                password: userPassword
            }

            axios.post('http://localhost:3000/users/', article)
                .then(response =>{
                    document.getElementById('username-su-input').style.borderColor = 'lightgray';
                    document.getElementById('email-su-input').style.borderColor = 'lightgray';
                    document.getElementById('password-su-input').style.borderColor = 'lightgray';
                    document.getElementById('confirm-password-su-input').style.borderColor = 'lightgray';
                    
                    const article2 = {
                        email: userEmail,
                        password: userPassword
                    }
                    axios.post('http://localhost:3000/login/', article2)
                    .then(response =>{
                        let token = response.data.token;
                        sessionStorage.setItem('token', token);
                        window.location.replace(`http://localhost:3001/`);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                })
                .catch(err => console.log(err));
        }
        else{
            if(!userName)
                document.getElementById('username-su-input').style.borderColor = 'red';
            if(!userEmail)
                document.getElementById('email-su-input').style.borderColor = 'red';
            if(!userPassword)
                document.getElementById('password-su-input').style.borderColor = 'red';
            if(!userConfirmPassword)
                document.getElementById('confirm-password-su-input').style.borderColor = 'red';
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
                <h1>Sign Up</h1>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3">
                        <h5>Username</h5>
                        <Form.Control id='username-su-input' type="text" placeholder="Username"/>
                        <br></br>
                        <h5>Email</h5>
                        <Form.Control id='email-su-input' type="email" placeholder="Email"/>
                        <br></br>
                        <h5>Password</h5>
                        <Form.Control id='password-su-input' type="password" placeholder="Password"/>
                        <br></br>
                        <h5>Confirm Password</h5>
                        <Form.Control id='confirm-password-su-input' type="password" placeholder="Confirm Password"/>
                    </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => signUpBtnClick()}>Sign up</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal;