// Replace with new password change page
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function PasswordChangePage() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');
		setError('');
		setTimeout(() => {
			setLoading(false);
			if (currentPassword === 'password' && newPassword.length >= 8) {
				setMessage('Password changed successfully!');
			} else {
				setError('Current password is incorrect or new password is too short.');
			}
		}, 1200);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
			<motion.div className="w-full max-w-xs py-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
				<div className="border border-gray-200 rounded-2xl p-8 shadow-lg bg-white backdrop-blur-sm">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
							<Lock className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-2xl font-semibold text-gray-900">Change Password</h1>
						<p className="text-gray-600 mt-2">Update your account password</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
							<input
								id="currentPassword"
								name="currentPassword"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter current password"
								className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-black"
								required
								value={currentPassword}
								onChange={e => setCurrentPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
							<div className="relative">
								<input
									id="newPassword"
									name="newPassword"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter new password"
									className="w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-black"
									required
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
								</button>
							</div>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
							disabled={loading}
						>
							{loading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
									<span>Changing...</span>
								</>
							) : (
								<>
									<span>Change password</span>
									<ArrowRight className="w-5 h-5" />
								</>
							)}
						</button>
						{message && (
							<div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 py-3 px-4 rounded-xl border border-green-200">
								<CheckCircle className="w-4 h-4" />
								<span>{message}</span>
							</div>
						)}
						{error && (
							<div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 py-3 px-4 rounded-xl border border-red-200">
								<AlertCircle className="w-4 h-4" />
								<span>{error}</span>
							</div>
						)}
						<a href="/dashboard" className="block text-center text-sm text-gray-500 hover:text-gray-700 hover:underline mt-4">Back to Dashboard</a>
					</form>
				</div>
			</motion.div>
		</div>
	);
}
