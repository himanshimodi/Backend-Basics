//instantiation of server
//require function imports express here
const express = require("express");
const app = express();

//load config file from .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware needed to parse json request body
app.use(express.json());

//import routes for todo api
const todoRoutes = require("./routes/todos");

//mount the API routes
app.use("/api/v1",todoRoutes);

//start server
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})

//lets do db connection
const dbConnect= () => require("./config/database");
dbConnect();

//default route
app.get("/", (req,res)=>{
    res.send(`<h1>This is homepage baby</h1>`);
})