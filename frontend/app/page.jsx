'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Zap, ArrowRight, Star, Check, Globe, Sparkles, Code2,
  Smartphone, Palette, Rocket, Users, TrendingUp, Play, ChevronRight
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const WEBSITE_TYPES = [
  { label: 'Portfolio', emoji: '🎨', color: 'from-purple-500 to-indigo-600' },
  { label: 'Ecommerce', emoji: '🛒', color: 'from-green-500 to-emerald-600' },
  { label: 'Restaurant', emoji: '🍽️', color: 'from-orange-500 to-red-600' },
  { label: 'SaaS', emoji: '⚡', color: 'from-blue-500 to-cyan-600' },
  { label: 'Real Estate', emoji: '🏠', color: 'from-teal-500 to-green-600' },
  { label: 'Agency', emoji: '🚀', color: 'from-pink-500 to-rose-600' },
];

const FEATURES = [
  { icon: Sparkles, title: 'Modern Solutions', description: 'Professional website solutions tailored for businesses and brands', color: 'text-purple-400' },
  { icon: Code2, title: 'Clean Code', description: 'Production-ready code with modern architecture and best practices', color: 'text-blue-400' },
  { icon: Smartphone, title: 'Fully Responsive', description: 'Pixel-perfect on every screen size from mobile to 4K displays', color: 'text-cyan-400' },
  { icon: Palette, title: 'Custom Design', description: 'Unlimited color themes, fonts, and layout configurations', color: 'text-pink-400' },
  { icon: Rocket, title: 'Fast Delivery', description: 'Get your website in days not months with our agile process', color: 'text-amber-400' },
  { icon: Globe, title: 'SEO Optimized', description: 'Built-in meta tags, sitemap, OpenGraph and performance tuning', color: 'text-emerald-400' },
];

const STATS = [
  { value: '2k+', label: 'Websites Built', icon: Globe },
  { value: '1K+', label: 'Happy Clients', icon: Users },
  { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
  { value: '4.9★', label: 'Average Rating', icon: Star },
];

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Founder, DesignFlow', avatar: 'SC', text: 'WebNova transformed how I present my work. The portfolio template is stunning and the team delivered exactly what I envisioned.', rating: 5 },
  { name: 'Marcus Johnson', role: 'CEO, TechVentures', avatar: 'MJ', text: 'Our SaaS landing page conversion rate jumped 180% after switching to . The analytics integration is seamless.', rating: 5 },
  { name: 'Priya Sharma', role: 'Restaurant Owner', avatar: 'PS', text: 'The restaurant template had our online orders up 3x in the first week. Worth every penny and the support is incredible.', rating: 5 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { isAuthenticated } = useAuthStore();
  const [hoveredType, setHoveredType] = useState(null);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center grid-pattern pt-20">
        {/* Ambient Blobs */}
        <div className="blob blob-indigo w-[600px] h-[600px] -left-64 top-20" />
        <div className="blob blob-purple w-[500px] h-[500px] -right-48 top-32" />
        <div className="blob blob-cyan w-[400px] h-[400px] left-1/3 -bottom-48 opacity-10" />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/40"
            style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-indigo-500/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">Professional Website Development Platform</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            Build Your Professional
            <br />
            <span className="text-gradient-animated">Digital Presence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From portfolio to ecommerce, SaaS to restaurant — describe what you need and our professional development team brings your vision to life.
             Production-ready, fully responsive websites built for modern businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href={isAuthenticated ? '/dashboard' : '/register'}
              className="btn-primary text-white flex items-center gap-2 text-base"
            >
              <Zap className="w-5 h-5" />
              {isAuthenticated ? 'Open Dashboard' : 'Start Building Free'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/templates" className="btn-secondary flex items-center gap-2 text-base text-gray-300">
              <Play className="w-4 h-4" />
              Browse Templates
            </Link>
          </motion.div>

          {/* Type Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {WEBSITE_TYPES.map((type, i) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                onHoverStart={() => setHoveredType(type.label)}
                onHoverEnd={() => setHoveredType(null)}
                className={`glass px-4 py-2 rounded-full border border-white/10 cursor-pointer transition-all duration-300 ${
                  hoveredType === type.label ? 'border-indigo-500/50 bg-indigo-500/10' : ''
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm">{type.emoji} {type.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-center justify-center"
          >
            <div className="w-1 h-2 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <motion.div key={label} variants={fadeInUp} className="glass-card card-lift text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 relative">
        <div className="blob blob-purple w-[500px] h-[500px] -right-64 top-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="badge badge-review mb-4">
              <Sparkles className="w-3 h-3" /> Platform Features
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Launch Fast</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built with modern technologies and professional development standards, we handle everything from design to deployment.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map(({ icon: Icon, title, description, color }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="glass-card group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl bg-current/10 flex items-center justify-center mb-4 ${color} bg-opacity-10`}
                  style={{ backgroundColor: 'rgba(99,102,241,0.08)' }}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative">
        <div className="blob blob-indigo w-[400px] h-[400px] -left-48 bottom-0 opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Launch in <span className="gradient-text">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-indigo-500/30 to-transparent hidden lg:block" />
            <div className="space-y-12">
              {[
                { step: '01', title: 'Choose Your Website Type', desc: 'Pick from 11 categories: Portfolio, Ecommerce, SaaS, Restaurant, and more. Each type has specialized templates and pre-built features.', icon: Palette },
                { step: '02', title: 'Customize Requirements', desc: 'Use our 5-step wizard to configure color themes, pages, features (auth, payments, SEO), tech stack, budget and timeline.', icon: Code2 },
                { step: '03', title: 'We Build & Deliver', desc: 'Our team reviews your request, provides a quote, and delivers production-ready code in your preferred tech stack.', icon: Rocket },
              ].map(({ step, title, desc, icon: Icon }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex items-center gap-8 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="glass-card flex-1 group hover:border-indigo-500/30 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-indigo-400 font-semibold mb-1">Step {step}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center flex-shrink-0 z-10 shadow-xl shadow-indigo-500/30 text-2xl font-bold text-white">
                    {i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-gray-400">Real results from real businesses</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map(({ name, role, avatar, text, rating }) => (
              <motion.div key={name} variants={fadeInUp} className="glass-card card-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="blob blob-indigo w-[500px] h-[500px] left-1/4 top-0 opacity-15" />
        <div className="blob blob-purple w-[400px] h-[400px] right-1/4 bottom-0 opacity-15" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-card border border-indigo-500/20 p-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Build?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join 12,000+ businesses who launched with WebNova.
              Start your project today — free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-primary text-white flex items-center justify-center gap-2 text-base"
              >
                <Zap className="w-5 h-5" />
                {isAuthenticated ? 'Open Dashboard' : 'Create Free Account'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/templates" className="btn-secondary flex items-center justify-center gap-2 text-base text-gray-300">
                Browse Templates <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              {['No credit card required', 'Free to get started', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}