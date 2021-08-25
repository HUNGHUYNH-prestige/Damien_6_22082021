const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

// router for all requests for sauce

router.post('/',         auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);
router.get('/',          auth,         sauceCtrl.getAllSauces);
router.get('/:id',       auth,         sauceCtrl.getOneSauce);
router.put('/:id',       auth, multer, sauceCtrl.modifySauce);
router.delete('/:id',    auth,         sauceCtrl.deleteSauce);

module.exports = router;