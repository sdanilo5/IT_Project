import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const JokeDetails = () => {
    const params = useParams();
    const [state, setState] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/jokes/${params.id}`)
            .then(response => {
                setState({
                    joke: response.data
                });
            })
            .catch(err => {
                console.error("Errorrrr: ", err);
            })
    }, [])

    return (
        <Container className='text-center'>
            <h1 className='mb-4'>Joke Details Page</h1>
            <h3>{state?.joke.question}</h3>
            <h3>{state?.joke.answer}</h3>
            <h3>By user: {state?.joke.userId}</h3>
        </Container>
    )
}

export default JokeDetails;