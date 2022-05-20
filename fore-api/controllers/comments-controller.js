const commentsRepository = require('./../repositories/comments-repository');

const getAllComments = async (req, res) => {
    const results = await commentsRepository.getAllComments();
    res.send(results);
}

const getAllCommentsOfFora = async (req, res) => {
    const results = await commentsRepository.getAllCommentsOfFora(req.params.id);
    res.send(results);
}

const insertComment = async (req, res) => {
    const id = await commentsRepository.insertComment(req.body);
    res.send({id});
}

const deleteComment = async (req, res) => {
    const results = await commentsRepository.deleteComment(req.params.id);
    res.send(results);
}

module.exports = {
    getAllComments,
    getAllCommentsOfFora,
    deleteComment,
    insertComment
}