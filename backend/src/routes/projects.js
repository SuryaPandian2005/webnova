const express = require('express');
const router = express.Router();
const { createProject, getUserProjects, getProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/', createProject);
router.get('/', getUserProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;