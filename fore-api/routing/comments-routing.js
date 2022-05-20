const express = require('express');
const router = express.Router();

const commentController = require('./../controllers/comments-controller');

router.route("/")
    .get(commentController.getAllComments)
    .post(commentController.insertComment)
;

router.route("/:id")
    .get(commentController.getAllCommentsOfFora)
    .delete(commentController.deleteComment)
;
    

module.exports = router;