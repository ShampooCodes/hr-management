const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/authMiddleware")
const {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController")

router.get("/", verifyToken, isAdmin, getAllEmployees)
router.get("/:id", verifyToken, getSingleEmployee)
router.put("/:id", verifyToken, isAdmin, updateEmployee)
router.delete("/:id", verifyToken, isAdmin, deleteEmployee)

module.exports = router