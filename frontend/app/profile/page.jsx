'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Building2, Globe, Phone, MapPin, Clock, Loader,
  Edit3, Save, X, Trash2, Eye, ExternalLink, Lock, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const STATUS_STYLES = {
  'Pending': 'badge-pending',
  'Under Review': 'badge-review',
  'In Progress': 'badge-progress',
  'Completed': 'badge-completed',
  'On Hold': 'badge-hold',
  'Cancelled': 'badge-cancelled',
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [profileForm, setProfileForm] = useState({
    name: '', bio: '', company: '', website: '', phone: '', location: '',
  });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return; }
    if (user) {
      setProfileForm({
        name: user.name || '', bio: user.bio || '', company: user.company || '',
        website: user.website || '', phone: user.phone || '', location: user.location || '',
      });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'projects') fetchProjects();
  }, [activeTab, statusFilter]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get(`/projects?status=${statusFilter}&limit=20`);
      setProjects(res.data.projects);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await api.put('/auth/profile', profileForm);
      updateUser(res.data.user);
      setIsEditing(false);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const changePassword = async () => {
    if (pwdForm.newPassword !== pwdForm.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (pwdForm.newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setIsSaving(true);
    try {
      await api.put('/auth/change-password', { currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Password changed!');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative grid-pattern">
      <div className="blob blob-indigo w-96 h-96 -left-48 top-20 opacity-10" />
      <div className="blob blob-purple w-80 h-80 -right-40 bottom-0 opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card mb-8 p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl ring-2 ring-indigo-500/30" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-gray-900" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
              {user?.bio && <p className="text-gray-300 text-sm mt-1.5">{user.bio}</p>}
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                {user?.company && <span className="flex items-center gap-1.5 text-xs text-gray-400"><Building2 className="w-3 h-3" />{user.company}</span>}
                {user?.location && <span className="flex items-center gap-1.5 text-xs text-gray-400"><MapPin className="w-3 h-3" />{user.location}</span>}
                <span className="badge badge-review text-xs">{user?.role}</span>
                <span className="text-xs text-gray-500">{user?.projectCount || 0} projects</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'projects', label: 'My Projects' },
            { id: 'security', label: 'Security' },
            { id: 'activity', label: 'Activity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                  : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="glass-card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="btn-secondary flex items-center gap-2 text-sm text-gray-300 py-2">
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setIsEditing(false)} className="btn-secondary flex items-center gap-1.5 text-xs text-gray-400 px-3 py-2">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                      <button onClick={saveProfile} disabled={isSaving} className="btn-primary flex items-center gap-1.5 text-xs text-white px-3 py-2 disabled:opacity-70">
                        {isSaving ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', field: 'name', icon: User, placeholder: 'John Smith' },
                    { label: 'Company', field: 'company', icon: Building2, placeholder: 'Acme Corp' },
                    { label: 'Website', field: 'website', icon: Globe, placeholder: 'https://yoursite.com' },
                    { label: 'Phone', field: 'phone', icon: Phone, placeholder: '+1 (555) 000-0000' },
                    { label: 'Location', field: 'location', icon: MapPin, placeholder: 'New York, USA' },
                  ].map(({ label, field, icon: Icon, placeholder }) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          value={profileForm[field]}
                          onChange={e => setProfileForm(p => ({ ...p, [field]: e.target.value }))}
                          disabled={!isEditing}
                          placeholder={placeholder}
                          className={`input-field pl-9 text-sm ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                      className={`input-field resize-none text-sm ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-white flex-1">My Projects</h2>
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'Pending', 'Under Review', 'In Progress', 'Completed', 'Cancelled'].map((s) => (
                      <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-indigo-500 text-white' : 'glass border border-white/10 text-gray-400 hover:text-white'}`}>
                        {s === 'all' ? 'All' : s}
                      </button>
                    ))}
                  </div>
                </div>

                {loadingProjects ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-24 w-full" />)}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="glass-card text-center py-12">
                    <div className="text-4xl mb-3">📭</div>
                    <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
                    <p className="text-gray-400 text-sm mb-4">Create your first website request in the dashboard</p>
                    <button onClick={() => router.push('/dashboard')} className="btn-primary text-sm text-white">Start Building</button>
                  </div>
                ) : (
                  projects.map((project, i) => (
                    <motion.div key={project._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card card-lift">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-1">
                            <h3 className="font-semibold text-white">{project.projectName}</h3>
                            <span className={`badge ${STATUS_STYLES[project.status] || 'badge-pending'}`}>{project.status}</span>
                          </div>
                          <p className="text-xs text-gray-400">{project.websiteType} • {project.techStack?.frontend} • {project.budget}</p>
                          {project.adminNotes && <p className="text-xs text-indigo-300 mt-1">Admin: {project.adminNotes}</p>}
                          <p className="text-xs text-gray-600 mt-1">{new Date(project.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          {!['In Progress', 'Completed'].includes(project.status) && (
                            <button onClick={() => deleteProject(project._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="glass-card">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-400" /> Change Password</h2>
                <div className="space-y-4 max-w-md">
                  {[
                    { label: 'Current Password', field: 'currentPassword', placeholder: '••••••••' },
                    { label: 'New Password', field: 'newPassword', placeholder: 'Min. 8 characters' },
                    { label: 'Confirm New Password', field: 'confirmPassword', placeholder: 'Repeat new password' },
                  ].map(({ label, field, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                      <input
                        type="password"
                        value={pwdForm[field]}
                        onChange={e => setPwdForm(p => ({ ...p, [field]: e.target.value }))}
                        placeholder={placeholder}
                        className="input-field"
                      />
                    </div>
                  ))}
                  <button onClick={changePassword} disabled={isSaving} className="btn-primary text-sm text-white flex items-center gap-2 disabled:opacity-70">
                    {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="glass-card">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-indigo-400" /> Login History</h2>
                {user?.loginHistory?.length > 0 ? (
                  <div className="space-y-3">
                    {user.loginHistory.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${entry.success ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{new Date(entry.timestamp).toLocaleString()}</span>
                            <span className={`badge ${entry.success ? 'badge-completed' : 'badge-cancelled'} text-xs`}>{entry.success ? 'Success' : 'Failed'}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5 truncate">{entry.ip} — {entry.userAgent?.slice(0, 80)}...</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No login history available</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}