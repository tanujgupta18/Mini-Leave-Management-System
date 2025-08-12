const express = require("express");
const {
  addEmployee,
  getLeaveBalance,
} = require("../controllers/employeeController");
const router = express.Router();

router.post("/", addEmployee);
router.get("/:id/leave-balance", getLeaveBalance);

module.exports = router;
