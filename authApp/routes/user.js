const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const {authenticity, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signup);

//testing protected routes for single middleware
router.get("/test",authenticity, (req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for TESTS",
    });
});

//Protected routes: meaning what role they have they will be respectively assigned to that page that is student will go to student page and admin will go to admin page

//Protected route for student
router.get("/student",authenticity, isStudent, (req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for Students",
    });
});

//Protected routes for Admin
router.get("/admin",authenticity, isAdmin, (req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for Admin",
    });
});


module.exports = router;