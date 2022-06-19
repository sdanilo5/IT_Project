const jokesRepository = require('./../repositories/jokes-repository');

const getAllJokes = async (req, res) => {
    const results = await jokesRepository.getAllJokes();
    res.send(results);
}

const getJokeById = async (req, res) => {
    const results = await jokesRepository.getJokeById(req.params.id);
    res.send(results);
}

const insertJoke = async (req, res) => {
    const id = await jokesRepository.insertJoke(req.body);
    res.send({id});
}

const updateJoke = async (req, res) => {
    const results = await jokesRepository.updateJoke(req.body, req.params.id);
    res.send(results);
}

const deleteJoke = async (req, res) => {
    const results = await jokesRepository.deleteJoke(req.params.id);
    res.send(results);
}

module.exports = {
    getAllJokes,
    getJokeById,
    insertJoke,
    updateJoke,
    deleteJoke
}