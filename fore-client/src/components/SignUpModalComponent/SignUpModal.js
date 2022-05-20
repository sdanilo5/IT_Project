import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const SignUpModal = (props) => {

    const signUpBtnClick = () => {
        var userName = document.getElementById('username-su-input').value;
        var email = document.getElementById('email-su-input').value;
        var password = document.getElementById('password-su-input').value;

        
    }

    return(
        <Modal
          {...props}
          size="lg"
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