'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface FormState {
  loading: boolean;
  error: string;
  success: string;
  shake: boolean;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: '',
    success: '',
    shake: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    setFormState(prev => ({
      ...prev,
      loading: true,
      error: '',
      success: '',
      shake: false
    }));
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        setFormState(prev => ({
          ...prev,
          loading: false,
          success: 'Login successful! Redirecting to dashboard...',
          error: ''
        }));
        
        // In a real Next.js app, use router.push('/dashboard')
        // router.push('/dashboard');
      } else {
        setFormState(prev => ({
          ...prev,
          loading: false,
          error: 'Invalid email or password.',
          success: '',
          shake: true
        }));
        
        setTimeout(() => {
          setFormState(prev => ({ ...prev, shake: false }));
        }, 500);
      }
    }, 1200);
  };

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut' 
      }
    }
  };

  const shakeVariants: Variants = {
    shake: {
      x: [-4, 4, -4, 4, 0],
      transition: { 
        duration: 0.5 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="border border-gray-200 rounded-2xl p-8 shadow-lg bg-white backdrop-blur-sm"
          variants={formState.shake ? shakeVariants : itemVariants}
          animate={formState.shake ? "shake" : "visible"}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to CK Blogsite</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email address
              </label>
              <div className="relative">
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02 }}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <motion.input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02 }}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              disabled={formState.loading}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formState.loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Error/Success Messages */}
            {formState.error && (
              <motion.div
                className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 py-3 px-4 rounded-xl border border-red-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-4 h-4" />
                <span>{formState.error}</span>
              </motion.div>
            )}
            
            {formState.success && (
              <motion.div
                className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 py-3 px-4 rounded-xl border border-green-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{formState.success}</span>
              </motion.div>
            )}

            {/* Links */}
            <motion.div
              className="text-center space-y-3 pt-4"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a
                  href="/auth/signup"
                  className="text-gray-900 font-medium hover:underline transition-all duration-200 hover:text-gray-700"
                >
                  Create account
                </a>
              </p>
              <p>
                <a
                  href="/auth/password-reset"
                  className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-all duration-200"
                >
                  Forgot your password?
                </a>
              </p>
              <a
                href="/"
                className="inline-block mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                ← Back to Home
              </a>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}