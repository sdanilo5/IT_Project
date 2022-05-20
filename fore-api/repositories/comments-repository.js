const dbConnection = require('./../common/db-config');

const getAllComments = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM comment`);
    return results;
}

const getAllCommentsOfFora = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT c.id, c.userId, c.foraId, c.text, c.dateCreated, u.name
        FROM comment c, user u
        WHERE foraId = ? AND c.userId = u.id
        ORDER BY c.dateCreated`,
        {
            replacements: [id]
        }
    );
    return results;
}

const insertComment = async (comment) => {
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO comment (userId, foraId, text, dateCreated) VALUES (?,?,?, now())`,
        {
            replacements: [comment.userId, comment.foraId, comment.text]
        }
    );
    return results;
}

const deleteComment = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `DELETE FROM comment WHERE id = ?`,
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