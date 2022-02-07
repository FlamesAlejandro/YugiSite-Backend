const { Router } = require('express');

const { PostLogin, } = require('../controllers/authController');

const router = Router();

router.post('/', PostLogin );

module.exports = router;