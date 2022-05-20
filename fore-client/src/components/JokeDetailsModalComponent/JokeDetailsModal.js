import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import defaultImg from './../../images/users/default-user-image.jpg';

const JokeDtailsModal = React.memo((props) => {
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/comments/${props.id}`)
          .then(response => {
              console.log(response.data);
              let comms = response.data.map(comm => (
                {
                  user: {
                    id: comm.userId,
                    name: comm.name
                  },
                  comment: {
                    id: comm.id,
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
      if(comment === ""){
        return;
      }
      
      const article = {
          "userId": 1,
          "foraId": props.id,
          "text": comment
      };

      axios.post('http://localhost:3000/comments/', article)
        .then(response => {
          console.log(response);
          if(response.status === 200){
            setUpdate(!update);
            const commentInput = document.getElementById('comment-input');
            commentInput.value = "";
          }
        })
        .catch(err => console.error(err));
    }

    const handleChange = (event) => {
      setComment(event.target.value);
    };

    const handleKeyPressed = (event) => {
      if(event.key === "Enter"){
        event.preventDefault();
        submitComment();
      }
    }

    const removeComment = (id) => {
      axios.delete(`http://localhost:3000/comments/${id}`)
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
            <Modal.Body style={{backgroundColor: '#f7f6f6'}}>
                    <h4>{props.question}</h4>
                    <h6>{props.answer}</h6>
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
                                    <small onClick={() => removeComment(comment.comment.id)}>Remove</small>
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
                        <Form.Control id='comment-input' type="text" placeholder="Comment" onChange={handleChange} onKeyDown={handleKeyPressed}/>
                      </Form.Group>
                      <Button variant="primary" onClick={submitComment}>
                        Submit
                      </Button>
                    </Form>                    
            </Modal.Body>
            <Modal.Footer>
                    <p className='me-auto'>{`${props.dateCreated}`.split('T')[0]}</p>
                    <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
});

export default JokeDtailsModal;