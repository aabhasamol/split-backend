var express = require('express')
var router = express.Router()
var AdminController = require('../../controllers/adminController');
var Authorization = require('../../auth/authorization');

router.post('/registration', AdminController.createAdmin)
router.post('/login', AdminController.loginAdmin)
router.get('/', Authorization, AdminController.getAdmins)
router.delete('/:id', Authorization, AdminController.removeAdmin)
router.get('/:id', Authorization, AdminController.getAdmin)
router.put('/:id', Authorization, AdminController.updateAdmin)

module.exports = router;