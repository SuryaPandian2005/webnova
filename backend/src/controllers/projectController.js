const Project = require('../models/Project');
const User = require('../models/User');

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { projectCount: 1 } });

    res.status(201).json({ success: true, message: 'Project submitted successfully!', project });
  } catch (error) {
    next(error);
  }
};

const getUserProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { user: req.user._id };
    if (status && status !== 'all') query.status = status;

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('templateUsed', 'name category');

    res.json({
      success: true,
      projects,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit), limit: Number(limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id })
      .populate('templateUsed', 'name category');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    if (['In Progress', 'Completed'].includes(project.status)) {
      return res.status(400).json({ success: false, message: 'Cannot edit a project that is In Progress or Completed.' });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: 'Project updated!', project: updated });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

    await project.deleteOne();
    await User.findByIdAndUpdate(req.user._id, { $inc: { projectCount: -1 } });

    res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getUserProjects, getProject, updateProject, deleteProject };