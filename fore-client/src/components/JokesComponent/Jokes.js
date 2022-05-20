import './../../index.css'
import React from 'react';
import axios from 'axios';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import {
    Container,
    Row,
    Col,
    Card,

} from 'react-bootstrap';

const Jokes = React.memo(() => {
    const [state, setState] = React.useState({jokes: []});

    React.useEffect(() => {
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
    );
})

export default Jokes;