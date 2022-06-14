const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');
const usersController = require('./../controllers/users-controller');

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.insertUser)

router.route("/:id")
    .get(usersController.getUserById)
    .put(checkAuthMiddleware.checkAuth, usersController.updateUser)
    .delete(checkAuthMiddleware.checkAuth, usersController.deleteUser)

module.exports = router;