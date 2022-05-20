const usersRepository = require('./../repositories/users-repository');

const getAllUsers = async (req, res) => {
    const results = await usersRepository.getAllUsers();
    res.send(results);
}

const getUserById = async (req, res) => {
    const results = await usersRepository.getUserById(req.params.id);
    res.send(results);
}

const insertUser = async (req, res) => {
    const id = await usersRepository.insertUser(req.body);
    res.send({id});
}

const updateUser = async (req, res) => {
    const results = await usersRepository.updateUser(req.body, req.params.id);
    res.send(results);
}

const deleteUser = async (req, res) => {
    const results = await usersRepository.deleteUser(req.params.id);
    res.send(results);
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
}