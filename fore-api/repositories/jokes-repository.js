const dbConnection = require('./../common/db-config');

const getAllJokes = async () => {
    const [results, metadata] = await dbConnection.query(
        `SELECT f.id, f.question, f.answer, f.dateCreated, f.dateUpdated, f.userId, u.name
         FROM fora f, user u
         WHERE f.userId = u.id`
    );
    return results;
}

const getJokeById = async (id) => {
    const [results, metadata] = await dbConnection.query(`SELECT * FROM fora WHERE id = ?`, 
                                                        {
                                                            replacements: [id]
                                                        });
    return results[0];
}

const insertJoke = async (joke) => {
    const [results, metadata] = await dbConnection.query(`INSERT INTO 
                                                          fora (question, answer, dateCreated, dateUpdated, userId)
                                                          VALUES (?,?, now(), now(), ?)`,
                                                          {
                                                              replacements: [joke.question, joke.answer, joke.userId]
                                                          });
    return results;
}

const updateJoke = async (joke, id) => {
    const [results, metadata] = await dbConnection.query(`UPDATE fora 
                                                          SET question = ?,
                                                          answer = ?,
                                                          dateUpdated = now()
                                                          WHERE id = ?`,
                                                          {
                                                              replacements: [joke.question, joke.answer, id]
                                                          });
    return results;
}

const deleteJoke = async (id) => {
    const [results, metadata] = await dbConnection.query(`DELETE FROM fora WHERE id = ?`, 
                                                            {
                                                                replacements: [id]
                                                            });
    return results; 
}

module.exports = {
    getAllJokes,
    getJokeById,
    insertJoke,
    updateJoke,
    deleteJoke
}