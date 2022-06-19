const favouriteJokesRepository = require('./../repositories/favouriteJokes-repository');

const getAllFavouriteJokesByUserId = async (req, res) => {
    const results = await favouriteJokesRepository.getAllFavouriteJokesByUserId(req.params.id);
    res.send(results);
}

const insertFavouriteJoke = async (req, res) => {
    const results = await favouriteJokesRepository.insertFavouriteJoke(req.body);
    res.send({results});
}

const deleteFavouriteJoke = async (req, res) => {
    const results = await favouriteJokesRepository.deleteFavouriteJoke(req.params.userId, req.params.jokeId);
    res.send(results);
}

module.exports = {
    getAllFavouriteJokesByUserId,
    insertFavouriteJoke,
    deleteFavouriteJoke,
}