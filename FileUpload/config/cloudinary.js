//import cloudinary
const cloudinary = require("cloudinary").v2;
//load config from .env file
require("dotenv").config();

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })

    }catch(error){
        console.error(error);
        console.log(error);
        console.log("Cloudinary connection NOT successful");
    }
}