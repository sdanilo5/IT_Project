const express = require('express');
const router = express.Router();
const checkAuthMiddleware = require('./../middlewares/check-auth');

const commentController = require('./../controllers/comments-controller');

router.route("/")
    .get(commentController.getAllComments)
    .post(checkAuthMiddleware.checkAuth, commentController.insertComment)
;

router.route("/:id")
    .get(commentController.getAllCommentsOfFora)
    .delete(checkAuthMiddleware.checkAuth, commentController.deleteComment)
;

module.exports = router;