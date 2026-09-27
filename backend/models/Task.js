const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "done"],
        default: "pending"
    },
    dueDate: {
        type: Date,
    },
    createdOn:{
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("Task", taskSchema)