const express = require('express');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const app = express();

//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    next();
});

app.use((req, res, next) => {
    // jwt validation
    let token = req.headers['x-access-token'] || req.headers['authorization'] ;
    if(token.startsWith('Bearer ')){
        // makni bearera
        token = token.slice(7, token.length);
    }

    if(token){
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              return res.json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.decoded = decoded;
              next();
            }
          });
    }
    else{
        return res.send(400).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
});

// routing imports
const jokesRouting = require("./routing/jokes-routing");
const usersRouting = require("./routing/users-routing");
const commentsRouting = require("./routing/comments-routing");
const loginRouting = require('./routing/login-routing');

// DB connection import
const dbConnection = require('./common/db-config');

app.use(express.json());

app.use("/jokes", jokesRouting);
app.use("/users", usersRouting);
app.use("/comments", commentsRouting);
app.use('/login', loginRouting);

app.listen(3000, () => {
    console.log("Server is listening at port 3000.");
});

dbConnection.authenticate()
    .then(connection => {
        console.log('Conneciton has beeen established!');
    })
    .catch(err =>{
        console.error('Error while connectiong');
        console.error(err);
    })