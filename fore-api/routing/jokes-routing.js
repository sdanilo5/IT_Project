const express = require("express");
const router = express.Router();

const jokesController = require('./../controllers/jokes-controller');

router.route("/")
    .get(jokesController.getAllJokes)
    .post(jokesController.insertJoke)
;

router.route("/:id")
    .get(jokesController.getJokeById)
    .put(jokesController.updateJoke)
    .delete(jokesController.deleteJoke)
;

module.exports = router;