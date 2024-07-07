const Notification = require("../models/notification");
const { getChannelPromise } = require("../services/rabbitMQ");

exports.createNotification = async (req, res, next) => {
  try {
    const notification = new Notification({ ...req.body, userId: req.userId });
    await notification.save();
    const channel = await getChannelPromise();
    channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)));
    res.status(201).json({ success: true, notification });
  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.userId });
    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ id: req.params.id, userId: req.userId });
    if (!notification) {
      return res.status(404).json();
    }
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { id: req.params.id, userId: req.userId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).send();
    }
    res.status(200).send(notification);
  } catch (err) {
    next(err);
  }
};
