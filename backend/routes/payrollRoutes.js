const express = require("express")
const router = express.Router()
const {verifyToken, isAdmin } = require("../middleware/authMiddleware")
const {
    generatePayroll,
    getMyPayroll,
    getAllPayrolls,
} = require("../controllers/payrollController")

router.post("/generate", verifyToken, isAdmin, generatePayroll)
router.get("/my-payroll", verifyToken, getMyPayroll)
router.get("/", verifyToken, isAdmin, getAllPayrolls)

module.exports = router