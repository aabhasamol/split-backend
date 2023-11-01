const express = require('express')
const router = express.Router()
const GroupController = require('../../controllers/groupController');

router.put('/create-group', groupController.createUser);
router.get('/', GroupController.getAllGroups);

module.exports = router;