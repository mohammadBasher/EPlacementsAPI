
// This file contains functions for
// sendNotification - to send a notice to all the devices

require("dotenv").config();
const fetch = require('node-fetch');

const sendNotification = (title, body, topic) => {
    const notification_headers = {
        'Authorization': 'key=' + process.env.FCM_SERVER_KEY,
        'Content-Type': 'application/json'
    };

    const notification_body = {
        'notification': {
            'title': title,
            'body': body,
            'sound': "default"
        },
        'to': '/topics/' + topic
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: notification_headers,
        body: JSON.stringify(notification_body)
    }).then((response) => {
        console.log("Notification sent successfully");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    sendNotification
}
