const express = require("express");
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');
const jokesController = require('./../controllers/jokes-controller');

router.route("/")
    .get(jokesController.getAllJokes)
    .post(checkAuthMiddleware.checkAuth, jokesController.insertJoke)
;

router.route("/:id")
    .get(jokesController.getJokeById)
    .put(checkAuthMiddleware.checkAuth, jokesController.updateJoke)
    .delete(checkAuthMiddleware.checkAuth, jokesController.deleteJoke)
;

module.exports = router;