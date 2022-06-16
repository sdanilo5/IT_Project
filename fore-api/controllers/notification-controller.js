const dbConnection = require('./../common/db-config');
const notificationRepository = require('./../repositories/notification-repository');

const getAllNotifications = async (req, res) => {
    const results = await notificationRepository.getAllNotifications();
    res.send(results);
}

const getAllNotificationsByReceiverId = async (req, res) => {
    const results = await notificationRepository.getAllNotificationsByReceiverId(req.params.id);
    res.send(results);
}

const insertNotification = async (req, res) => {
    const id = await notificationRepository.insertNotification(req.body);
    res.status(201).json({
        message: 'Notification created successfully',
        notificationId: id
    });
}

module.exports = {
    insertNotification,
    getAllNotifications,
    getAllNotificationsByReceiverId,
}