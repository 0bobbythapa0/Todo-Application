const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todo");

const todoSchema = mongoose.Schema({
    task: String,
    completed: Boolean
})

const todo = mongoose.model('todo',todoSchema);

module.exports = {
    todo
}