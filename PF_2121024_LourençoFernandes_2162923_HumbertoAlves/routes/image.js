const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const auth = require("../utils/auth");
const upload = require('../utils/multer')

router.use(auth.authenticateAdmin);

// /images
router.post('/:id', auth.authenticateToken,  upload.single('image'), imageController.uploadImage);
router.get('/:id', auth.authenticateToken, imageController.getImages);
router.delete('/:id', auth.authenticateToken, imageController.deleteImage);


module.exports = router;