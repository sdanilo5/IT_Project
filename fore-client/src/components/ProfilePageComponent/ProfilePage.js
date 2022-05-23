import React from 'react';
import axios from 'axios';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import defaultImg from './../../images/users/default-user-image.jpg';

var variants = [
    'Success', 
    'Warning', 
    'Light', 
    'Dark'
];
var ind = -1;
const incrementInd = () => {
    ind=ind+1;
    if(ind === variants.length){
        ind = 0;
    }
    return ind;
}

const ProfilePage = (props) => {
    const [jokes, setJokes] = React.useState([]);
    const [user, setUser] = React.useState({
        id: 0,
        name: "",
        jokes: [],
    });

    React.useEffect(()=> {
        const url = window.location.href;
        const splitedUrl = url.split('/');
        const id = splitedUrl[splitedUrl.length-1];

        axios.get(`http://localhost:3000/users/${id}`)
            .then(response => {
                    const data = response.data;
                    setUser({
                        id: data[0].id,
                        name: data[0].name,
                        jokes: data[1]
                    });
                })
            .catch(err => console.error('Error: ', err));
    }, [])

    return (
        <>
            <div class="row py-5 px-4">
                <div class="col-xl-8 col-md-10 col-sm-10 mx-auto">

                    <div class="bg-white shadow rounded overflow-hidden">

                        <div class="px-4 pt-0 pb-4 bg-dark">
                            <div class="media align-items-end profile-header">
                                <div class="profile mr-3">
                                    <img 
                                        src={typeof props.img === 'undefined' ? defaultImg : props.img}
                                        alt="..." 
                                        width="35%" 
                                        class="rounded mb-2 mt-4 img-thumbnail" 
                                    />
                                    <a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a>
                                </div>
                                <div class="media-body mb-5 text-white">
                                    <h4 class="mt-0 mb-0">{user.name}</h4>
                                    <p class="small mb-4"> 
                                        <i class="fa fa-map-marker mr-2"></i>
                                        San Farcisco
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-light p-4 d-flex justify-content-end text-center">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <h5 class="font-weight-bold mb-0 d-block">{user.jokes.length}</h5><small class="text-muted"> <i class="fa fa-picture-o mr-1"></i>Jokes</small>
                                </li>
                            </ul>
                        </div>

                        <div class="py-4 px-4">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h5 class="mb-0">{user.name}'s Jokes</h5>
                            </div>
                            <div class="row flex-grid justify-content-center align-content-center">
                                {
                                    user.jokes.map(joke => {
                                        return <div class="col d-flex justify-content-center align-content-center">
                                                    <SingleJoke
                                                        joke={joke}
                                                        user={{id: user.id, name: user.name}}
                                                        variant = {variants[incrementInd()]}
                                                    />
                                                </div>
                                    })
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfilePage;