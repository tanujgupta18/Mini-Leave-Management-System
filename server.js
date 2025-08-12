const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/employees", require("./routes/employeeRoutes"));
app.use("/leaves", require("./routes/leaveRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
