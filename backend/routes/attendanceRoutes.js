const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/authMiddleware")
const {
  markAttendance,
  markCheckOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController")

router.post("/check-in", verifyToken,  markAttendance)
router.put("/check-out", verifyToken, markCheckOut)
router.get("/my-record", verifyToken, getMyAttendance)
router.get("/", verifyToken, isAdmin, getAllAttendance)


module.exports = router