import './../../index.css'
import React from 'react';
import axios from 'axios';
import SingleJoke from '../SingleJokeComponent/SingleJoke';
import {
    Container,
} from 'react-bootstrap';
import searchImg from './../../images/icons/search_bar_image.png';

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
        const searchWords = document.getElementById('search-jokes').value;
        if(searchWords)
            searchJokes();
        else {
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
                    document.getElementById('search-jokes').value = '';
                })
                .catch(err => {
                    console.error("Errorrrr: ", err);
                })
        }
    }, [])

    const isInputEmpty = () => {
        setTimeout(()=> {
            const searchWords = document.getElementById('search-jokes').value;
            if(!searchWords){
                searchJokes();
            }
            console.log('bri');
        }, 1000)
    }

    const searchJokes = () => {
        const searchWords = document.getElementById('search-jokes').value;
        axios.get('http://localhost:3000/jokes')
        .then(response => {
            let jokes = [];
            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].question.includes(searchWords)){
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
            }
            setState({
                jokes: jokes
            });
            
        })
        .catch(err => {
            console.error("Errorrrr: ", err);
        })
    }

    const handleKeyPressed = (event) => {
        if(event.key === "Enter"){
          //event.preventDefault();
          searchJokes();
        }
    }

    return(    
        <>
            <h1 className='text-center mb-4  text-light'>Jokes Page</h1>

            <div className='d-flex justify-content-center'>
                <div class="container">
                    <div class="row height d-flex justify-content-center align-items-center">
                        <div class="col-md-6 col-sm-7 col-7">
                            <div class="form">
                                <input id='search-jokes' 
                                    type="text" 
                                    class="form-control form-input" 
                                    placeholder="Search jokes by question..." 
                                    onKeyDown={handleKeyPressed}
                                    onChange={() => isInputEmpty()}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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