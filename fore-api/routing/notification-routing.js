const express = require('express');
const router = express.Router();
const notificationController = require('./../controllers/notification-controller');

router.route("/")
    .get(notificationController.getAllNotifications)
    .post(notificationController.insertNotification)

router.route('/:id')
    .get(notificationController.getAllNotificationsByReceiverId)

module.exports = router;