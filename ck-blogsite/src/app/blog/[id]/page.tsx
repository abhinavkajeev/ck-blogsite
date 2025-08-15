import React from "react";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white p-8 rounded shadow max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-4">Blog Title {params.id}</h2>
        <p className="text-gray-700 mb-6">This is the detailed content of the blog post with ID {params.id}.</p>
        <a href="/blog" className="btn btn-secondary">Back to Blog List</a>
      </div>
    </div>
  );
}
