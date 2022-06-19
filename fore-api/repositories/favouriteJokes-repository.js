const dbConnection = require('./../common/db-config');

const getAllFavouriteJokesByUserId = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT f.id, f.question, f.answer, f.dateCreated, f.dateUpdated, f.userId, u.name, u.pictureName, u.isDeleted
         FROM favourite_jokes fj, fora f, user u
         WHERE fj.userId = ? AND f.id = fj.foraId AND f.isDeleted = 0 AND f.userId = u.id AND u.isDeleted = 0`,
         {
            replacements: [id]
         }
    );
    return results;
}

const insertFavouriteJoke = async (favJoke) => {
    const jokes = await getAllFavouriteJokesByUserId(favJoke.userId);
    console.log(favJoke);
    console.log(jokes);
    for(let i = 0; i < jokes.length; i++){
        if(jokes[i].id === favJoke.foraId){
            return 0;
        }
    }
    console.log('ble');
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO favourite_jokes(userId, foraId) VALUES (?, ?)`,
         {
            replacements: [favJoke.userId, favJoke.foraId]
         }
    );
    return results;
}

const deleteFavouriteJoke = async (userId, foraId) => {
    const [results, metadata] = await dbConnection.query(
        `DELETE FROM favourite_jokes WHERE userId = ? AND foraId = ?`,
         {
            replacements: [userId, foraId]
         }
    );
    return results;
}

module.exports = {
    getAllFavouriteJokesByUserId,
    insertFavouriteJoke,
    deleteFavouriteJoke,
}