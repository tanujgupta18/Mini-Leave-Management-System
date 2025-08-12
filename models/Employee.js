const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true, required: true },
    department: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    leaveBalance: { type: Number, default: 20 },
  },
  { collection: "employees", timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
