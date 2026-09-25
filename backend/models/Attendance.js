const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "present",
        enum: ["present", "absent", "leave"],
    },
    checkInTime: {
        type: String,
    },
    checkOutTime: {
        type: String,
    },
})

module.exports = mongoose.model("Attendance", attendanceSchema)