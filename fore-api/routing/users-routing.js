const express = require('express');
const router = express.Router();

const usersController = require('./../controllers/users-controller');

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.insertUser)

router.route("/:id")
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;