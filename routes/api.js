const express = require('express');

const router = express.Router();
const users = require('./api/userRoute');
const notifications = require('./api/notificationRoute');
const prompt = require('./api/expenseRoute');
const groups = require('./api/groupRoute');
const admin = require('./api/adminRoute');

router.use('/admins', admins);
router.use('/users', users);
router.use('/notifications', notifications);
router.use('/prompts', prompt);
router.use('/groups', groups);

module.exports = router;