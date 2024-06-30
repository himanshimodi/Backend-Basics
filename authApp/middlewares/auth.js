//3 middlewares for authenticity, Student and Admin
//instance of jwt
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticity = (req,res,next)=>{
    try{
        //extract jwt token from body or cookies
        //can also be extracted from header
        // const token = req.body.token || req.cookies.token; 
        const token = req.body.token; 


        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token missing",
            });
        }

        //token is found so now verify it
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            //storing the role in object "decode" so that it later helps in verifying what is the role of the user
            req.user = decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is taken",
            });
        }

        next();
    }catch(error){
        console.error(error);
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Kuch toh gadbad hai WHILE VERIFYING THE TOKEN so go and find out",
        });
    }
}

exports.isStudent = (req,res,next)=> {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route only for students",
            });
        }
        next();

        //if req.user.role == Student we have created a success response in routes page only

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route only for Admin",
            });
        }
        next();

        //if req.user.role == Admin we have created a success response in routes page only

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}