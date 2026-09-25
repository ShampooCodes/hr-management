const express = require("express")
const router = express.Router()

router.post("/checkin", (req, res) => {
  res.json({message: "Check-in"})
})

router.get("/", (req, res) => {
  res.json({message: "Get attendance"})
})

module.exports = router