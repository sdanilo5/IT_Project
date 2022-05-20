const dbConnection = require('./../common/db-config');

const getAllUsers = async () => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM user`);
    return results;
}


const getUserById = async (id) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM user WHERE id = ?`, 
                                                        {
                                                            replacements: [id]
                                                        });
    return results[0];
}

const insertUser = async (user) => {
    const [results, metadata] = await dbConnection.query(`INSERT INTO 
                                                          user (name, dateCreated, dateUpdated, admin)
                                                          VALUES (?, now(), now(), ?)`,
                                                          {
                                                              replacements: [user.name, user.admin]
                                                          });
    return results;
}

const updateUser = async (user, id) => {
    const [results, metadata] = await dbConnection.query(`UPDATE user 
                                                          SET name = ?,
                                                          dateUpdated = now()
                                                          WHERE id = ?`,
                                                          {
                                                              replacements: [user.name, id]
                                                          });
    return results;
}

const deleteUser = async (id) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM user WHERE id = ?`, 
                                                            {
                                                                replacements: [id]
                                                            });
    return results; 
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
}