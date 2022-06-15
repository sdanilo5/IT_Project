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
                    setUser(response.data[0]);
                })
                .catch(err => console.error("Error: ", err))
        }, [])

    const editProfile = () => {
        const userName = document.getElementById('edit-username-textarea').value;
        const email = document.getElementById('edit-email-textarea').value;
        const password = document.getElementById('edit-password-textarea').value;
        const confirmPassword = document.getElementById('edit-confirm-password-textarea').value;
        const file = document.getElementById('profile-picture-input').files[0];
        const token = sessionStorage.getItem('token');
        
        let newUserData = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            pictureName: user.pictureName
        };

        let hasChange = false;

        if(userName && userName !== user.userName){
            newUserData.name = userName;
            hasChange = true;
        }

        if(email && email !== user.email){
            newUserData.email = email;
            hasChange = true;
        }

        if(password && confirmPassword && password === confirmPassword && password !== user.password){
            newUserData.password = password;
            hasChange = true;
        }
        else if(password !== confirmPassword){
            alert('Check your password.');
            return;
        }

        if(file && file.name !== user.pictureName){
            newUserData.pictureName = file.name;
            hasChange = true;
        }

        if(hasChange){
            axios.put(`http://localhost:3000/users/${user.id}`, newUserData, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if(file && file.name !== user.pictureName){
                        var formData = new FormData();
                        formData.append('image', file);
                        
                        axios.post(`http://localhost:3000/users/upload`, formData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': file.type
                            }
                        })
                            .then(response => {
                                // console.log('all good');
                                // console.log(response);
                                window.location.replace(`http://localhost:3001/users/${user.id}`);
                            })
                            .catch(err => console.error(err));
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <section>
            <div className="container py-5">

                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-10">
                        <div className="card mb-4 shadow">
                            <div className='card-header'>

                                <div className="row justify-content-center">
                                    <div>
                                        <div className="card-body text-center">
                                            {
                                                user.pictureName ? 
                                                <img src={`${window.location.origin}/images/${user.pictureName}`} className="rounded-circle img-fluid" style={{width: '18rem', height: '18rem'}}/> : 
                                                <img src={defaultImg} className="rounded-circle img-fluid"/>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div>
                                        <h5 className="mb-1">Username</h5>
                                        <input id='edit-username-textarea' type='text' className="form-control container-fluid mb-3" value={user.name} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        <h5 className="mb-1">Email</h5>
                                        <input id='edit-email-textarea' type='email' className="form-control container-fluid mb-3" value={user.email} />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div>
                                        <h5 className="mb-1">Password</h5>
                                        <input id='edit-password-textarea' type='password' className="form-control container-fluid mb-3"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div>
                                        <h5 className="mb-1">Confirm Password</h5>
                                        <input id='edit-confirm-password-textarea' type='password' className="form-control container-fluid mb-3"/>
                                    </div>
                                </div>
                               
                                <div className="row">
                                    <div class="mb-3">
                                        <h5 className="mb-1">Profile Picture</h5>
                                        <input class="form-control" type="file" accept='image/*' id="profile-picture-input" />
                                    </div>
                                </div>

                                <hr />

                                <div className="row mt-3">
                                    <Button variant="outline-primary" size="md" onClick={() => editProfile()}>Edit</Button>
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