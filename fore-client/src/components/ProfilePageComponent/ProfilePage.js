import React from 'react';
import axios from 'axios';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import InsertJokeModal from '../InsertJokeModalComponent/InsertJokeModal';
import defaultImg from './../../images/users/default-user-image.jpg';
import jwt_decode from "jwt-decode";

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
    const [insertJokeModalShow, setInsertJokeModalShow] = React.useState(false);

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
            <div className="row py-5 px-4">
                <div className="col-xl-8 col-md-10 col-sm-10 mx-auto">

                    <div className="bg-white shadow rounded overflow-hidden">

                        <div className="px-4 pt-0 pb-4 bg-dark">
                            <div className="media align-items-end profile-header">
                                <div className="profile mr-3">
                                    <img 
                                        src={typeof props.img === 'undefined' ? defaultImg : props.img}
                                        alt="..." 
                                        width="35%" 
                                        className="rounded mb-2 mt-4 img-thumbnail" 
                                    />
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{user.name}</h4>
                                    {/* <p className="small mb-4"> 
                                        <i className="fa fa-map-marker mr-2"></i>
                                        San Farcisco
                                    </p> */}
                                </div>
                            </div>
                        </div>

                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">{user.jokes.length}</h5><small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Jokes</small>
                                </li>
                            </ul>
                        </div>

                        <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">{user.name}'s Jokes</h5>
                                <a 
                                    className={ !window.sessionStorage.getItem('token') || (jwt_decode(window.sessionStorage.getItem('token')).id != user.id) ? 'd-none' : 'btn btn-outline-primary'}
                                    onClick={() => setInsertJokeModalShow(true)}
                                    >
                                        Insert Joke
                                </a>
                            </div>
                            <hr/>
                            <div className="row flex-grid justify-content-center align-content-center">
                                {
                                    user.jokes.map(joke => {
                                        return <div className="col d-flex justify-content-center align-content-center">
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
                <InsertJokeModal 
                    show={insertJokeModalShow} 
                    onHide={() => setInsertJokeModalShow(false)}
                />
            </div>
        </>
    )
}

export default ProfilePage;