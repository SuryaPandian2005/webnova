'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, User, LayoutDashboard } from 'lucide-react';

export default function SuccessScreen({ project, projectId }) {
  useEffect(() => {
    // Confetti-like particle animation
    const container = document.getElementById('success-container');
    if (container) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute; width: 8px; height: 8px; border-radius: 50%;
          background: ${['#6366f1','#8b5cf6','#06b6d4','#10b981'][i % 4]};
          left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
          animation: float ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite;
          opacity: ${0.3 + Math.random() * 0.7};
        `;
        container.appendChild(particle);
      }
    }
  }, []);

  return (
    <div id="success-container" className="relative min-h-[60vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="glass-dark rounded-3xl p-12 border border-emerald-500/20 text-center max-w-lg w-full shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-indigo-900/20 to-purple-900/20" />
        <div className="relative z-10">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-3xl font-black text-white mb-3">
            Project Submitted! 🎉
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-slate-400 mb-2">
            <strong className="text-white">{project.projectName}</strong> has been received.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-sm text-slate-500 mb-8">
            Our team will review your <strong className="text-indigo-300">{project.websiteType}</strong> website request and get back to you within 24 hours.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="glass rounded-xl p-4 mb-8 border border-white/5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-lg font-bold text-indigo-300">{project.pages?.length || 0}</div><div className="text-xs text-slate-500">Pages</div></div>
              <div><div className="text-lg font-bold text-purple-300">{Object.values(project.features || {}).filter(Boolean).length}</div><div className="text-xs text-slate-500">Features</div></div>
              <div><div className="text-sm font-bold text-cyan-300">{project.timeline}</div><div className="text-xs text-slate-500">Timeline</div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3">
            <Link href="/profile" className="flex-1">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full btn-primary flex items-center justify-center space-x-2">
                <User size={16} /><span>View My Projects</span><ArrowRight size={14} />
              </motion.button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full btn-secondary flex items-center justify-center space-x-2">
                <LayoutDashboard size={16} /><span>New Project</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}