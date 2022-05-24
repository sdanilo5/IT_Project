const loginRepository = require('./../repositories/login-repository');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const user = await loginRepository.login(req.body);
    
    if(typeof user === 'undefined'){
        const msg = {
            type: "error",
            text: "Invalid credentials!"
        }

        res.send(msg);
    }
    else{
        const toSend = {userId: user[0].id, role: user[0].roleName};
        
        const token = jwt.sign(
                toSend, 
                'internettechnologiessecretkey', 
                {expiresIn: '2h'}
            );

        const response = {
            success: true,
            message: 'Authentication successful',
            token: token
        }
        
        res.send(response);
    }
}

module.exports = {
    login,
}