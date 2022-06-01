import React from 'react';
import defaultImg from './../../images/users/default-user-image.jpg';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const EditProfile = (props) => {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
            const token = sessionStorage.getItem('token');
            const userId = jwt_decode(token).id;
            axios.get(`http://localhost:3000/users/${userId}`)
                .then(response => {
                    console.log(response.data);
                    setUser(response.data[0]);
                })
                .catch(err => console.error("Error: ", err))
        }, [])

    const editProfile = () => {
        
        
    }

    return (
        <section>

        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-8">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={defaultImg} className="rounded-circle img-fluid"/>
                            <h5 className="my-3">{user.name}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-10">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Username</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{user.name}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{user.email}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Password</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Confirm Password</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Profile Picture</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0"></p>
                                </div>
                            </div>
                            
                            <div className="row mt-3">
                                <Button variant="primary" size="md" onClick={() => editProfile()}>Edit</Button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </section>
    )
}

export default EditProfile;