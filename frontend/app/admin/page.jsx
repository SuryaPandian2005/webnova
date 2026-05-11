'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, FolderOpen, TrendingUp, Clock, CheckCircle, LayoutTemplate,
  Search, Trash2, Shield, RefreshCw, Ban, BarChart3, Loader,
  AlertTriangle, Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const STATUS_STYLES = {
  'Pending': 'badge-pending', 'Under Review': 'badge-review',
  'In Progress': 'badge-progress', 'Completed': 'badge-completed',
  'On Hold': 'badge-hold', 'Cancelled': 'badge-cancelled',
};

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return; }
    if (user && user.role !== 'admin') { router.push('/'); toast.error('Admin access only'); return; }
    loadData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) loadUsers();
    if (activeTab === 'projects' && projects.length === 0) loadProjects();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data);
    } catch { toast.error('Failed to load stats'); }
    finally { setLoading(false); }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get(`/admin/users?search=${search}&limit=50`);
      setUsers(res.data.users || []);
    } catch { toast.error('Failed to load users'); }
  };

  const loadProjects = async () => {
    try {
      const res = await api.get(`/admin/projects?search=${search}&status=${statusFilter}&limit=50`);
      setProjects(res.data.projects || []);
    } catch { toast.error('Failed to load projects'); }
  };

  const refresh = async () => {
    setRefreshing(true);
    await loadData();
    if (activeTab === 'users') await loadUsers();
    if (activeTab === 'projects') await loadProjects();
    setRefreshing(false);
    toast.success('Data refreshed');
  };

  const toggleUser = async (userId) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/toggle`);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: res.data.user.isActive } : u));
      toast.success(res.data.message);
    } catch (e) { toast.error(e.message); }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Delete user and all their projects?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success('User deleted');
    } catch (e) { toast.error(e.message); }
  };

  const updateStatus = async (projectId, status) => {
    try {
      await api.patch(`/admin/projects/${projectId}/status`, { status });
      setProjects(prev => prev.map(p => p._id === projectId ? { ...p, status } : p));
      toast.success(`Status updated to ${status}`);
    } catch (e) { toast.error(e.message); }
  };

  if (!isAuthenticated || user?.role !== 'admin') return null;

  const STAT_CARDS = stats ? [
    { label: 'Total Users', value: stats.stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/10 border-blue-500/20' },
    { label: 'Total Projects', value: stats.stats.totalProjects, icon: FolderOpen, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/10 border-purple-500/20' },
    { label: 'Pending', value: stats.stats.pendingProjects, icon: Clock, color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-600/10 border-amber-500/20' },
    { label: 'Completed', value: stats.stats.completedProjects, icon: CheckCircle, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20' },
    { label: 'Templates', value: stats.stats.totalTemplates, icon: LayoutTemplate, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20' },
    { label: 'Est. Revenue', value: `$${(stats.stats.completedProjects * 2500).toLocaleString()}`, icon: TrendingUp, color: 'text-green-400', bg: 'from-green-500/20 to-green-600/10 border-green-500/20' },
  ] : [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative grid-pattern">
      <div className="blob blob-indigo w-96 h-96 -left-48 top-20 opacity-10" />
      <div className="blob blob-purple w-80 h-80 -right-40 bottom-0 opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-amber-400" />
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-gray-400 text-sm">Manage users, projects, and platform analytics</p>
          </div>
          <button onClick={refresh} disabled={refreshing} className="btn-secondary flex items-center gap-2 text-sm text-gray-300 disabled:opacity-70">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'projects', label: 'Projects', icon: FolderOpen },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === id ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'glass border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {loading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map(i => <div key={i} className="skeleton h-28 rounded-2xl" />)}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
                        <motion.div key={label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`glass-card bg-gradient-to-br ${bg} border`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400 font-medium">{label}</span>
                            <Icon className={`w-4 h-4 ${color}`} />
                          </div>
                          <div className={`text-3xl font-bold ${color}`}>{value}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Recent Projects */}
                      <div className="glass-card">
                        <h3 className="font-semibold text-white mb-4">Recent Projects</h3>
                        <div className="space-y-3">
                          {stats?.recentProjects?.map((p) => (
                            <div key={p._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/3 transition-colors">
                              <img src={p.user?.avatar} alt="" className="w-8 h-8 rounded-lg" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{p.projectName}</p>
                                <p className="text-xs text-gray-400">{p.user?.name} • {p.websiteType}</p>
                              </div>
                              <span className={`badge ${STATUS_STYLES[p.status]} text-xs`}>{p.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Users */}
                      <div className="glass-card">
                        <h3 className="font-semibold text-white mb-4">New Users</h3>
                        <div className="space-y-3">
                          {stats?.recentUsers?.map((u) => (
                            <div key={u._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/3 transition-colors">
                              <img src={u.avatar} alt="" className="w-8 h-8 rounded-lg" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{u.name}</p>
                                <p className="text-xs text-gray-400 truncate">{u.email}</p>
                              </div>
                              <span className="text-xs text-gray-500">{u.projectCount} proj</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Projects by Type */}
                    {stats?.projectsByType?.length > 0 && (
                      <div className="glass-card">
                        <h3 className="font-semibold text-white mb-4">Projects by Type</h3>
                        <div className="space-y-3">
                          {stats.projectsByType.slice(0, 6).map(({ _id, count }) => {
                            const pct = Math.round((count / stats.stats.totalProjects) * 100);
                            return (
                              <div key={_id} className="flex items-center gap-3">
                                <span className="text-sm text-gray-300 w-24 flex-shrink-0">{_id}</span>
                                <div className="flex-1 bg-gray-800 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                  />
                                </div>
                                <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* USERS */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="glass-card">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadUsers()} placeholder="Search users by name or email..." className="input-field pl-9 text-sm" />
                    </div>
                    <button onClick={loadUsers} className="btn-secondary text-sm text-gray-300 px-4 py-2">Search</button>
                  </div>
                </div>

                {users.length === 0 && !loading ? (
                  <div className="glass-card text-center py-8">
                    <button onClick={loadUsers} className="btn-primary text-sm text-white">Load Users</button>
                  </div>
                ) : (
                  <div className="glass-card overflow-hidden p-0">
                    <div className="p-4 border-b border-white/5">
                      <h3 className="font-semibold text-white text-sm">{users.length} Users</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                      {users.map((u, i) => (
                        <motion.div key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors">
                          <img src={u.avatar} alt="" className="w-10 h-10 rounded-xl flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-white">{u.name}</p>
                              {u.role === 'admin' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <p className="text-xs text-gray-400 truncate">{u.email}</p>
                            <p className="text-xs text-gray-600">{new Date(u.createdAt).toLocaleDateString()} • {u.projectCount} projects</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`badge text-xs ${u.isActive ? 'badge-completed' : 'badge-cancelled'}`}>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </span>
                            {u.role !== 'admin' && (
                              <>
                                <button onClick={() => toggleUser(u._id)} className={`p-1.5 rounded-lg transition-colors ${u.isActive ? 'hover:bg-amber-500/10 text-amber-400' : 'hover:bg-emerald-500/10 text-emerald-400'}`} title={u.isActive ? 'Deactivate' : 'Activate'}>
                                  <Ban className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => deleteUser(u._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors" title="Delete User">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="glass-card flex flex-wrap gap-3">
                  <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadProjects()} placeholder="Search projects..." className="input-field pl-9 text-sm" />
                  </div>
                  <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); }} className="input-field text-sm w-auto min-w-36">
                    <option value="all">All Status</option>
                    {['Pending', 'Under Review', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button onClick={loadProjects} className="btn-secondary text-sm text-gray-300 px-4 py-2">Search</button>
                </div>

                {projects.length === 0 ? (
                  <div className="glass-card text-center py-8">
                    <button onClick={loadProjects} className="btn-primary text-sm text-white">Load Projects</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map((p, i) => (
                      <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <img src={p.user?.avatar} alt="" className="w-10 h-10 rounded-xl flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white text-sm">{p.projectName}</h3>
                              <span className={`badge ${STATUS_STYLES[p.status]} text-xs`}>{p.status}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{p.user?.name} • {p.websiteType} • {p.budget} • {p.timeline}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {Object.entries(p.features || {}).filter(([,v]) => v).slice(0, 4).map(([k]) => (
                                <span key={k} className="text-xs px-1.5 py-0.5 glass rounded border border-white/10 text-gray-500">{k}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <label className="block text-xs text-gray-500 mb-1">Status</label>
                            <select
                              value={p.status}
                              onChange={e => updateStatus(p._id, e.target.value)}
                              className="input-field text-xs py-1.5 w-36"
                            >
                              {['Pending', 'Under Review', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}