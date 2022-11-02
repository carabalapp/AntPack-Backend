const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.index);
router.post('/store', UserController.store);
router.post('/delete', UserController.remove);
router.post('/update', UserController.update);


module.exports = router;