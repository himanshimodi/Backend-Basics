//import cloudinary
const cloudinary = require("cloudinary").v2;
//import model
const File = require("../models/File");
//load config from .env file
require("dotenv").config();

//business logic

//localfileUpload -> handler function
exports.localFileUpload = async (req,res) =>{
    try{
        //fetch file
        //remember the syntax -> v.imp
        const file = req.files.file;
        console.log("FILE AAGYI JI->",file);

        //define the path on which the file will be stored on our server
        // __dirname shows current directory which here means controllers->fileUpload.js

        //ye path server ka path hai
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;   
        console.log("PATH->",path);

        //add path to the move fucntion ot the required path
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:"Local file Uploaded Successfully",
        });

    }catch(error){
        console.error(error);
        console.log(error);
        return res.status(400).json({
                success:false,
               message:"Error while uploading file",
        });
    }
}

//image upload
//for checking if the file type is supported
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    //apne aap detect kro kis type ki file hai
    options.resource_type = "auto"; //imp for video file upload
    return await cloudinary.uploader.upload(file.tempFilePath, options); //according to documentation
}

//image upload -> handler function
exports.imageUpload = async (req,res) =>{
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        //receive file or fetch file
        const file = req.files.imageFile;
        console.log("Image file that is being uploaded ->",file);

        //validation on the image
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //file format supported hai so uploading on cloudinary
        console.log("uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp"); 
        console.log(response);

        //save the entry into db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        });

    }catch(error){
        console.error(error);
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong during image upload"
        });
    }
}

//video upload -> handler function
exports.videoUpload = async (req,res)=>{
    try{

        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        //receive file or fetch video file
        const file = req.files.videoFile;
        console.log("Video file that is being uploaded ->",file);

        //validation on the video
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type->",fileType);

        //TODO: add a upper limit of 5MB for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //file format supported hai so uploading on cloudinary
        console.log("uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp"); 
        console.log(response);

        //save the entry into db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully",
        });

    }catch(error){
        console.error(error);
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong during video upload"
        });
    }
}

//image size reducer upload -> handler function

exports.imageSizeReducer = async (req,res) =>{
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        //receive file or fetch file
        const file = req.files.imageFile;
        console.log("Image file that is being uploaded ->",file);

        //validation on the image
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //TODO:add a upper limit of 5MB for image
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //file format supported hai so uploading on cloudinary
        console.log("uploading to codehelp");
        //TODO: height attribute compress
        const response = await uploadFileToCloudinary(file, "Codehelp", 30); 
        console.log(response);

        //save the entry into db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image size reduced & uploaded successfully",
        });

    }catch(error){
        console.error(error);
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong during size reduction of image"
        });
    }
}