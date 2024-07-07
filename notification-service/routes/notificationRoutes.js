const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
} = require("../controllers/notificationController");

router.post("/", authenticate, createNotification);
router.get("/", authenticate, getNotifications);
router.get("/:id", authenticate, getNotification);
router.put("/:id", authenticate, updateNotification);

module.exports = router;
