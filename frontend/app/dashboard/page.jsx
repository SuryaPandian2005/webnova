'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, ShoppingCart, UtensilsCrossed, Zap, Home, BookOpen, Building2,
  GraduationCap, HeartPulse, Brain, BarChart3, ArrowLeft, ArrowRight,
  Palette, FileText, Settings, Code2, CheckCircle, Loader, Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const WEBSITE_TYPES = [
  { id: 'Portfolio', label: 'Portfolio', icon: Briefcase, desc: 'Showcase your work & skills', color: 'from-purple-500 to-indigo-600', emoji: '🎨' },
  { id: 'Ecommerce', label: 'Ecommerce', icon: ShoppingCart, desc: 'Sell products online', color: 'from-emerald-500 to-teal-600', emoji: '🛒' },
  { id: 'Restaurant', label: 'Restaurant', icon: UtensilsCrossed, desc: 'Menu, reservations & orders', color: 'from-orange-500 to-red-500', emoji: '🍽️' },
  { id: 'SaaS', label: 'SaaS', icon: Zap, desc: 'Software product landing', color: 'from-blue-500 to-cyan-500', emoji: '⚡' },
  { id: 'Real Estate', label: 'Real Estate', icon: Home, desc: 'Property listings & agents', color: 'from-teal-500 to-green-500', emoji: '🏠' },
  { id: 'Blog', label: 'Blog', icon: BookOpen, desc: 'Write & publish content', color: 'from-yellow-500 to-amber-500', emoji: '📝' },
  { id: 'Agency', label: 'Agency', icon: Building2, desc: 'Creative & marketing agency', color: 'from-pink-500 to-rose-500', emoji: '🚀' },
  { id: 'School', label: 'School', icon: GraduationCap, desc: 'Education & courses', color: 'from-violet-500 to-purple-500', emoji: '🎓' },
  { id: 'Hospital', label: 'Hospital', icon: HeartPulse, desc: 'Healthcare & appointments', color: 'from-red-400 to-pink-500', emoji: '🏥' },
  { id: 'AI Startup', label: 'AI Startup', icon: Brain, desc: 'Futuristic AI product', color: 'from-indigo-500 to-blue-600', emoji: '🤖' },
  { id: 'Business', label: 'Business', icon: BarChart3, desc: 'Corporate & enterprise', color: 'from-slate-500 to-gray-600', emoji: '💼' },
];

const PAGES_LIST = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact', 'Pricing', 'FAQ', 'Testimonials', 'Team', 'Login', 'Register', 'Dashboard', 'Product', 'Shop', 'Cart'];
const COLOR_THEMES = [
  { id: 'Purple & Indigo', label: 'Purple & Indigo', colors: ['#6366f1', '#a855f7'] },
  { id: 'Blue & Cyan', label: 'Blue & Cyan', colors: ['#3b82f6', '#06b6d4'] },
  { id: 'Green & Emerald', label: 'Green & Emerald', colors: ['#10b981', '#059669'] },
  { id: 'Red & Orange', label: 'Red & Orange', colors: ['#ef4444', '#f97316'] },
  { id: 'Pink & Rose', label: 'Pink & Rose', colors: ['#ec4899', '#f43f5e'] },
  { id: 'Custom', label: 'Custom Color', colors: ['#6366f1', '#06b6d4'] },
];
const FEATURES = [
  { id: 'adminPanel', label: 'Admin Panel', icon: '🔧', desc: 'Full admin dashboard' },
  { id: 'authSystem', label: 'Auth System', icon: '🔐', desc: 'Login & registration' },
  { id: 'paymentGateway', label: 'Payments', icon: '💳', desc: 'Stripe / PayPal' },
  { id: 'seoOptimization', label: 'SEO', icon: '🔍', desc: 'Meta, sitemap, OG' },
  { id: 'animations', label: 'Animations', icon: '✨', desc: 'Framer Motion' },
  { id: 'darkMode', label: 'Dark Mode', icon: '🌙', desc: 'Light/dark toggle' },
  { id: 'multiLanguage', label: 'Multi-Language', icon: '🌍', desc: 'i18n support' },
  { id: 'analytics', label: 'Analytics', icon: '📊', desc: 'Google Analytics' },
  { id: 'chatbot', label: 'Chatbot', icon: '🤖', desc: 'AI chat widget' },
  { id: 'newsletter', label: 'Newsletter', icon: '📧', desc: 'Email subscription' },
];
const FRONTEND_STACKS = ['React.js', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Vanilla JS'];
const BACKEND_STACKS = ['Node.js + Express', 'Python + Django', 'Python + FastAPI', 'PHP + Laravel', 'Ruby on Rails', 'None (Static)'];
const DATABASES = ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'None'];
const DEPLOYMENTS = ['Vercel', 'Netlify', 'AWS', 'DigitalOcean', 'Heroku', 'Railway'];
const BUDGETS = ['< $500', '$500 - $1000', '$1000 - $5000', '$5000 - $10000', '$10000+', 'Discuss'];
const TIMELINES = ['1 week', '2 weeks', '1 month', '2 months', '3 months', 'Flexible'];

const STEPS = [
  { id: 1, label: 'Website Type', icon: Sparkles },
  { id: 2, label: 'Basic Info', icon: FileText },
  { id: 3, label: 'Pages & Features', icon: Settings },
  { id: 4, label: 'Tech Stack', icon: Code2 },
  { id: 5, label: 'Review', icon: CheckCircle },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    websiteType: '',
    projectName: '',
    description: '',
    colorTheme: 'Purple & Indigo',
    customColor: '#6366f1',
    pages: ['Home', 'About', 'Contact'],
    features: {
      adminPanel: false, authSystem: false, paymentGateway: false,
      seoOptimization: false, animations: false, darkMode: false,
      multiLanguage: false, analytics: false, chatbot: false, newsletter: false,
    },
    techStack: { frontend: 'Next.js', backend: 'Node.js + Express', database: 'MongoDB', deployment: 'Vercel' },
    budget: 'Discuss',
    timeline: 'Flexible',
    additionalNotes: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      router.push('/login');
    }
  }, [isAuthenticated]);

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const togglePage = (page) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.includes(page) ? prev.pages.filter(p => p !== page) : [...prev.pages, page],
    }));
  };
  const toggleFeature = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: { ...prev.features, [featureId]: !prev.features[featureId] },
    }));
  };
  const updateStack = (field, value) => {
    setFormData(prev => ({ ...prev, techStack: { ...prev.techStack, [field]: value } }));
  };

  const handleSubmit = async () => {
    if (!formData.projectName.trim()) { toast.error('Project name is required'); return; }
    setIsSubmitting(true);
    try {
      await api.post('/projects', formData);
      setSubmitted(true);
      toast.success('Project submitted successfully! 🎉');
    } catch (error) {
      toast.error(error.message || 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-lg w-full text-center p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">Project Submitted!</h2>
          <p className="text-gray-400 mb-2">Your <strong className="text-white">{formData.websiteType}</strong> website request has been received.</p>
          <p className="text-gray-500 text-sm mb-8">Our team will review it and get back to you within 24 hours with a quote and timeline.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setFormData(prev => ({ ...prev, websiteType: '', projectName: '' })); }} className="btn-secondary text-sm text-gray-300">New Request</button>
            <button onClick={() => router.push('/profile')} className="btn-primary text-sm text-white">View My Projects</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative grid-pattern">
      <div className="blob blob-indigo w-96 h-96 -left-48 top-20 opacity-10" />
      <div className="blob blob-purple w-80 h-80 -right-40 bottom-0 opacity-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-indigo-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Welcome, {user?.name?.split(' ')[0]}!</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Build Your <span className="gradient-text">Dream Website</span></h1>
          <p className="text-gray-400">Complete the form below and our team will bring your vision to life</p>
        </motion.div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <div className={`flex flex-col items-center gap-1.5 ${isCurrent ? '' : 'opacity-60'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-500 text-white' :
                      isCurrent ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' :
                      'glass border border-white/10 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs font-medium whitespace-nowrap ${isCurrent ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-12 h-px mx-2 mb-5 transition-colors duration-300 ${step > s.id ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >

            {/* STEP 1: Website Type */}
            {step === 1 && (
              <div>
                <div className="glass-card mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">What type of website do you need?</h2>
                  <p className="text-gray-400 text-sm">Select the category that best describes your project</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {WEBSITE_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.websiteType === type.id;
                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => { update('websiteType', type.id); }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`glass-card p-5 text-left transition-all duration-300 cursor-pointer ${
                          isSelected ? 'border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/20' : 'hover:border-white/20'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow-md`}>
                          <span className="text-xl">{type.emoji}</span>
                        </div>
                        <div className="font-semibold text-white text-sm mb-1">{type.label}</div>
                        <div className="text-gray-400 text-xs">{type.desc}</div>
                        {isSelected && (
                          <div className="mt-2">
                            <span className="badge badge-progress text-xs">Selected ✓</span>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="glass-card">
                  <h2 className="text-xl font-bold text-white mb-2">Project Details</h2>
                  <p className="text-gray-400 text-sm">Tell us about your project</p>
                </div>
                <div className="glass-card space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                    <input value={formData.projectName} onChange={e => update('projectName', e.target.value)} placeholder="e.g. My Awesome Portfolio" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea value={formData.description} onChange={e => update('description', e.target.value)} placeholder="Describe your project goals, target audience, and any specific requirements..." rows={4} className="input-field resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Color Theme</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {COLOR_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => update('colorTheme', theme.id)}
                          className={`glass p-3 rounded-xl border transition-all duration-200 text-left ${formData.colorTheme === theme.id ? 'border-indigo-500/60 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
                        >
                          <div className="flex gap-1.5 mb-2">
                            {theme.colors.map((c) => <div key={c} className="w-5 h-5 rounded-full shadow-md" style={{ backgroundColor: c }} />)}
                          </div>
                          <div className="text-xs text-gray-300 font-medium">{theme.label}</div>
                        </button>
                      ))}
                    </div>
                    {formData.colorTheme === 'Custom' && (
                      <div className="mt-3 flex items-center gap-3">
                        <input type="color" value={formData.customColor} onChange={e => update('customColor', e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20" />
                        <span className="text-sm text-gray-400">Pick your custom color: {formData.customColor}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Pages & Features */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="glass-card">
                  <h2 className="text-xl font-bold text-white mb-2">Pages & Features</h2>
                  <p className="text-gray-400 text-sm">Select the pages and functionality you need</p>
                </div>
                <div className="glass-card">
                  <h3 className="font-semibold text-white mb-4">Pages Needed <span className="text-xs text-gray-400 ml-2">({formData.pages.length} selected)</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {PAGES_LIST.map((page) => (
                      <button
                        key={page}
                        onClick={() => togglePage(page)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          formData.pages.includes(page)
                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                            : 'glass border border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-card">
                  <h3 className="font-semibold text-white mb-4">Features & Integrations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FEATURES.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                          formData.features[feature.id]
                            ? 'border-indigo-500/60 bg-indigo-500/10'
                            : 'glass border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xl">{feature.icon}</span>
                        <div>
                          <div className={`text-sm font-medium ${formData.features[feature.id] ? 'text-indigo-300' : 'text-gray-300'}`}>{feature.label}</div>
                          <div className="text-xs text-gray-500">{feature.desc}</div>
                        </div>
                        <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${formData.features[feature.id] ? 'border-indigo-500 bg-indigo-500' : 'border-gray-600'}`}>
                          {formData.features[feature.id] && <div className="w-full h-full flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Tech Stack */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="glass-card">
                  <h2 className="text-xl font-bold text-white mb-2">Tech Stack & Budget</h2>
                  <p className="text-gray-400 text-sm">Choose your preferred technologies and budget</p>
                </div>
                <div className="glass-card space-y-6">
                  {[
                    { label: 'Frontend Framework', field: 'frontend', options: FRONTEND_STACKS },
                    { label: 'Backend / API', field: 'backend', options: BACKEND_STACKS },
                    { label: 'Database', field: 'database', options: DATABASES },
                    { label: 'Deployment', field: 'deployment', options: DEPLOYMENTS },
                  ].map(({ label, field, options }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                      <div className="flex flex-wrap gap-2">
                        {options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => updateStack(field, opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                              formData.techStack[field] === opt
                                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                                : 'glass border border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="glass-card">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Budget Range</label>
                    <div className="space-y-2">
                      {BUDGETS.map((b) => (
                        <button key={b} onClick={() => update('budget', b)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${formData.budget === b ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'text-gray-400 hover:bg-white/5'}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Timeline</label>
                    <div className="space-y-2">
                      {TIMELINES.map((t) => (
                        <button key={t} onClick={() => update('timeline', t)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${formData.timeline === t ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'text-gray-400 hover:bg-white/5'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="glass-card">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                  <textarea value={formData.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} placeholder="Any specific requirements, references, or additional information..." rows={4} className="input-field resize-none" />
                </div>
              </div>
            )}

            {/* STEP 5: Review */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="glass-card">
                  <h2 className="text-xl font-bold text-white mb-2">Review Your Request</h2>
                  <p className="text-gray-400 text-sm">Double-check everything before submitting</p>
                </div>
                {[
                  { title: '🌐 Website Type', content: formData.websiteType },
                  { title: '📋 Project Name', content: formData.projectName },
                  { title: '📝 Description', content: formData.description || 'Not provided' },
                  { title: '🎨 Color Theme', content: formData.colorTheme + (formData.colorTheme === 'Custom' ? ` (${formData.customColor})` : '') },
                  { title: '📄 Pages', content: formData.pages.join(', ') || 'None selected' },
                  {
                    title: '⚙️ Features', content: Object.entries(formData.features)
                      .filter(([, v]) => v)
                      .map(([k]) => FEATURES.find(f => f.id === k)?.label || k)
                      .join(', ') || 'None selected'
                  },
                  {
                    title: '🛠️ Tech Stack',
                    content: `Frontend: ${formData.techStack.frontend} | Backend: ${formData.techStack.backend} | DB: ${formData.techStack.database} | Deploy: ${formData.techStack.deployment}`
                  },
                  { title: '💰 Budget', content: formData.budget },
                  { title: '⏱️ Timeline', content: formData.timeline },
                ].map(({ title, content }) => (
                  <div key={title} className="glass-card py-3 px-4">
                    <div className="text-xs font-semibold text-gray-400 mb-0.5">{title}</div>
                    <div className="text-sm text-white">{content}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="btn-secondary flex items-center gap-2 text-sm text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-xs text-gray-500">Step {step} of {STEPS.length}</span>
          {step < STEPS.length ? (
            <button
              onClick={() => {
                if (step === 1 && !formData.websiteType) { toast.error('Please select a website type'); return; }
                if (step === 2 && !formData.projectName.trim()) { toast.error('Project name is required'); return; }
                setStep(s => s + 1);
              }}
              className="btn-primary flex items-center gap-2 text-sm text-white"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 text-sm text-white disabled:opacity-70"
            >
              {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" /> Submitting...</> : <><CheckCircle className="w-4 h-4" /> Submit Project</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}