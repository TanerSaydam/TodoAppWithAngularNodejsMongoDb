const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name:{
        type: String,
        required: true,        
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date        
    }
});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;