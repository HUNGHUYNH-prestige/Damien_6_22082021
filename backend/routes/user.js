const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/passwordValidator');
const rateLimit = require('express-rate-limit');

const loginLimit = rateLimit({
    windowMs : 60 * 3 * 1000,
    max : 3
});

//const troisMinutes = 3 * 60 * 1000;
//console.log(troisMinutes + ' millisecondes = 3 minutes');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login' , loginLimit       , userCtrl.login);

module.exports = router;