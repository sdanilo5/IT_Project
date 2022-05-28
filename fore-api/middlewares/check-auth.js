const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try{
        // Bearer kfhho9yr0q2ujoawidjasoudasdjasna0283u24081uy
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err
        });
    }
}

module.exports = {
    checkAuth,
}