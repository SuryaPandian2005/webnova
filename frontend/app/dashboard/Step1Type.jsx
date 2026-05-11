'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WEBSITE_TYPES = [
  { type: 'Portfolio', emoji: '🎨', desc: 'Showcase your work & skills', color: 'from-purple-500/20 to-pink-500/20' },
  { type: 'Ecommerce', emoji: '🛒', desc: 'Online store with cart & payments', color: 'from-amber-500/20 to-orange-500/20' },
  { type: 'Restaurant', emoji: '🍽️', desc: 'Menu, reservations & delivery', color: 'from-red-500/20 to-rose-500/20' },
  { type: 'SaaS', emoji: '☁️', desc: 'Software product landing page', color: 'from-blue-500/20 to-cyan-500/20' },
  { type: 'Real Estate', emoji: '🏠', desc: 'Property listings & search', color: 'from-emerald-500/20 to-teal-500/20' },
  { type: 'Blog', emoji: '✍️', desc: 'Articles, stories & content', color: 'from-slate-500/20 to-gray-500/20' },
  { type: 'Agency', emoji: '🚀', desc: 'Digital agency showcase', color: 'from-indigo-500/20 to-violet-500/20' },
  { type: 'School', emoji: '📚', desc: 'Educational institution site', color: 'from-blue-500/20 to-indigo-500/20' },
  { type: 'Hospital', emoji: '🏥', desc: 'Healthcare & medical services', color: 'from-teal-500/20 to-green-500/20' },
  { type: 'AI Startup', emoji: '🤖', desc: 'AI product launch page', color: 'from-violet-500/20 to-purple-500/20' },
  { type: 'Business', emoji: '💼', desc: 'Corporate business website', color: 'from-gray-500/20 to-slate-500/20' }
];

export default function Step1Type({ formData, updateForm, onNext }) {
  const handleSelect = (type) => {
    updateForm({ websiteType: type });
  };

  return (
    <div className="glass-dark rounded-3xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What type of website do you need?</h2>
        <p className="text-slate-400">Choose the category that best describes your project</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {WEBSITE_TYPES.map((item, i) => (
          <motion.button key={item.type} onClick={() => handleSelect(item.type)}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
              formData.websiteType === item.type
                ? 'border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
                : 'border-white/10 glass hover:border-white/20'
            } bg-gradient-to-br ${item.color}`}>
            <div className="text-2xl mb-2">{item.emoji}</div>
            <div className={`font-semibold text-sm mb-1 ${formData.websiteType === item.type ? 'text-indigo-300' : 'text-white'}`}>
              {item.type}
            </div>
            <div className="text-slate-400 text-xs leading-tight">{item.desc}</div>
            {formData.websiteType === item.type && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end">
        <motion.button onClick={onNext} disabled={!formData.websiteType}
          whileHover={{ scale: formData.websiteType ? 1.03 : 1 }} whileTap={{ scale: formData.websiteType ? 0.97 : 1 }}
          className="btn-primary flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed">
          <span>Continue</span><ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}