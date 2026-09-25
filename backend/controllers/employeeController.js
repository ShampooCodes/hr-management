const Employee = require("../models/Employee")

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select("-password")
        res.status(200).json(employees)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const getSingleEmployee = async (req,  res) => {
    try { 
        const employee = await Employee.findById(req.params.id).select("-password")

        if(!employee) {
            return res.status(404).json({ message: "Employee not found "})
        }

        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({ message: "You can only view your own profile"})
        }
        res.status(200).json(employee)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }

}

const updateEmployee = async (req, res) => {
    try {
        const { fullName, department, designation, role} = req.body

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { fullName,  department, designation, role},
            { new: true}
        ).select("-password")

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found"})
        }

        res.status(200).json({ message: "Employee updated successfully", updatedEmployee })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

const deleteEmployee = async(req, res) => {
    try{ 
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found"})
        }

        res.status(200).json({ message: "Employee deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports = {
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
}