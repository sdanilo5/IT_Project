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
    const [user, setUser] = React.useState({
        id: 0,
        name: "",
        jokes: [],
    });
    const [favourites, setFavourites] = React.useState([]);
    const [insertJokeModalShow, setInsertJokeModalShow] = React.useState(false);
    const [showFavourites, setShowFavourites] = React.useState(false);

    React.useEffect(()=> {
        const url = window.location.href;
        const splitedUrl = url.split('/');
        const id = splitedUrl[splitedUrl.length-1];
        
        getFavouriteJokes();

        if(!showFavourites){
            axios.get(`http://localhost:3000/users/${id}`)
                .then(response => {
                        const data = response.data;
                        setUser({
                            id: data[0].id,
                            name: data[0].name,
                            pictureName: data[0].pictureName,
                            isDeleted: data[0].isDeleted,
                            jokes: data[1]
                        });
                    })
                .catch(err => console.error('Error: ', err));
        }
    }, [])

    const blockUserAction = () => {
        const token = sessionStorage.getItem('token');
        axios.delete(`http://localhost:3000/users/${user.id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                alert('User has been blocked');
                window.location.replace(`http://localhost:3001/users`);
            })
            .catch(err => console.error(err));
    }

    const unblockUserAction = () => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        axios.put(`http://localhost:3000/users/blocked`, user, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                alert('User has been unblocked');
                window.location.assign(`http://localhost:3001/users`);
            })
            .catch(err => console.error(err));
    }

    const getFavouriteJokes = async () => {
        await axios.get(`http://localhost:3000/favourite-jokes/${user.id}`)
        .then(response => {
                const data = response.data;
                let jokes = [];
                if(data.length > 0){
                    for(let i = 0; i < data.length; i++){
                        jokes.push({
                            id: data[i].id,
                            question: data[i].question,
                            answer: data[i].answer,
                            dateCreated: data[i].dateCreated,
                            dateUpdated: data[i].dateUpdated,
                            userId: data[i].userId,
                            userName: data[i].name
                        });
                    }
                }
                setFavourites({
                    jokes: jokes
                });
            
            })
        .catch(err => console.error('Error: ', err));
    }

    const showFavouriteJokes = async () => {
        setShowFavourites(!showFavourites);
        
        if(!showFavourites){
            getFavouriteJokes();
        }
        else{
            axios.get(`http://localhost:3000/users/${user.id}`)
                .then(response => {
                        const data = response.data;
                        setUser({
                            id: data[0].id,
                            name: data[0].name,
                            pictureName: data[0].pictureName,
                            isDeleted: data[0].isDeleted,
                            jokes: data[1]
                        });
                    })
                .catch(err => console.error('Error: ', err));
        }
    }

    return (
        <>
            <div className="row py-5 px-4">
                <div className="col-xl-8 col-md-10 col-sm-10 mx-auto">

                    <div className="bg-white shadow rounded overflow-hidden">

                        <div className="px-4 pt-0 pb-2 bg-dark">
                            <div className="media align-items-end profile-header">
                                <div className="profile mr-3">
                                    <img 
                                    src={!user.pictureName ? defaultImg : `${window.location.origin}/images/${user.pictureName}`}
                                    alt="..." 
                                    style={{width: '18rem', height: '18rem'}}
                                    className="rounded mb-2 mt-4 img-thumbnail" 
                                    />
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0">{user.name}</h4>
                                    {
                                        sessionStorage.getItem('token') && jwt_decode(sessionStorage.getItem('token')).role === 'admin' && jwt_decode(sessionStorage.getItem('token')).id !== user.id ? (
                                            user.isDeleted === 0 ? (
                                                <a className='btn btn-outline-danger w-100 mt-3' onClick={() => blockUserAction()}>Block User</a>
                                            ) : (
                                                <a className='btn btn-outline-success w-100 mt-3' onClick={() => unblockUserAction()}>Unblock User</a>
                                            )
                                        ) : <></>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="bg-light p-4 d-flex justify-content-between text-center">
                            <div>
                                <a 
                                    className='btn btn-outline-success btn-lg'
                                    onClick={() => showFavouriteJokes(true)}
                                    >
                                        {
                                            !showFavourites ? 'Show Favourites' : 'Show User Jokes'
                                        }
                                </a>
                            </div>
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
                                    className={ showFavourites || (!window.sessionStorage.getItem('token') || (jwt_decode(window.sessionStorage.getItem('token')).id !== user.id)) ? 'd-none' : 'btn btn-outline-primary'}
                                    onClick={() => setInsertJokeModalShow(true)}
                                    >
                                        Insert Joke
                                </a>
                            </div>
                            <hr/>
                            
                            <div className="row flex-grid justify-content-center align-content-center">
                                {
                                    showFavourites ? (
                                        favourites.jokes.map(joke => {
                                            return (
                                                <div className="col d-flex justify-content-center align-content-center" key={`profile-joke1-${joke.id}`}>
                                                    <SingleJoke
                                                        joke={{
                                                            id: joke.id,
                                                            question: joke.question,
                                                            answer: joke.answer,
                                                            dateCreated: joke.dateCreated,
                                                            dateUpdated: joke.dateUpdated,
                                                        }}
                                                        user={{id: joke.userId, name: joke.userName}}
                                                        variant = {variants[incrementInd()]}
                                                        favourites = {true}
                                                    />
                                                </div>
                                            )
                                        })
                                    ) : (
                                        user.jokes.map(joke => {
                                            return <div className="col d-flex justify-content-center align-content-center" key={`profile-joke2-${joke.id}`}>
                                                        <SingleJoke
                                                            joke={joke}
                                                            user={{id: user.id, name: user.name}}
                                                            variant = {variants[incrementInd()]}
                                                        />
                                                    </div>
                                        })
                                    )
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