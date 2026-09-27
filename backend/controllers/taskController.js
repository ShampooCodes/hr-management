const Task = require("../models/Task")

const assignTask = async (req, res) => {
    try{
        const { title, description, assignedTo, dueDate} = req.body

        const newTask = new Task({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
            dueDate,
        })

        await newTask.save()

        res.status(201).json({ message: "Task assigned successfully", newTask })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server "})
    }
}

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).sort({ createdOn: -1})
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
} 

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo", "fullName email department")
            .populate("assignedBy", "fullName")
            .sort({ createdOn: -1})

        res.status(200).json(tasks)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const updateTaskStatus = async (req, res) => {
    try{
        const { status } = req.body

        if(!["pending", "in-progress", "done"].includes(status)) {
            return res.status(400).json({message: "Invalid status value"})
        }

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ message: "Task not found"})
        }

        if(task.assignedTo.toString()!== req.user.id) {
            return res.status(403).json({message : "You can only update your own tasks"})
        }

        task.status = status
        await task.save()

        res.status(200).json({ message: "Task status updated successfully", task})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found"})
        }
        res.status(200).json({ message: "Task deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports = {
    assignTask,
    getMyTasks,
    getAllTasks,
    updateTaskStatus,
    deleteTask,
}