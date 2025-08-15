"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Mail, ArrowLeft, UserCircle, Send } from 'lucide-react';

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (email.trim()) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(15, 23, 42, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Send className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Check your email</h2>
          <p className="text-slate-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSubmitted(false)}
            className="text-slate-600 hover:text-slate-800 transition-colors flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to reset
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Reset Password</h1>
          <p className="text-slate-600">
            Enter your email and we'll send you a reset link
          </p>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                id="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all duration-200 bg-gray-50"
                required
              />
            </div>
          </motion.div>

          <motion.button
            variants={buttonHoverVariants as any}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSubmit}
            className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium flex items-center justify-center transition-all duration-200"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Reset Link
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-slate-600">
            Remember your password?{' '}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-slate-800 font-medium hover:underline"
            >
              Sign in
            </motion.a>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mt-6">
          <Link href="/" className="text-slate-600 hover:text-slate-800 transition-colors flex items-center cursor-pointer">
            <motion.span whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasswordResetPage;