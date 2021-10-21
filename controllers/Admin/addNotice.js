const noticeModel = require("../../models/Notice");

const addNotice = (req,res,next)=>{
    // fetching title and content of the notice to be added from the request
    const title = req.body.title;
    const content = req.body.content;
    const response = {};
    // creating and saving that notice in the Notice collection
    const newNotice = new noticeModel({title,content});
    newNotice.save((err,notice)=>{
        // if some error occurred return from here
        if(err){
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        // Now return saved notice with the response
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