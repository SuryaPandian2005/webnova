'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, User, LogOut, LayoutDashboard, Shield, ChevronDown } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setUserMenuOpen(false); }, [pathname]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/templates', label: 'Templates' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-lg shadow-black/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text">WebNova</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 glass px-3 py-2 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-200"
                >
                  <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full" />
                  <span className="text-sm font-medium text-gray-200">{user?.name?.split(' ')[0]}</span>
                  {user?.role === 'admin' && (
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 glass-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl shadow-black/30"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        {user?.role === 'admin' && (
                          <span className="badge badge-review mt-1.5">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        )}
                      </div>
                      <div className="p-2">
                        <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-300 hover:text-white">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm text-gray-300 hover:text-white">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        {user?.role === 'admin' && (
                          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-500/10 transition-colors text-sm text-amber-400">
                            <Shield className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-500/10 transition-colors text-sm text-red-400 mt-1"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn-secondary text-sm">Sign In</Link>
                <Link href="/register" className="btn-primary text-sm text-white">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass p-2 rounded-xl border border-white/10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass-dark rounded-2xl border border-white/10 mt-4 p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href) ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <>
                    <Link href="/dashboard" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link href="/admin" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors">
                        <Shield className="w-4 h-4 mr-2" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <div className="flex gap-2 pt-2">
                    <Link href="/login" className="flex-1 btn-secondary text-sm text-center">Sign In</Link>
                    <Link href="/register" className="flex-1 btn-primary text-sm text-center text-white">Get Started</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}