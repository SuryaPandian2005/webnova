'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin, MessageSquare, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    toast.error('Please fill in all required fields');
    return;
  }

  setSending(true);

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    toast.success("Message sent! We'll reply within 24 hours. 🎉");

    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

  } catch (error) {
    console.error(error);
    toast.error('Failed to send message');
  }

  setSending(false);
};

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative grid-pattern">
      <div className="blob blob-cyan w-96 h-96 -right-48 top-20 opacity-10" />
      <div className="blob blob-indigo w-80 h-80 -left-40 bottom-0 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge badge-review mb-4 inline-flex"><MessageSquare className="w-3 h-3" /> Get In Touch</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Build Something <span className="gradient-text">Together</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <div className="glass-card">
              <h3 className="font-semibold text-white mb-5">Contact Information</h3>
              {[
                { icon: Mail, label: 'Email', value: 'suryaoff2005@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 63824 76181' },
                { icon: MapPin, label: 'Location', value: 'Thanthonimalai,Emoor,Karur' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-sm text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card">
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { Icon: Github, label: 'GitHub', href: '#' },
                  { Icon: Twitter, label: 'Twitter', href: '#' },
                  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="flex-1 glass p-3 rounded-xl border border-white/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all text-center text-gray-400 text-xs">
                    <Icon className="w-5 h-5 mx-auto mb-1.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white">We're online</span>
              </div>
              <p className="text-xs text-gray-400">Average response time: <strong className="text-white">under 2 hours</strong></p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card space-y-5">
              <h3 className="font-semibold text-white text-lg mb-2">Send a Message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="What's this about?" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project, questions, or anything else..." rows={6} className="input-field resize-none" />
              </div>
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="btn-primary w-full text-white flex items-center justify-center gap-2 py-3.5 disabled:opacity-70">
                {sending ? <><Loader className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}