import React from "react";

export default function PasswordChangePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        <input type="password" placeholder="Current Password" className="input input-bordered w-full" required />
        <input type="password" placeholder="New Password" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary w-full">Change Password</button>
      </form>
    </div>
  );
}
