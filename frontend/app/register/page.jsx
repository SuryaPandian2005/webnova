'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const PasswordRequirement = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 text-xs transition-colors ${met ? 'text-emerald-400' : 'text-gray-500'}`}>
    {met ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    {label}
  </div>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const pwd = watch('password', '');
  const requirements = [
    { met: pwd.length >= 8, label: 'At least 8 characters' },
    { met: /[A-Z]/.test(pwd), label: 'One uppercase letter' },
    { met: /[a-z]/.test(pwd), label: 'One lowercase letter' },
    { met: /[0-9]/.test(pwd), label: 'One number' },
  ];
  const strength = requirements.filter(r => r.met).length;
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.name, data.email, data.password);
      toast.success(`Account created! Welcome, ${result.user.name.split(' ')[0]}! 🎉`);
      router.push(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative grid-pattern">
      <div className="blob blob-purple w-96 h-96 -left-48 top-20 opacity-15" />
      <div className="blob blob-cyan w-80 h-80 -right-40 bottom-20 opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card border border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
            <p className="text-gray-400 text-sm">Start building your dream website today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input {...register('name')} placeholder="John Smith" className="input-field pl-10" />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input {...register('email')} type="email" placeholder="you@company.com" className="input-field pl-10" />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}

              {/* Strength Meter */}
              {pwd && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-gray-700'}`} />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">Strength: <span className={strength > 0 ? `text-${['red', 'orange', 'yellow', 'emerald'][strength - 1]}-400` : ''}>{strengthLabels[strength - 1] || 'Very Weak'}</span></div>
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    {requirements.map((req) => <PasswordRequirement key={req.label} {...req} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input {...register('confirmPassword')} type={showConfirm ? 'text' : 'password'} placeholder="Repeat your password" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="btn-primary w-full text-white flex items-center justify-center gap-2 py-3.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Loader className="w-4 h-4 animate-spin" /> Creating account...</> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-4">
            By creating an account you agree to our Terms & Privacy Policy
          </p>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}