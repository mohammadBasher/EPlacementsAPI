const noticeModel = require("../models/notice");

const getNotice = (req,res,next)=>{
    const response = {};
    noticeModel.find({},(err,notice)=>{
        if(err){
            response.success = false;
            response.message = "Some error occurred";
            console.log(err);
            return res.send(err);
        }
        response.success = true;
        response.message = "Notice fetched successfully";
        response.notices = notice;
        return res.send(response);
    }).sort({ time:'desc'});
}

module.exports = {
    getNotice
}