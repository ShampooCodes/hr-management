const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
  res.json({message: "Apply leave"})
})

router.get("/", (req, res) => {
  res.json({message: "Get leaves"})
})

router.patch("/:id", (req, res) => {
  res.json({message: "Update leave status"})
})

module.exports = router