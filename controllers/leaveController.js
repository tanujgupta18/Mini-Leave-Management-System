const LeaveRequest = require("../models/LeaveRequest");
const Employee = require("../models/Employee");

const MS = 24 * 60 * 60 * 1000;
const isValidDate = (d) => d instanceof Date && !isNaN(d);
const dayCount = (s, e) => Math.floor((e - s) / MS) + 1;

exports.applyLeave = async (req, res) => {
  try {
    const { employeeEmail, type, startDate, endDate, reason } = req.body;

    // Employee not found
    const emp = await Employee.findOne({
      email: (employeeEmail || "").toLowerCase(),
    });
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Invalid dates (including end < start)
    if (!isValidDate(start) || !isValidDate(end))
      return res.status(400).json({ error: "Invalid dates" });
    if (start > end) return res.status(400).json({ error: "Start after end" });

    // Applying before joining date
    if (start < emp.joiningDate)
      return res.status(400).json({ error: "Before joining date" });

    // Overlapping leave requests
    const overlap = await LeaveRequest.findOne({
      employeeId: emp._id,
      status: { $in: ["PENDING", "APPROVED"] },
      startDate: { $lte: end },
      endDate: { $gte: start },
    });
    if (overlap)
      return res.status(400).json({ error: "Overlapping leave request" });

    const days = dayCount(start, end);

    // More days than available balance
    if (type === "PAID" && days > emp.leaveBalance) {
      return res.status(400).json({ error: "Not enough leave balance" });
    }

    const leave = await LeaveRequest.create({
      employeeId: emp._id,
      type,
      startDate: start,
      endDate: end,
      days,
      reason,
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ error: "Leave not found" });

  const emp = await Employee.findById(leave.employeeId);
  if (leave.type === "PAID") {
    emp.leaveBalance -= leave.days;
    await emp.save();
  }

  leave.status = "APPROVED";
  leave.decidedBy = req.body.hr || "HR";
  leave.decidedAt = new Date();
  await leave.save();

  res.json(leave);
};

exports.rejectLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);
  if (!leave) return res.status(404).json({ error: "Leave not found" });

  leave.status = "REJECTED";
  leave.decidedBy = req.body.hr || "HR";
  leave.decidedAt = new Date();
  await leave.save();

  res.json(leave);
};
