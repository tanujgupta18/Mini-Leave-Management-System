const express = require("express");
const {
  applyLeave,
  approveLeave,
  rejectLeave,
} = require("../controllers/leaveController");
const router = express.Router();

router.post("/apply", applyLeave);
router.patch("/:id/approve", approveLeave);
router.patch("/:id/reject", rejectLeave);

module.exports = router;
