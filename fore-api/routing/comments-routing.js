const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');

const commentController = require('./../controllers/comments-controller');

// const jwtMiddleware = require('express-jwt');

// let auth = jwtMiddleware.expressjwt({
//     secret: process.env.JWT_KEY,
//     userProperty: 'body.userData',
//     algorithms: ['HS256']
// });

router.route("/")
    .get(commentController.getAllComments)
    .post(checkAuthMiddleware.checkAuth, commentController.insertComment)
;

router.route("/:id")
    .get(commentController.getAllCommentsOfFora)
    .delete(checkAuthMiddleware.checkAuth, commentController.deleteComment)
;

module.exports = router;