import './../../index.css'
import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Webimage from '../BackgroundImageComponent/BackgroundImage';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import {Link} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,

} from 'react-bootstrap';

function Jokes(){
    const [state, setState] = useState({jokes: []});

    useEffect(() => {
        axios.get('http://localhost:3000/jokes')
            .then(response => {
                const joke = {
                    joke: {
                        id: response.data[0].id,
                        question: response.data[0].question,
                        answer: response.data[0].answer,
                        dateCreated: response.data[0].dateCreated,
                        dateUpdated: response.data[0].dateUpdated
                    },
                    user: {
                        id: response.data[0].userId,
                        name: response.data[0].name
                    }
                };
                
                setState({
                    jokes: [joke, joke, joke, joke, joke, joke, joke]
                });
            })
            .catch(err => {
                console.error("Errorrrr: ", err);
            })
    }, [])

    return(    
        <>
            <h1 className='text-center mb-4  text-light'>Jokes Page</h1>
            <Container className='card-container'>
                {
                    state.jokes?.map((joke)=> {
                        return (
                                <SingleJoke 
                                    key={joke.joke.id} 
                                    joke={joke.joke}
                                    user={joke.user}
                                />
                            )
                    })
                }
            </Container>
        </>    
        // <div>
        //     <h1 className='text-center'>Jokes Page</h1>
        //     <div className='comp-parent-container'>
        //         <div className='comp-container-div'>
        //             {
        //                 state.jokes.map(joke => {
        //                     return (
        //                         <SingleJoke id={joke.id} question={joke.question} answer={joke.answer} />
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        // </div>
    );
}

export default Jokes;