const dbConnection = require('./../common/db-config');

const getAllUserEmails = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT email FROM user`);
    return results;
}

const getAllUsers = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM user`);
    return results;
}

const getUserByEmailAndPassword = async (user) => {
    const [r, m] = await dbConnection.query(
        `SELECT u.id
        FROM user u, user_role ur, role r
        WHERE u.email = ? AND u.password = ? AND u.id = ur.userId AND r.id = ur.roleId`,
        {
            replacements: [user.email, user.password]
        }
    );
    console.log(r);
    const [results, metadata] = await dbConnection.query(
        `SELECT u.id, r.name AS roleName 
        FROM user u, user_role ur, role r
        WHERE u.email = ? AND u.password = ? AND u.id = ur.userId AND r.id = ur.roleId`,
        {
            replacements: [user.email, user.password]
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

    if(typeof results !== 'undefined'){
        const [r1, m1] = await dbConnection.query(
            `INSERT INTO 
            user_role (dateCreated, dateUpdated, roleId, userId)
            VALUES (now(), now(), 2, ?)`,
            {
                replacements: [results]
            }
        );
    }

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
    const [results2, metadata2] = await dbConnection.query(
        `DELETE FROM comment WHERE userId = ?`, 
        {
            replacements: [id]
        }
    );
    const [results1, metadata1] = await dbConnection.query(
        `DELETE FROM user_role WHERE userId = ?`, 
        {
            replacements: [id]
        }
    );
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
    getUserByEmailAndPassword,
    insertUser,
    updateUser,
    deleteUser
}