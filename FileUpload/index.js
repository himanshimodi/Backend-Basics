//instantiation of server
const express = require("express");
const app = express();

//load config file from .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware needed to parse json request body
app.use(express.json());

//include middleware for file upload on our server
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//difference between express file upload and cloudinary file upload is that express file upload will upload files only on our server while cloudinary file upload will upload files on our server then on media-server(cloudinary) then delete the temporary file which was used from our server to the cloudinary server
//the temporary file was on our server


//connect cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//lets do db connection
const dbConnect=() => require("./config/database");
dbConnect();

//import routes for api
const upload = require("./routes/FileUpload");

//mount API routes
app.use("/api/v1/upload", upload);

//start server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})


//If we want to send a notification or any such thing JUST BEFORE making an entry into the db we should use "pre" middleware
//If we want to send a notification or any such thing JUST AFTER making an entry into the db we should use "post" middleware