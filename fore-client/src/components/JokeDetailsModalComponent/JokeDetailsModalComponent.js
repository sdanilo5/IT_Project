import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const JokeDtailsModalComponent = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.user.name}
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <h4>{props.question}</h4>
                    <h6>{props.answer}</h6>
                    <hr></hr>
                    <p>comments...</p>
            </Modal.Body>
            <Modal.Footer>
                    <p className='me-auto'>{`${props.dateCreated}`.split('T')[0]}</p>
                    <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
}

export default JokeDtailsModalComponent;