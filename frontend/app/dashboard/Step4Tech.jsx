'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FRONTEND_OPTIONS = ['React.js', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'SvelteKit', 'Astro'];
const BACKEND_OPTIONS = ['Node.js + Express', 'Python + Django', 'Python + FastAPI', 'PHP + Laravel', 'Go + Gin', 'Ruby on Rails'];
const DATABASE_OPTIONS = ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'Firebase', 'PlanetScale'];
const DEPLOYMENT_OPTIONS = ['Vercel', 'Netlify', 'AWS', 'Google Cloud', 'DigitalOcean', 'Railway', 'Render'];
const BUDGET_OPTIONS = ['Under $500', '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000 - $10,000', '$10,000+'];
const TIMELINE_OPTIONS = ['1 Week', '2 Weeks', '1 Month', '2 Months', '3 Months', '6 Months'];

function SelectGroup({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <motion.button key={opt} onClick={() => onChange(opt)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`px-3 py-2 rounded-xl text-sm border transition-all ${
              value === opt ? 'border-indigo-500/60 bg-indigo-500/20 text-indigo-300 font-medium' : 'border-white/10 glass text-slate-400 hover:text-white hover:border-white/20'
            }`}>{opt}</motion.button>
        ))}
      </div>
    </div>
  );
}

export default function Step4Tech({ formData, updateForm, onNext, onPrev }) {
  const updateTech = (key, value) => updateForm({ techStack: { ...formData.techStack, [key]: value } });

  return (
    <div className="glass-dark rounded-3xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Tech Stack & Budget</h2>
        <p className="text-slate-400">Choose your preferred technologies and project scope</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectGroup label="Frontend Framework" options={FRONTEND_OPTIONS} value={formData.techStack.frontend} onChange={v => updateTech('frontend', v)} />
          <SelectGroup label="Backend Framework" options={BACKEND_OPTIONS} value={formData.techStack.backend} onChange={v => updateTech('backend', v)} />
          <SelectGroup label="Database" options={DATABASE_OPTIONS} value={formData.techStack.database} onChange={v => updateTech('database', v)} />
          <SelectGroup label="Deployment Platform" options={DEPLOYMENT_OPTIONS} value={formData.techStack.deployment} onChange={v => updateTech('deployment', v)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectGroup label="Budget Range" options={BUDGET_OPTIONS} value={formData.budget} onChange={v => updateForm({ budget: v })} />
          <SelectGroup label="Timeline" options={TIMELINE_OPTIONS} value={formData.timeline} onChange={v => updateForm({ timeline: v })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Additional Notes</label>
          <textarea value={formData.additionalNotes}
            onChange={e => updateForm({ additionalNotes: e.target.value })}
            placeholder="Any specific requirements, inspirations, or notes for the development team..."
            className="input-field h-24 resize-none" maxLength={1000} />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button onClick={onPrev} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft size={18} /><span>Back</span>
        </motion.button>
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary flex items-center space-x-2">
          <span>Review</span><ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}