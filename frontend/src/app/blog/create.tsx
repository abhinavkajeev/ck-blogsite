import React from "react";

export default function BlogCreatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Blog</h2>
        <input type="text" placeholder="Title" className="input input-bordered w-full" required />
        <textarea placeholder="Content" className="textarea textarea-bordered w-full min-h-[200px]" required />
        <button type="submit" className="btn btn-primary w-full">Create</button>
      </form>
    </div>
  );
}
