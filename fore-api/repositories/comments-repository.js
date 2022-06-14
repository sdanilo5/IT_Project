const dbConnection = require('./../common/db-config');

const getAllComments = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM comment WHERE isDeleted = 0`);
    return results;
}

const getAllCommentsOfFora = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT c.id, c.userId, c.foraId, c.text, c.dateCreated, u.name
        FROM comment c, user u
        WHERE foraId = ? AND c.userId = u.id AND c.isDeleted = 0
        ORDER BY c.dateCreated`,
        {
            replacements: [id]
        }
    );
    return results;
}

const insertComment = async (comment) => {
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO comment (userId, foraId, text, dateCreated, isDeleted) VALUES (?,?,?, now(), 0)`,
        {
            replacements: [comment.userId, comment.foraId, comment.text]
        }
    );
    return results;
}

const deleteComment = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `UPDATE comment SET isDeleted = 1 WHERE id = ?`,
        // `DELETE FROM comment WHERE id = ?`,
        {
            replacements: [id]
        }
    );
    return results;
}

module.exports = {
    getAllComments,
    getAllCommentsOfFora,
    deleteComment,
    insertComment
}