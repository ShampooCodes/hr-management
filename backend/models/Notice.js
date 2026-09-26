const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Notice", noticeSchema)