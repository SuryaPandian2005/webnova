const express = require('express');
const router = express.Router();
const { seedTemplates, getTemplates, createTemplate } = require('../controllers/templateController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');

router.get('/', getTemplates);
router.post('/seed', protect, adminOnly, seedTemplates);
router.post('/', protect, adminOnly, createTemplate);

module.exports = router;