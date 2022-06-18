const dbConnection = require('./../common/db-config');

const getAllNotifications = async () => {
    const [results, metadata] = await dbConnection.query(
        `SELECT *
         FROM notification n`
    );
    return results;
}

const getAllNotificationsByReceiverId = async (id) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT n.id, n.senderId, n.receiverId, n.description, n.foraId, n.dateCreated, 
                u.name, u.pictureName
         FROM notification n, user u
         WHERE n.receiverId = ? AND u.id = n.senderId AND u.isDeleted = 0`,
         {
            replacements: [id]
         }
    );
    
    return results;
}

const insertNotification = async (notification) => {
    console.log('ble');
    const [results, metadata] = await dbConnection.query(
        `INSERT INTO 
        notification (senderId, receiverId, description, foraId, dateCreated)
        VALUES (?,?,?,?, now())`,
        {
            replacements: [notification.senderId, notification.receiverId, notification.description, notification.foraId]
        }
    );
    console.log(results);
    return results;
}

module.exports = {
    getAllNotifications,
    insertNotification,
    getAllNotificationsByReceiverId,
}