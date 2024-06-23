//import the model
const Todo = require("../models/Todo");

//define router handler
exports.updateTodo = async (req,res)=>{
    try{
        //extract id, title and description
        const{id} = req.params;
        const{title,description} = req.body;

        //fetch items now
        const todo = await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updatedAt:Date.now()},
        )

        res.status(200).json({
            success:true,
            data:todo,
            message:`updated successfully bhaya`,
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