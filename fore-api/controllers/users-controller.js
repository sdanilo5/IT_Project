const usersRepository = require('./../repositories/users-repository');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const getAllUsers = async (req, res) => {
    const results = await usersRepository.getAllUsers();
    res.send(results);
}

const getUserById = async (req, res) => {
    const results = await usersRepository.getUserById(req.params.id);
    res.send(results);
}

const insertUser = async (req, res) => {
    const takenEmails = await usersRepository.getAllUserEmails();
    takenEmails.forEach(el => {
        if(el.email === req.body.email){
            res.status(409).json({
                message: 'Email already exists'
            });
            return;
        }
    });
    // TODO: verify password 
    
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.body.password, salt, async (err, hash) => {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            const id = await usersRepository.insertUser(user);

            if(typeof id === 'undefined'){
                res.status(500).json({
                    message: 'Can\'t create user!'
                });
            }
            else
                res.status(201).json({
                    message: 'User created successfully',
                    userId: id
                });
        });
    });
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