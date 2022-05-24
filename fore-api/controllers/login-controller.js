const loginRepository = require('./../repositories/login-repository');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const user =  usersRepository.getUserByEmail(req.body.email);
    if(user === null){
        res.status(401).json({
            message: 'Invalid credentials!'
        });
    }
    else{
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_KEY, (err, token) => {
                        res.status(200).json({
                            message: 'Authentication successful!',
                            token: token
                        });
                    });
            }
            else{
                res.status(401).json({
                    message: 'Invalid credentials!'
                });
            }
        });
    }
}

module.exports = {
    login,
}