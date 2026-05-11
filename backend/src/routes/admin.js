const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, getAllProjects, updateProjectStatus, toggleUserStatus, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');

router.use(protect, adminOnly);
router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/projects', getAllProjects);
router.patch('/projects/:id/status', updateProjectStatus);
router.patch('/users/:id/toggle', toggleUserStatus);
router.delete('/users/:id', deleteUser);

module.exports = router;