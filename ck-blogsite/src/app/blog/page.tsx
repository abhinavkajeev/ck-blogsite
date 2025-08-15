'use client';
import React from "react";
import { motion, Variants } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'How to Build a Beautiful Blog with Next.js',
    summary: 'Learn how to create a modern, responsive blog using Next.js, TailwindCSS, and framer-motion for smooth animations.',
    author: 'Jane Doe',
    date: 'Aug 12, 2025',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: '10 Tips for Writing Engaging Blog Posts',
    summary: 'Discover proven techniques to make your blog posts more engaging and keep your readers coming back for more.',
    author: 'John Smith',
    date: 'Aug 10, 2025',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'The Power of Consistent Content Creation',
    summary: 'Consistency is key to growing your blog. Learn how to develop a content strategy that works for you.',
    author: 'Emily Chen',
    date: 'Aug 8, 2025',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 md:px-12">
      {/* Hero Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-12 h-12 text-gray-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Explore Inspiring Blogs</h1>
        <p className="text-lg text-gray-600">Discover the latest articles, tips, and stories from our creative community.</p>
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            variants={card}
            className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 group"
            whileHover={{ scale: 1.03 }}
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">{blog.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{blog.summary}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>
                <a
                  href={`/blog/${blog.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-800 transition-colors duration-200"
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}