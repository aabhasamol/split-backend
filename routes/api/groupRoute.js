const express = require('express')
const router = express.Router()
const GroupController = require('../../controllers/groupController');

router.put('/create-group', GroupController.createGroup);
router.get('/', GroupController.getAllGroups);

module.exports = router;