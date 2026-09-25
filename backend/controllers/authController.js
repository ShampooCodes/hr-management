const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const registerEmployee = async (req, res) => {
    try {
        const{ fullName, email, password, role, department, designation } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ message: "This email is already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
        fullName,
        email,
        password: hashedPassword,
        role,
        department,
        designation, 
    });

    await newEmployee.save();

    res.status(201).json({message: "Employee registered successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong on the server"})
    }

}

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundEmployee = await Employee.findOne({ email });
        if (!foundEmployee) {
            return res.status(404).json({ message: "Employee not found"})
        }

        const passwordMatch = await bcrypt.compare(password,  foundEmployee.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect password"})
        }

        const token = jwt.sign(
            { id: foundEmployee._id,  role: foundEmployee.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d"} 

        );
 
        res.status(200).json({
            message: "Login sucessful",
            token,
            role: foundEmployee.role,
            name: foundEmployee.fullName,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports = {registerEmployee, loginEmployee};