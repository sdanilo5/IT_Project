const express = require("express");
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');
const favouriteJokesController = require('./../controllers/favouriteJokes-controller');

router.route('/:id')
    .get(favouriteJokesController.getAllFavouriteJokesByUserId)

router.route('/')    
    .post(checkAuthMiddleware.checkAuth, favouriteJokesController.insertFavouriteJoke)

router.route('/:userId/:jokeId')
    .delete(checkAuthMiddleware.checkAuth, favouriteJokesController.deleteFavouriteJoke)

module.exports = router;