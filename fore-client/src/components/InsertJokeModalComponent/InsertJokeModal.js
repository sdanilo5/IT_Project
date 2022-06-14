import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const InsertJokeModal = (props) => {

    const insertJokeBtnClick = () => {
        var question = document.getElementById('question-input').value;
        var answer = document.getElementById('answer-input').value;
        var token = sessionStorage.getItem('token');

        const article = {
            question: question,
            answer: answer,
            userId: jwt_decode(token).id
        }
        
        axios.post('http://localhost:3000/jokes/', article , {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response =>{
                window.location.replace(`http://localhost:3001/users/${jwt_decode(token).id}`);
            })
            .catch(err => {
                console.log(err);
                alert('Make sure to enter fill the fields with data!');
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
                <h1>Insert Joke</h1>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <h5>Question</h5>
                        <Form.Control id='question-input' type="text"/>
                        <br></br>
                        <h5>Answer</h5>
                        <Form.Control id='answer-input' type="text"/>
                    </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => insertJokeBtnClick()}>Insert</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default InsertJokeModal;