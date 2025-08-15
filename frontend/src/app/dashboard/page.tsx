import React from "react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6">Member Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Your Blogs</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sample Blog 1 <a href="/blog/edit" className="text-blue-600 ml-2">Edit</a></li>
            <li>Sample Blog 2 <a href="/blog/edit" className="text-blue-600 ml-2">Edit</a></li>
          </ul>
          <a href="/blog/create" className="btn btn-primary mt-4">Create New Blog</a>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Account</h3>
          <a href="/auth/password-change" className="btn btn-secondary">Change Password</a>
        </div>
      </div>
    </div>
  );
}
