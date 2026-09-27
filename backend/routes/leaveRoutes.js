const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/authMiddleware")
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController")

router.post("/apply", verifyToken, applyLeave)
router.get("/my-leaves", verifyToken, getMyLeaves)
router.get("/", verifyToken, isAdmin, getAllLeaves)
router.put("/:id/status", verifyToken, isAdmin, updateLeaveStatus)

module.exports = router