'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ExternalLink, Zap, Filter, X, Download, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '../../services/api';
import useAuthStore from '../../store/authStore';

const CATEGORIES = ['All', 'Portfolio', 'Ecommerce', 'Restaurant', 'SaaS', 'Real Estate', 'Blog', 'Agency', 'School', 'Hospital', 'AI Startup', 'Business'];

function TemplateSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-40 w-full mb-4 rounded-xl" />
      <div className="skeleton h-4 w-2/3 mb-2 rounded" />
      <div className="skeleton h-3 w-full mb-1 rounded" />
      <div className="skeleton h-3 w-4/5 mb-4 rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-8 flex-1 rounded-lg" />
        <div className="skeleton h-8 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

function TemplateCard({ template, onUse }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card overflow-hidden group cursor-pointer card-lift"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Preview */}
      <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-gray-900 border border-white/5">
        {/* Browser Mockup */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-gray-800/80 flex items-center px-3 gap-1.5 backdrop-blur-sm z-10">
          <div className="w-2 h-2 rounded-full bg-red-400/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
          <div className="flex-1 bg-gray-700/50 rounded text-[9px] text-gray-500 text-center mx-2 py-0.5 truncate">{template.name.toLowerCase().replace(/\s+/g, '-')}.vercel.app</div>
        </div>
        {/* Color Preview */}
        <div className="mt-7 h-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${template.colorPalette[0] || '#6366f1'}22, ${template.colorPalette[1] || '#a855f7'}22)` }} />
          <div className="relative z-10 grid grid-cols-3 gap-2 p-4 w-full">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-3 rounded-full opacity-40" style={{ backgroundColor: template.colorPalette[i] || '#6366f1' }} />
            ))}
            {[3, 4, 5].map(i => (
              <div key={i} className="h-2 rounded-full opacity-20" style={{ backgroundColor: template.colorPalette[i % template.colorPalette.length] || '#a855f7' }} />
            ))}
            <div className="col-span-3 h-12 rounded-lg opacity-30" style={{ background: `linear-gradient(135deg, ${template.colorPalette[0]}66, ${template.colorPalette[1] || template.colorPalette[0]}66)` }} />
          </div>
          {/* Color Dots */}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {template.colorPalette.slice(0, 4).map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center gap-3 backdrop-blur-sm z-20"
            >
              <a href={template.livePreviewUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-1.5 text-xs text-white py-2 px-4" onClick={e => e.stopPropagation()}>
                <ExternalLink className="w-3.5 h-3.5" /> Preview
              </a>
              <button onClick={() => onUse(template)} className="btn-primary flex items-center gap-1.5 text-xs text-white py-2 px-4">
                <Zap className="w-3.5 h-3.5" /> Use This
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-10 left-2 flex gap-1.5 z-10">
          {template.isFeatured && (
            <span className="badge badge-review text-xs py-0.5">⭐ Featured</span>
          )}
          {template.isPremium && (
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full text-xs">
              <Crown className="w-2.5 h-2.5" /> Pro
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white text-sm">{template.name}</h3>
          <span className="text-xs text-indigo-400">{template.category}</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-medium text-gray-300">{template.rating}</span>
          <span className="text-xs text-gray-500">({template.reviewCount})</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{template.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {template.features?.slice(0, 3).map((f) => (
          <span key={f} className="text-xs px-2 py-0.5 glass rounded-md border border-white/10 text-gray-400">{f}</span>
        ))}
        {template.features?.length > 3 && (
          <span className="text-xs px-2 py-0.5 text-gray-500">+{template.features.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Download className="w-3 h-3" />{template.downloads?.toLocaleString()}</span>
          <span>{template.pages?.length} pages</span>
        </div>
        <span className={`text-sm font-bold ${template.isPremium ? 'text-amber-400' : 'text-emerald-400'}`}>
          {template.isPremium ? `$${template.price}` : 'Free'}
        </span>
      </div>
    </motion.div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchTemplates();
  }, [category, featuredOnly]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'All') params.append('category', category);
      if (featuredOnly) params.append('featured', 'true');
      const res = await api.get(`/templates?${params}`);
      setTemplates(res.data.templates || []);
    } catch {
      // Seed if empty
      try {
        await api.post('/templates/seed');
        const res = await api.get('/templates');
        setTemplates(res.data.templates || []);
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  const handleUse = (template) => {
    if (!isAuthenticated) {
      toast.error('Please login to use templates');
      router.push('/login');
      return;
    }
    router.push(`/dashboard?template=${template._id}&type=${template.category}`);
  };

  const filtered = templates.filter(t => {
    const s = search.toLowerCase();
    const matchesSearch = !s || t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s) || t.tags?.some(tag => tag.includes(s));
    const matchesFree = !freeOnly || !t.isPremium;
    return matchesSearch && matchesFree;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative grid-pattern">
      <div className="blob blob-purple w-96 h-96 -right-48 top-20 opacity-10" />
      <div className="blob blob-cyan w-80 h-80 -left-40 bottom-0 opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge badge-review mb-4 inline-flex"><Zap className="w-3 h-3" /> {templates.length} Templates</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Beautiful <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready-made website templates for every industry. Click "Use This" to start your project.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="input-field pl-10 text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Toggles */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${featuredOnly ? 'bg-indigo-500 text-white' : 'glass border border-white/10 text-gray-400 hover:text-white'}`}
              >
                <Star className="w-3.5 h-3.5" /> Featured
              </button>
              <button
                onClick={() => setFreeOnly(!freeOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${freeOnly ? 'bg-emerald-500 text-white' : 'glass border border-white/10 text-gray-400 hover:text-white'}`}
              >
                Free Only
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  category === cat ? 'bg-indigo-500 text-white' : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-500">
            Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
            {search && ` for "${search}"`}
            {category !== 'All' && ` in ${category}`}
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <TemplateSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
              <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters</p>
              <button onClick={() => { setSearch(''); setCategory('All'); setFeaturedOnly(false); setFreeOnly(false); }} className="btn-primary text-sm text-white">
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((template) => (
                <TemplateCard key={template._id} template={template} onUse={handleUse} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}