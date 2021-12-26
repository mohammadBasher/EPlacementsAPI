// This file contains functions for
// addNotice - to add a notice

const noticeModel = require("../../models/Notice");

const { sendNotification } = require("../../controllers/Admin/Notification");

const addNotice = (req, res, next) => {
    // fetching title and content of the notice to be added from the request
    const title = req.body.title;
    const content = req.body.content;
    const timestamp = new Date().getTime();
    const response = {};
    // creating and saving that notice in the Notice collection
    const newNotice = new noticeModel({ title, content, timestamp });
    newNotice.save((err, notice) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "An error occurred";
            return res.send(response);
        }
        // Now return saved notice with the response
        else {
            response.success = true;
            response.message = "Notice saved successfully";
            response.notice = notice;
            sendNotification(notice.title, notice.content, "allDevices");
            return res.send(response);
        }
    })
}

module.exports = {
    addNotice
}