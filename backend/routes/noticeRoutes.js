const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin} = require("../middleware/authMiddleware")
const { createNotice, getAllNotices, deleteNotice }= require("../controllers/noticeController")

router.post("/", verifyToken, isAdmin,  createNotice)
router.get("/", verifyToken, getAllNotices)
router.delete("/:id", verifyToken, isAdmin, deleteNotice )

module.exports = router