const dbConnection = require('./../common/db-config');

const getAllUserEmails = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT email FROM user`);
    return results;
}

const getAllUsers = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM user`);
    return results;
}

const getUserByEmail = async (email) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT * FROM user WHERE email = ?`, 
        {
            replacements: [email]
        }
    );
    return results[0];
}

const getUserById = async (id) => {
    const [results, metadata1] = await dbConnection.query(
        `SELECT * FROM user WHERE id = ?`, 
        {
            replacements: [id]
        }
    );
    const [userJokes, metadata2] = await dbConnection.query( 
        `SELECT id, question, answer, dateCreated, dateUpdated
        FROM fora 
        WHERE userId = ?`, 
        {
            replacements: [id]
        }
    );

    return [results[0], userJokes];
}

const insertUser = async (user) => {
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO 
        user (name, email, password, dateCreated, dateUpdated)
        VALUES (?,?,?, now(), now())`,
        {
            replacements: [user.name, user.email, user.password]
        }
    );
    return results;
}

const updateUser = async (user, id) => {
    const [results, metadata] = await dbConnection.query(
        `UPDATE user 
        SET name = ?,
        dateUpdated = now()
        WHERE id = ?`,
        {
            replacements: [user.name, id]
        }
    );
    return results;
}

const deleteUser = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `DELETE FROM user WHERE id = ?`, 
        {
            replacements: [id]
        }
    );
    return results; 
}

module.exports = {
    getAllUserEmails,
    getAllUsers,
    getUserById,
    getUserByEmail,
    insertUser,
    updateUser,
    deleteUser
}