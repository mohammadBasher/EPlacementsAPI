const noticeModel = require("../../models/Notice");

const addNotice = (req,res,next)=>{
    const content = req.body;
    const response = {};
    const newNotice = new noticeModel(content);
    newNotice.save((err,notice)=>{
        if(err){
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        else{
            response.success = true;
            response.message = "Notice saved successfully";
            response.notice = notice;
            return res.send(response);
        }
    })
}

module.exports = {
    addNotice
}