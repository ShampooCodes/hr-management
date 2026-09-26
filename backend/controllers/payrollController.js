const Payroll = require("../models/Payroll")
const Leave = require("../models/Leave")

const generatePayroll = async (req, res) => {
    try{
        const {employeeId, month, year,  basicSalary} = req.body

        const existingPayroll = await Payroll.findOne({ employee: employeeId, month, year })

        if (existingPayroll ) {
            return res.status(400).json({ message: "Payroll already generated for this month"})

        } 

        const approvedLeaves = await Leave.find({
            employee: employeeId,
            status: "approved",
        })

        const leavesTaken = approvedLeaves.length

        const perDaySalary = basicSalary / 30
        const deduction = perDaySalary * leavesTaken
        const netSalary = basicSalary - deduction

        const newPayroll = new Payroll({
            employee: employeeId,
            month,
            year,
            basicSalary,
            leavesTaken,
            deduction,
            netSalary,
        })

        await newPayroll.save()
        res.status(201).json({ message: "Payroll generated successfully", newPayroll})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const getMyPayroll = async (req, res) => {
    try {
        const records = await Payroll.find({ employee: req.user.id}).sort({ generatedOn: -1})
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong on the server"})
    }
}

const getAllPayrolls = async (req, res) => {
    try {
        const records = await Payroll.find()
            .populate("employee", "fullName email department ")
            .sort({ generatedOn: -1})

        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports = {
    generatePayroll,
    getMyPayroll,
    getAllPayrolls,
}