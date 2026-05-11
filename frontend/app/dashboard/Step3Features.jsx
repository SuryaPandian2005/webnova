'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const ALL_PAGES = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact', 'Pricing', 'FAQ', 'Team', 'Testimonials', 'Login', 'Register', 'Dashboard', 'Admin Panel', 'Shop', 'Checkout'];

const FEATURES_LIST = [
  { key: 'adminPanel', label: 'Admin Panel', emoji: '🛡️', desc: 'Secure admin management dashboard' },
  { key: 'authentication', label: 'Authentication', emoji: '🔐', desc: 'User login & registration system' },
  { key: 'paymentGateway', label: 'Payment Gateway', emoji: '💳', desc: 'Stripe/PayPal integration' },
  { key: 'seoOptimization', label: 'SEO Optimization', emoji: '📈', desc: 'Meta tags, sitemap, schema' },
  { key: 'animations', label: 'Animations', emoji: '✨', desc: 'Framer Motion & GSAP effects' },
  { key: 'darkMode', label: 'Dark Mode', emoji: '🌙', desc: 'Light/dark theme toggle' },
  { key: 'multiLanguage', label: 'Multi-Language', emoji: '🌍', desc: 'i18n internationalization' },
  { key: 'analytics', label: 'Analytics', emoji: '📊', desc: 'User tracking & insights' },
  { key: 'chatbot', label: 'AI Chatbot', emoji: '🤖', desc: 'Intelligent chat assistant' },
  { key: 'newsletter', label: 'Newsletter', emoji: '📧', desc: 'Email subscription system' }
];

export default function Step3Features({ formData, updateForm, onNext, onPrev }) {
  const togglePage = (page) => {
    const pages = formData.pages.includes(page)
      ? formData.pages.filter(p => p !== page)
      : [...formData.pages, page];
    updateForm({ pages });
  };

  const toggleFeature = (key) => {
    updateForm({ features: { ...formData.features, [key]: !formData.features[key] } });
  };

  return (
    <div className="glass-dark rounded-3xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Pages & Features</h2>
        <p className="text-slate-400">Select the pages and functionality you need</p>
      </div>

      {/* Pages */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Pages</h3>
          <span className="glass px-3 py-1 rounded-full text-xs text-indigo-300 border border-indigo-500/30">
            {formData.pages.length} selected
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {ALL_PAGES.map((page) => (
            <motion.button key={page} onClick={() => togglePage(page)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center space-x-2 p-3 rounded-xl border text-sm transition-all ${
                formData.pages.includes(page)
                  ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                  : 'border-white/10 glass text-slate-400 hover:text-white hover:border-white/20'
              }`}>
              {formData.pages.includes(page) && <Check size={12} className="text-indigo-400 flex-shrink-0" />}
              <span className={formData.pages.includes(page) ? '' : 'ml-4'}>{page}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Features & Functionality</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES_LIST.map((f) => (
            <motion.button key={f.key} onClick={() => toggleFeature(f.key)}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className={`flex items-center space-x-3 p-4 rounded-xl border transition-all text-left ${
                formData.features[f.key]
                  ? 'border-indigo-500/50 bg-indigo-500/15'
                  : 'border-white/10 glass hover:border-white/20'
              }`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                formData.features[f.key] ? 'bg-indigo-500/30' : 'bg-white/5'
              }`}>
                <span className="text-lg">{f.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${formData.features[f.key] ? 'text-indigo-300' : 'text-white'}`}>{f.label}</div>
                <div className="text-xs text-slate-500 truncate">{f.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                formData.features[f.key] ? 'bg-indigo-500 border-indigo-500' : 'border-white/20'
              }`}>
                {formData.features[f.key] && <Check size={11} className="text-white" />}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button onClick={onPrev} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft size={18} /><span>Back</span>
        </motion.button>
        <motion.button onClick={onNext} disabled={formData.pages.length === 0}
          whileHover={{ scale: formData.pages.length ? 1.02 : 1 }} whileTap={{ scale: formData.pages.length ? 0.98 : 1 }}
          className="btn-primary flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed">
          <span>Continue</span><ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}