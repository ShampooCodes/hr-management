const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin} = require("../middleware/authMiddleware")

const {
    assignTask,
    getMyTasks,
    getAllTasks,
    updateTaskStatus,
    deleteTask,
} = require("../controllers/taskController")

router.post("/assign", verifyToken, isAdmin, assignTask)
router.get("/my-tasks", verifyToken, getMyTasks)
router.get("/", verifyToken, isAdmin, getAllTasks)
router.put("/:id/status", verifyToken, updateTaskStatus)
router.delete("/:id", verifyToken, isAdmin, deleteTask)

module.exports =router