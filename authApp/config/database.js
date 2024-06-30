//instantiate mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Database connection is successful"))
    .catch( (error)=>{
        console.log("Issue in db connection");
        console.error(error.message);
        process.exit(1);
    });
}

//export
module.exports = dbConnect();
