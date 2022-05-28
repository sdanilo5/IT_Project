const loginRepository = require('./../repositories/login-repository');
const usersRepository = require('./../repositories/users-repository');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const user = await usersRepository.getUserByEmailAndPassword({
        email: req.body.email,
        password: req.body.password
    });

    if(typeof user !== 'undefined'){

        let token = jwt.sign({
            id: user.id,
            role: user.roleName
        }, process.env.JWT_KEY);

        res.send({token});
    }
    else{
        res.status(401).json({
            message: "Invalid credentials!"
        });
    }
}

module.exports = {
    login,
}