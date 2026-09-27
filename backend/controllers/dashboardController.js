const Employee = require("../models/Employee")
const Attendance = require("../models/Attendance")
const Leave = require("../models/Leave")
const Payroll = require("../models/Payroll")

const getAdminStats = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments()

        const pendingLeaves = await Leave.countDocuments({ status: "pending"})

        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        const todayAttendance = await Attendance.countDocuments({
            date: { $gte: startOfDay, $lte: endOfDay},
            status: "present",
        })

        const currentMonth = new Date().toLocaleString("default", {month: "long"})
        const currentYear = new Date().getFullYear()

        const payrollsThisMonth = await Payroll.countDocuments({
            month: currentMonth,
            year: currentYear,
        })

        res.status(200).json({
            totalEmployees,
            pendingLeaves,
            todayAttendance,     
            payrollsThisMonth,
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const getEmployeeStats = async (req, res) => {
    try {
        const employeeId = req.user.id

        const todayAttendance =  await Attendance.countDocuments({
            employee: employeeId,
            status: "present",
        })

        const pendingLeaves = await Leave.countDocuments({
            employee: employeeId,
            status: "pending",
        })

        const approvedLeaves = await Leave.countDocuments({
            employee: employeeId,
            status: "approved"
        })

        const lastPayroll = await Payroll.findOne({ employee: employeeId }).sort({ generatedOn: -1 })

        res.status(200).json({
            todayAttendance,      
            pendingLeaves,
            approvedLeaves,
            lastPayroll,
        })
    
    } catch(error) {
        console.log(error)

        res.status(500).json({ message: "Something went wrong on the server "})
    }
}

module.exports = {
    getAdminStats,
    getEmployeeStats,
}