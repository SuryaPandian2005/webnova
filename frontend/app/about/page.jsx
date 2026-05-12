'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Target, Award, Rocket, ArrowRight, Code2, Heart, Zap } from 'lucide-react';

const TEAM = [
  { name: 'Surya', role: 'Founder & CEO', avatar: 'S', bio: 'Full-stack architect with 1 years building SaaS platforms.' },
  { name: 'Sarah Kim', role: 'Lead Designer', avatar: 'SK', bio: 'UI/UX specialist obsessed with pixel-perfect, accessible design.' },
  { name: 'Marcus Chen', role: 'CTO', avatar: 'MC', bio: 'Cloud infrastructure expert scaling systems to millions of users.' },
  { name: 'Priya Patel', role: 'AI Engineer', avatar: 'PP', bio: 'ML engineer building the intelligence behind our AI suggestions.' },
];

const VALUES = [
  { icon: Code2, title: 'Quality Code', desc: 'Every line we ship follows best practices, clean architecture, and is built to scale.' },
  { icon: Heart, title: 'Client-First', desc: 'Your success is our success. We listen, adapt, and go beyond what\'s asked.' },
  { icon: Rocket, title: 'Move Fast', desc: 'We believe in rapid iteration, quick delivery, and continuous improvement.' },
  { icon: Award, title: 'Excellence', desc: 'We don\'t cut corners. Every project gets our full attention and expertise.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative grid-pattern">
      <div className="blob blob-indigo w-96 h-96 -left-48 top-20 opacity-10" />
      <div className="blob blob-purple w-80 h-80 -right-40 bottom-0 opacity-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <span className="badge badge-review mb-4 inline-flex"><Target className="w-3 h-3" /> Our Mission</span>
          <h1 className="text-5xl font-bold text-white mb-6">
            We Build Websites That <span className="gradient-text">Matter</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            We are dedicated to helping businesses establish a powerful online presence through modern, high-performance websites designed with creativity, functionality, and user experience in mind.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: '2026', label: 'Founded', icon: '📅' },
            { value: '1k', label: 'Clients Served', icon: '👥' },
            { value: '2k+', label: 'Websites Built', icon: '🌐' },
            { value: '1', label: 'Countries', icon: '🌍' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our Core Values</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card card-lift text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Meet the <span className="gradient-text">Team</span></h2>
            <p className="text-gray-400">The people behind TechKidyy</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, avatar, bio }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card card-lift text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white">
                  {avatar}
                </div>
                <h3 className="font-semibold text-white mb-1">{name}</h3>
                <p className="text-indigo-400 text-xs mb-3">{role}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card border border-indigo-500/20 text-center p-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Start?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">Join thousands of businesses who chose TechKidyy to build their online presence.</p>
          <Link href="/register" className="btn-primary text-white inline-flex items-center gap-2">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}