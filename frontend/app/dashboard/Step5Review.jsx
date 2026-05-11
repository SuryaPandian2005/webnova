'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';

export default function Step5Review({ formData, onPrev, onSubmit, isSubmitting }) {
  const featureCount = Object.values(formData.features).filter(Boolean).length;
  return (
    <div className="glass-dark rounded-3xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Review Your Project</h2>
        <p className="text-slate-400">Confirm everything looks correct before submitting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Website Type', value: `${formData.websiteType}`, icon: '🌐' },
          { label: 'Project Name', value: formData.projectName, icon: '📝' },
          { label: 'Color Theme', value: formData.colorTheme, icon: '🎨' },
          { label: 'Pages', value: `${formData.pages.length} pages selected`, icon: '📄' },
          { label: 'Features', value: `${featureCount} features enabled`, icon: '⚙️' },
          { label: 'Frontend', value: formData.techStack.frontend, icon: '⚛️' },
          { label: 'Backend', value: formData.techStack.backend, icon: '🖥️' },
          { label: 'Database', value: formData.techStack.database, icon: '🗄️' },
          { label: 'Deployment', value: formData.techStack.deployment, icon: '🚀' },
          { label: 'Budget', value: formData.budget, icon: '💰' },
          { label: 'Timeline', value: formData.timeline, icon: '⏱️' }
        ].map((item, i) => (
          <div key={i} className="glass rounded-xl p-4 flex items-center space-x-3">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.label}</div>
              <div className="text-sm font-semibold text-white mt-0.5">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pages list */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Selected Pages</div>
        <div className="flex flex-wrap gap-2">
          {formData.pages.map(page => (
            <span key={page} className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs border border-indigo-500/30">{page}</span>
          ))}
        </div>
      </div>

      {/* Enabled features */}
      <div className="glass rounded-xl p-4 mb-8">
        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Enabled Features</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(formData.features).filter(([, v]) => v).map(([k]) => (
            <span key={k} className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs border border-emerald-500/30">
              {k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button onClick={onPrev} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft size={18} /><span>Back</span>
        </motion.button>
        <motion.button onClick={onSubmit} disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.03 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          className="btn-primary flex items-center space-x-2 px-8 disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? <><Loader2 size={18} className="animate-spin" /><span>Submitting...</span></>
            : <><Send size={18} /><span>Submit Project</span></>}
        </motion.button>
      </div>
    </div>
  );
}