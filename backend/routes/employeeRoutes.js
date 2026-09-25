const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({message: "Get all employees"})
})

router.post("/", (req, res) => {
  res.json({message: "Add employee"})
})

router.delete("/:id", (req, res) => {
  res.json({message: "Delete employee"})
})

module.exports = router