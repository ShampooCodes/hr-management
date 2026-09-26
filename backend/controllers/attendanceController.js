const Attendance = require("../models/Attendance")

const markAttendance = async (req, res) => {
    try {
        const employeeId = req.user.id
        const startOfDay = new Date()
        startOfDay.setHours(0,0,0,0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        const existingRecord = await Attendance.findOne({
            employee: employeeId,
            date: {$gte: startOfDay, $lte: endOfDay},
        })

        if (existingRecord) {
            return res.status(400).json({ message: "Attendance already marked for today "})
        }

        const newAttendance = new Attendance({
            employee: employeeId,
            status: "present",
            date: new Date(),
            checkInTime: new Date().toLocaleTimeString(),
        })

        await newAttendance.save()

        res.status(201).json({ message: "Attendance marked successfully", newAttendance})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const markCheckOut = async (req, res) => {
    try {
        const employeeId = req.user.id
        const startOfDay = new Date()
        startOfDay.setHours(0,0,0,0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        const todayRecord = await Attendance.findOne({
            employee: employeeId,
            date: {$gte: startOfDay, $lte: endOfDay},
        })

        if (!todayRecord) {
            return res.status(404).json({ message: "You haven't checked in today"})
        }

        todayRecord.checkOutTime = new Date().toLocaleTimeString()
        await todayRecord.save()

        res.status(200).json({ message: "Check-out marked successfully", todayRecord })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server "})
    }
}

const getMyAttendance = async (req, res) => {
    try {
        const records = await Attendance.find({ employee: req.user.id}).sort({ date: -1 })
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const getAllAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
        .populate("employee", "fullName email department")
        .sort({ date: -1 })

        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}


module.exports = {
    markAttendance,
    markCheckOut,
    getMyAttendance,
    getAllAttendance,
}