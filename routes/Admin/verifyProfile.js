const express = require("express");

const {verifyProfile,
    markVerified} = require("../../controllers/Admin/verifyProfile");

const router = express.Router();

const toVerify = router.get('/verifyProfile',verifyProfile);
const Verify = router.post('/verifyProfile/markVerified',markVerified);

module.exports = {
    verifyProfile:toVerify,
    markVerified:Verify
}
