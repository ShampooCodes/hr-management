const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
const app = express()

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/employees", require("./routes/employeeRoutes"))
app.use("/api/attendance", require("./routes/attendanceRoutes"))
app.use("/api/leaves", require("./routes/leaveRoutes"))

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error(error));