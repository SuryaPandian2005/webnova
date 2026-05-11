const User = require('../models/User');
const Project = require('../models/Project');

const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalProjects, pendingProjects, completedProjects, inProgressProjects] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: 'Pending' }),
      Project.countDocuments({ status: 'Completed' }),
      Project.countDocuments({ status: 'In Progress' })
    ]);

    const typeStats = await Project.aggregate([
      { $group: { _id: '$websiteType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email avatar');
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: { totalUsers, totalProjects, pendingProjects, completedProjects, inProgressProjects, typeStats },
      recentProjects,
      recentUsers
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const query = {};
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
    if (role) query.role = role;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.json({ success: true, users, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, status, type } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.websiteType = type;

    let projects = await Project.find(query).sort({ createdAt: -1 }).populate('user', 'name email avatar');

    if (search) {
      projects = projects.filter(p =>
        p.projectName.toLowerCase().includes(search.toLowerCase()) ||
        p.user?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = projects.length;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginated = projects.slice(skip, skip + parseInt(limit));

    res.json({ success: true, projects: paginated, pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
};

const updateProjectStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, estimatedCost, priority } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (estimatedCost !== undefined) updates.estimatedCost = estimatedCost;
    if (priority) updates.priority = priority;

    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('user', 'name email');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

    res.json({ success: true, message: 'Project updated!', project });
  } catch (error) {
    next(error);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Cannot modify admin accounts.' });

    user.isActive = !user.isActive;
    await user.save({ validateBeforeSave: false });

    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}!`, user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Cannot delete admin accounts.' });

    await Project.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'User and all their projects deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats, getAllUsers, getAllProjects, updateProjectStatus, toggleUserStatus, deleteUser };