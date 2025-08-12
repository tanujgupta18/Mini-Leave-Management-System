const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },
    type: { type: String, enum: ["PAID", "SICK", "UNPAID"], required: true },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    reason: String,
    decidedBy: String,
    decidedAt: Date,
  },
  { collection: "leaverequests", timestamps: true }
);

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
