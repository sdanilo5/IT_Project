const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');
const usersController = require('./../controllers/users-controller');
const { route } = require('./jokes-routing');

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.insertUser)

router.route('/blocked')
    .get(checkAuthMiddleware.checkAuth, usersController.getAllBlocedUsers)
    .put(checkAuthMiddleware.checkAuth, usersController.unblockUser)

router.route('/upload')
    .post(checkAuthMiddleware.checkAuth, usersController.uploadPicture)

router.route("/:id")
    .get(usersController.getUserById)
    .put(checkAuthMiddleware.checkAuth, usersController.updateUser)
    .delete(checkAuthMiddleware.checkAuth, usersController.deleteUser)

module.exports = router;