//import the model
const Todo = require("../models/Todo");

//define route handler
exports.getTodo = async (req,res) =>{
    try{
        //fetch all todo items from database
        const todos = await Todo.find({});

        //response
        res.status(200).json({
            success:true,
            data:todos,
            message:"All todos fetched barabar se",
        });
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            err:err.message,
            message:"Kuch toh error hai server mai",
        });
    }
}


exports.getTodoById = async(req,res) =>{
    try{
        //extract todo item based on id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        //data for given id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"no data found with your given id bro",
            })
        }
        //data for given id found
        if(todo){
            return res.status(200).json({
                success:true,
                data:todo,
                messge:`data with ${id} successfully fetched`,
            })
        }
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            err:err.message,
            message:"Kuch toh error hai server mai",
        });
    }
}
