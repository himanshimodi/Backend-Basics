const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
//want to access jwt_secret from .env file
require("dotenv").config();

//signup route handler
exports.signup = async(req,res) => {
    try{
        //fetch data 
        const{name,email,password,role} = req.body;
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            });
        }

        //secure password
        let hashPassword;
        //hash function mai dalne ka (kya hash krna hai, number of rounds)
        // 10 rounds is optimal number of rounds
        try{
            hashPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }

        //create entry for user
        const user = await User.create({
            name,email,password:hashPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully and entered in db",
        });
    }
    catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error: User cannot be registered. Pls try again later",
        });
    }
}

//creating login page
exports.login = async(req,res) =>{
    try{
        //fetching data
        const{email,password} = req.body;

        //validation on email and password
        //check if it is filled or not
        if(!email || !password){

            return res.status(400).json({
                success:false,
                message:"Please fill both details carefully",
            });
        }

        //check if user is already signed up or not
        let user = await User.findOne({email});

        //if not already signed up
        if(!user){

            return res.status(401).json({
                success:false,
                message:"User is not registered meaning you have not signed up"
            });
        }


        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        //verify password and generate a jwt token
        if(await bcrypt.compare(password,user.password)){

            //passwords match toh login krwa do
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn:"2h",
                }
            );

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            
            const options = {
                expiresIn:new Date(Date.now() + 3 *24 *60 *60 *1000), // x 1000 to convert into millisec
                httpOnly:true,
            }
            res.cookie("babbarCookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });

        }
        else{
            //passwords do not match
            return res.status(403).json({
                success:false,
                message:"Password incorrect",
            });
        }
    }
    catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure",
        });
    }
}