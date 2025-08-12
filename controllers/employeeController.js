const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, joiningDate } = req.body;
    if (!name || !email || !department || !joiningDate) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const emp = await Employee.create({
      name,
      email: email.toLowerCase(),
      department,
      joiningDate: new Date(joiningDate),
    });
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLeaveBalance = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  res.json({ employeeId: emp._id, leaveBalance: emp.leaveBalance });
};
