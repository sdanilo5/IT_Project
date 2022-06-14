import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import defaultImg from './../../images/users/default-user-image.jpg';
import jwt_decode from "jwt-decode";

const JokeDtailsModal = React.memo((props) => {
    const [comments, setComments] = React.useState([]);
    //const [comment, setComment] = React.useState('');
    const [update, setUpdate] = React.useState(false);
    const [token, setToken] = React.useState('');

    React.useEffect(() => {
        setToken(sessionStorage.getItem('token'));
        axios.get(`http://localhost:3000/comments/${props.id}`)
          .then(response => {
              let comms = response.data.map(comm => (
                {
                  user: {
                    id: comm.userId,
                    name: comm.name
                  },
                  comment: {
                    id: comm.id,
                    userId: comm.userId,
                    text: comm.text,
                    dateCreated: `${comm.dateCreated}`.split('T')[0]
                  }
                }
              ))
              setComments([...comms]);
          })
          .catch(err => console.error("Error: ", err));
    }, [update])

    const submitComment = () => {
      const comment = document.getElementById('comment-input').value;
      
      if(comment === ""){
        return;
      }
      
      if(token){
        const article = {
            "userId": jwt_decode(token).id,
            "foraId": props.id,
            "text": comment
        };

        axios.post('http://localhost:3000/comments/', article, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if(response.status === 200){
              setUpdate(!update);
              const commentInput = document.getElementById('comment-input');
              commentInput.value = "";
            }
          })
          .catch(err => console.error(err));
      }
      else{
        console.log('You are not logged in');
      }

    }

    const handleKeyPressed = (event) => {
      if(event.key === "Enter"){
        event.preventDefault();
        submitComment();
      }
    }

    const removeComment = (id) => {
      if(token){
        axios.delete(`http://localhost:3000/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if(response.status === 200){
              setUpdate(!update);
            }
            else{
              console.log('ERROR CODE ', response.status);
            }
          })
          .catch(err => console.error(err));
      }
      else{
        console.log(err => console.error(err));
      }
    }

    const editBtnClicked = () => {
      let editJokeDiv = document.getElementById('edit-joke-div');
      let normalJokeDiv = document.getElementById('normal-joke-div');
      let editJokeBtn = document.getElementById('edit-joke-btn');
      let deleteJokeBtn = document.getElementById('delete-joke-btn');
      
      editJokeDiv.style.display = 'block';
      normalJokeDiv.style.display = 'none';
      editJokeBtn.style.display = 'none';
      deleteJokeBtn.style.display = 'none';
    }

    const editFinished = () => {
      let editJokeDiv = document.getElementById('edit-joke-div');
      let normalJokeDiv = document.getElementById('normal-joke-div');
      let editJokeBtn = document.getElementById('edit-joke-btn');
      let deleteJokeBtn = document.getElementById('delete-joke-btn');
      
      const article = {
        question: document.getElementById('edit-joke-question-textarea').value,
        answer: document.getElementById('edit-joke-answer-textarea').value
      };
      
      axios.put(`http://localhost:3000/jokes/${props.id}`, article, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if(response.status === 200){
            window.location.replace(`http://localhost:3001/users/${props.user.id}`);
          }
        })
        .catch(err =>{
          console.error(err);
        });
        
      editJokeDiv.style.display = 'none';
      normalJokeDiv.style.display = 'block';
      editJokeBtn.style.display = 'inline';
      deleteJokeBtn.style.display = 'inline';
    }

    const deleteBtnClicked = () => {
      let confirmDelete = window.confirm("Are you sure to delete this joke?");
      if(confirmDelete){
        // delete

      }
    }

    return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation
            autoFocus
          >
              <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                          {props.user.name}
                      </Modal.Title>
              </Modal.Header>
              <Modal.Body 
                style={{backgroundColor: '#f7f6f6'}}
              >
                <div id='normal-joke-div'>
                      <h4 className='text-center'>{props.question}</h4>
                      <h6 className='text-center'>{props.answer}</h6>
                      <hr></hr>
                      <Form>
                        {
                          comments?.map(comment => {
                            return (
                                <div class="comment-card p-3">
                                <div class="d-flex justify-content-between align-items-center">
                                  <div class="user d-flex flex-row align-items-center">
                                    <img 
                                      src={typeof props.img === 'undefined' ? defaultImg : props.img}
                                      width="30" 
                                      class="user-img rounded-circle mr-2" 
                                    />
                                    <span><small class="font-weight-bold text-primary"> {comment.user.name} </small> 
                                    <small class="font-weight-bold">{comment.comment.text}</small></span>
                                  </div>
                                  <small></small>
                                </div>
                                <div class="action d-flex justify-content-between mt-2 align-items-center">
                                  <div class="reply px-4">
                                      {
                                        token ? (
                                          comment.comment.userId === jwt_decode(token).id || jwt_decode(token).role === 'admin' ? 
                                          <small onClick={() => removeComment(comment.comment.id)}>Remove</small> : <small></small>
                                        )
                                        :  <small></small>
                                      }
                                  </div>
                                  <div class="icons align-items-center">
                                      <i class="fa fa-star text-warning"></i>
                                      <i class="fa fa-check-circle-o check-icon"></i>
                                      <small style={{color: '#b7b4b4'}}>{comment.comment.dateCreated}</small>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                        <br></br>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Control id='comment-input' type="text" placeholder="Comment" onKeyDown={handleKeyPressed}/>
                        </Form.Group>
                        <Button variant="primary" onClick={submitComment}>
                          Submit
                        </Button>
                      </Form> 
                </div>    
                <div id='edit-joke-div' style={{display: 'none'}}>
                  <h1 className='text-center'>Edit Joke</h1>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <h5>Question</h5>
                    <textarea class="form-control" id="edit-joke-question-textarea" rows="3">{props.question}</textarea>
                    <br></br>
                    <h5>Answer</h5>
                    <textarea class="form-control" id="edit-joke-answer-textarea" rows="3">{props.answer}</textarea>
                  </Form.Group>
                  <div className='d-flex justify-content-center'>
                    <Button variant="primary" size="md" onClick={() => editFinished()}>Edit</Button>
                  </div>
                </div>            
              </Modal.Body>
              <Modal.Footer>
                      <p className='me-auto'>{`${props.dateCreated}`.split('T')[0]}</p>
                      <div>
                        <a id='edit-joke-btn' className='btn btn-outline-primary mr-2 pr-5' style={{marginRight: '1rem'}} onClick={() => editBtnClicked()}>Edit</a>
                        <a id='delete-joke-btn' className='btn btn-outline-danger ml-2' onClick={() => deleteBtnClicked()}>Delete</a>
                      </div>
              </Modal.Footer>
          </Modal>
      );
});

export default JokeDtailsModal;