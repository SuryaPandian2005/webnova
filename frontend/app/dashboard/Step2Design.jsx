'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const COLOR_THEMES = [
  { label: 'Purple & Indigo', value: 'Purple & Indigo', colors: ['#6366f1', '#8b5cf6'] },
  { label: 'Blue & Cyan', value: 'Blue & Cyan', colors: ['#3b82f6', '#06b6d4'] },
  { label: 'Green & Emerald', value: 'Green & Emerald', colors: ['#10b981', '#34d399'] },
  { label: 'Orange & Red', value: 'Orange & Red', colors: ['#f59e0b', '#ef4444'] },
  { label: 'Pink & Rose', value: 'Pink & Rose', colors: ['#ec4899', '#f43f5e'] },
  { label: 'Custom', value: 'Custom', colors: ['#1e293b', '#334155'] }
];

export default function Step2Design({ formData, updateForm, onNext, onPrev }) {
  const isValid = formData.projectName?.trim()?.length >= 3 && formData.description?.trim()?.length >= 20;

  return (
    <div className="glass-dark rounded-3xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Project Details & Design</h2>
        <p className="text-slate-400">Tell us about your project and preferred colors</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Project Name *</label>
          <input type="text" value={formData.projectName}
            onChange={e => updateForm({ projectName: e.target.value })}
            placeholder="My Amazing Portfolio" className="input-field" maxLength={100} />
          <p className="text-xs text-slate-500 mt-1">{formData.projectName?.length || 0}/100</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Project Description *</label>
          <textarea value={formData.description}
            onChange={e => updateForm({ description: e.target.value })}
            placeholder="Describe what your website does, your target audience, key features, and any specific requirements..."
            className="input-field h-28 resize-none" maxLength={2000} />
          <p className={`text-xs mt-1 ${formData.description?.length < 20 ? 'text-red-400' : 'text-slate-500'}`}>
            {formData.description?.length || 0}/2000 (minimum 20 characters)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Color Theme</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COLOR_THEMES.map((theme) => (
              <motion.button key={theme.value} onClick={() => updateForm({ colorTheme: theme.value })}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all ${
                  formData.colorTheme === theme.value ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 glass hover:border-white/20'
                }`}>
                <div className="flex space-x-1">
                  {theme.colors.map((c, i) => <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: c }} />)}
                </div>
                <span className={`text-sm font-medium ${formData.colorTheme === theme.value ? 'text-indigo-300' : 'text-slate-300'}`}>
                  {theme.label}
                </span>
              </motion.button>
            ))}
          </div>
          {formData.colorTheme === 'Custom' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
              <label className="block text-sm text-slate-400 mb-2">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input type="color" value={formData.customColor || '#6366f1'}
                  onChange={e => updateForm({ customColor: e.target.value })}
                  className="w-12 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                <input type="text" value={formData.customColor || '#6366f1'}
                  onChange={e => updateForm({ customColor: e.target.value })}
                  placeholder="#6366f1" className="input-field flex-1 font-mono text-sm" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button onClick={onPrev} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft size={18} /><span>Back</span>
        </motion.button>
        <motion.button onClick={onNext} disabled={!isValid}
          whileHover={{ scale: isValid ? 1.02 : 1 }} whileTap={{ scale: isValid ? 0.98 : 1 }}
          className="btn-primary flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed">
          <span>Continue</span><ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}