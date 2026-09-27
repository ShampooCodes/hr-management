const Leave = require("../models/Leave")

const applyLeave = async (req, res) => {
    try {
        const { fromDate, toDate, reason } = req.body

        const newLeave = new Leave({
            employee: req.user.id,
            fromDate,
            toDate,
            reason,
        })

        await newLeave.save()
        res.status(201).json({ message: "Leave applied successfully", newLeave })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server "})
    }
}

const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.user.id }).sort({ appliedOn: -1 })
        res.status(200).json(leaves)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate("employee", "fullName email department")
            .sort({ appliedOn: -1 })

        res.status(200).json(leaves)
    } catch (error){
        console.log(error)
        res.status(500).json({ message: "Somthing went wrong on the server"})
    }
}

const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body

        if (!["approved", "rejected"].includes(status)){
            return res.status(400).json({ message: "Status must be approved or rejected"})
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true}
        )

        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave request not found"})
        }

        res.status(200).json({ message: `Leave ${status} successfully`, updatedLeave})   // ✅
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports ={
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus
}