const Notice = require("../models/Notice")

const createNotice = async (req, res) => {
    try {
        const {title, message} = req.body

        const newNotice = new Notice({
            title,
            message,
            postedBy: req.user.id,
        })

        await newNotice.save()

        res.status(201).json({ message: "Notice posted successfully", newNotice})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong ont the server"})
    }
}

const getAllNotices= async (req, res) => {
    try {
        const notices = await Notice.find()
            .populate("postedBy", "fullName role")
            .sort({ postedOn: -1})
        res.status(200).json(notices)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server "})
    }
}

const deleteNotice = async (req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(req.params.id)

        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found"})

        }

        res.status(200).json({ message: "Notice deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong on the server"})
    }
}

module.exports = {
    createNotice,
    getAllNotices,
    deleteNotice,
}