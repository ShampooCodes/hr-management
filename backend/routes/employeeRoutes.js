const express = require("express")
const router = express.Router()
const upload = require("../middleware/uploadMiddleware")
const { verifyToken, isAdmin } = require("../middleware/authMiddleware")
const {
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  uploadProfilePicture,
} = require("../controllers/employeeController")

router.get("/", verifyToken, isAdmin, getAllEmployees)
router.get("/:id", verifyToken, getSingleEmployee)
router.put("/:id", verifyToken, isAdmin, updateEmployee)
router.delete("/:id", verifyToken, isAdmin, deleteEmployee)
router.post("/upload-picture", verifyToken, upload.single("profilePicture"), uploadProfilePicture)

module.exports = router