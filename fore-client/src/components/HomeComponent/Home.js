import React from 'react';
import {Row, Col} from 'react-bootstrap';
import SignUpModal from './../SignUpModalComponent/SignUpModal';
import LogInModal from './../LogInModalComponent/LogInModal';
import jwt_decode from "jwt-decode";

function Home() {
    const [signUpModalShow, setSignUpModalShow] = React.useState(false);
    const [logInModalShow, setLogInModalShow] = React.useState(false);
  
    return (
        <>
            <h1 className='text-center text-light display-1'>Welcome</h1>
            <h2 className='text-center text-light display-6'>to Fore Noćne More</h2>

            <Row className='d-flex flex-wrap justify-content-center align-items-center mt-5'>
                <Row>
                    <Col 
                        className='d-block border rounded border-dark shadow p-5 m-5 bg-light' 
                        >   
                        <blockquote className="blockquote text-center">
                            <p className="mb-4 display-6">Did you ever wonder how do trees access the internet?</p>
                            <h4 className='text-muted mb-4'>- They log in ;)</h4>
                            <small 
                                className={
                                        !window.sessionStorage.getItem('token') ? 'd-none' : 'text-muted' 
                                    }
                                >
                                    So did you.
                            </small>
                        </blockquote>
                    </Col>
                </Row>
                <Row>
                    <Col className=
                        {
                            window.sessionStorage.getItem('token') ? 'd-none' : 'd-block border rounded border-dark shadow p-5 m-5 bg-light' 
                        }
                    >
                        <blockquote className="blockquote text-center">
                            <p className='text-center h1'>Don't have account?</p>
                            <btn 
                                className='btn btn-outline-success btn-lg m-2' 
                                onClick={() => setSignUpModalShow(true)}
                            >Sign Up</btn>
                            <p className='text-center text-muted'>Make your first joke!</p>
                        </blockquote>
                    </Col>
                    <Col className=
                        {
                            window.sessionStorage.getItem('token') ? 'd-none' : 'd-block border rounded border-dark shadow p-5 m-5 bg-light' 
                        }
                    >
                        <blockquote className="blockquote text-center">
                            <p className='text-center h1'>Already have account?</p>
                            <btn 
                                className='btn btn-outline-primary btn-lg m-2'
                                onClick={() => setLogInModalShow(true)}
                            >Log In</btn>
                            <p className='text-center text-muted'>Be the first one to make joke today!</p>
                        </blockquote>
                    </Col>
                </Row>
            </Row>

            <SignUpModal 
                show={signUpModalShow} 
                onHide={() => setSignUpModalShow(false)}
            />

            <LogInModal 
                show={logInModalShow} 
                onHide={() => setLogInModalShow(false)}
            />
        </>
    );
}

export default Home;