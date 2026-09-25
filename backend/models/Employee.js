const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    joiningDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Employee", employeeSchema); 