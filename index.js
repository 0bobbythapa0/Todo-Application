const express = require("express");
const { taskSchema, updateSchema, deleteSchema } = require("./type");
const { todo } = require("./db");
const cors = require("cors");

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

app.post("/add",async function(req,res){
    const addTask = req.body;
    const valid = taskSchema.safeParse(addTask);

    if(!valid.success)
    {
        res.status(411).json({
            message: "Invalid data"
        });
        return ;
    }

    //add to database
    const {_id,task,completed} = await todo.create({
        task: addTask.task,
        completed: false
    })

    const id = _id.toString();
    const t = task.toString();

    console.log(id+" "+t);

    res.json({
        id
    })
})

app.get("/todos",async function(req,res){
    const todos=await todo.find({});
    res.json({
        todos
    })
})

app.put("/edit",async function(req,res){
    const updateTask = req.body;
    const valid = updateSchema.safeParse(updateTask);

    if(!valid.success)
    {
        res.status(411).json({
            message: "Invalid data"
        })
        return ;
    }

    const response = await todo.findOneAndUpdate({_id: updateTask._id},{task: updateTask.task});

    console.log(response);

    res.json({
        msg: "task updated successfully"
    })
})

app.delete("/delete",async function(req,res){
    const deleteTask = req.body;
    const valid = deleteSchema.safeParse(deleteTask);

    if(!valid.success)
    {
        res.status(411).json({
            msg: "Invalid data"
        })
        return ;
    }
    const id = deleteTask.id;
    const response = await todo.findOneAndDelete({id});

    res.json({
        msg: "task deleted successfully"
    })
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})