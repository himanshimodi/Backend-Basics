//instance of express
const express = require("express");

//instance of router
const router = express.Router();

//import controller
const{imageUpload, videoUpload, imageSizeReducer, localFileUpload} = require("../controllers/fileUpload");

//define api routes i.e; map the path/route to the controller
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

//export
module.exports = router;