const usersRepository = require('./../repositories/users-repository');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const fs = require('fs');

const getAllUsers = async (req, res) => {
    const results = await usersRepository.getAllUsers();
    res.send(results);
}

const getAllBlocedUsers = async (req, res) => {
    const results = await usersRepository.getAllBlockedUsers();
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
                message: 'Email already exists!'
            });
            return;
        }
    });
    // TODO: verify password 
    
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
}

const updateUser = async (req, res) => {
    const results = await usersRepository.updateUser(req.body, req.params.id);
    res.send(results);
}

const deleteUser = async (req, res) => {
    const results = await usersRepository.deleteUser(req.params.id);
    res.send(results);
}

const unblockUser = async (req, res) => {
    const results = await usersRepository.unblockUser(req.body);
    res.send(results);
}

const uploadPicture = (req, res) => {
    let file;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No files were uploaded.');
    }
    
    file = req.files.image;
    // uploadPath = __dirname + '/../../fore-client/src/images/users/' + file.name;
    uploadPath = __dirname + '/../../fore-client/public/images/' + file.name;
    
    file.mv(uploadPath, function(err){
        if(err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
    // if (!fs.existsSync(uploadPath)) {
    //     file.mv(uploadPath, function(err){
    //         if(err)
    //             return res.status(500).send(err);

    //         res.send('File uploaded!');
    //     });
    // }

    // fs.open(uploadPath, 'r', (err, fd) => {
    //     if (err) {
    //       if (err.code === 'ENOENT') {
    //         // file does not exist
    //         file.mv(uploadPath, function(err){
    //             if(err)
    //                 return res.status(500).send(err);

    //             res.send('File uploaded!');
    //         });
    //       }
    //       else{
    //         console.log('file already exists!');
    //       }
    //     }
    // });
}

module.exports = {
    getAllUsers,
    getAllBlocedUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    unblockUser,
    uploadPicture,
}