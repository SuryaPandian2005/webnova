'use client';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const links = {
    Platform: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Templates', href: '/templates' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };
  const socials = [
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Mail, href: '#', label: 'Email' },
  ];
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 overflow-hidden">
      <div className="blob blob-indigo w-96 h-96 -left-48 -bottom-48 opacity-10" />
      <div className="blob blob-purple w-72 h-72 -right-36 top-0 opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">TechKidyy</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              AI-powered website builder platform for modern businesses.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} TechKidyy. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with soul</p>
        </div>
      </div>
    </footer>
  );
}