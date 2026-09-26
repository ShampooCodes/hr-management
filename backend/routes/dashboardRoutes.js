const express = require("express")
const router = express.Router()
const {verifyToken, isAdmin} = require("../middleware/authMiddleware")
const { getAdminStats, getEmployeeStats } =require("../controllers/dashboardController")

router.get("/admin-stats", verifyToken, isAdmin, getAdminStats)
router.get("/employee-stats", verifyToken, getEmployeeStats)

module.exports = router