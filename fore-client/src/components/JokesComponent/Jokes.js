import './../../index.css'
import React from 'react';
import axios from 'axios';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import {
    Container,
} from 'react-bootstrap';


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

const Jokes = React.memo(() => {
    const [state, setState] = React.useState({jokes: []});
    

    React.useEffect(() => {
        axios.get('http://localhost:3000/jokes')
            .then(response => {
                let jokes = [];
                for(let i = 0; i < response.data.length; i++){
                    const joke = {
                        joke: {
                            id: response.data[i].id,
                            question: response.data[i].question,
                            answer: response.data[i].answer,
                            dateCreated: response.data[i].dateCreated,
                            dateUpdated: response.data[i].dateUpdated
                        },
                        user: {
                            id: response.data[i].userId,
                            name: response.data[i].name,
                            pictureName: response.data[i].pictureName
                        }
                    };
                    jokes.push(joke);
                }
                
                setState({
                    jokes: jokes
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
                                    variant = {variants[incrementInd()]}
                                />
                            )
                    })
                }
            </Container>
        </>    
    );
})

export default Jokes;