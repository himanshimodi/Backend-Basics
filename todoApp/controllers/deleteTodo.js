//import the model
const Todo = require("../models/Todo");

//define router handler
exports.deleteTodo = async (req,res)=>{
    try{
        //extract id
        const{id} = req.params;

        //fetch items now
        await Todo.findByIdAndDelete(id); 

        res.status(200).json({
            success:true,
            message:`DELETE successfully hogaya bhaya`,
        })
    }
    catch(err){
        console.err(err);
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server Error",

        });
    }
}