"use client";

import React, { useState } from 'react';
import { ChevronRight, Mail, BookOpen, Users, FileText, Search, Calendar, User, ArrowLeft, Plus, Trash2, Eye } from 'lucide-react';

// Mock data structure
const initialBlogs = [
  {
    id: 1,
    title: "Algorithmic Insurance and Resource Pooling: The Missing Piece in SEBI's AI-ML Governance Framework",
    author: "Arjun Sharma",
    authorEmail: "arjun@example.com",
    date: "2024-12-15",
    category: "Securities Law",
    tags: ["SEBI", "AI", "Fintech"],
    excerpt: "An analysis of SEBI's recent AI-ML governance framework and its implications for algorithmic trading...",
    content: `<h2>Introduction</h2><p>The Securities and Exchange Board of India (SEBI) recently released its consultation paper on the use of Artificial Intelligence and Machine Learning in the securities market...</p><h2>Key Findings</h2><p>Our research indicates several gaps in the current framework...</p>`,
    published: true
  },
  {
    id: 2,
    title: "Corporate Governance Reforms in 2024: A Critical Analysis",
    author: "Priya Mehta",
    authorEmail: "priya@example.com",
    date: "2024-11-28",
    category: "Corporate Law",
    tags: ["Corporate Governance", "MCA", "Compliance"],
    excerpt: "Examining the recent amendments to corporate governance norms and their impact on listed companies...",
    content: `<h2>Overview</h2><p>The Ministry of Corporate Affairs introduced significant changes...</p>`,
    published: true
  }
];

export default function LegalBlogPlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin dashboard state
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    authorEmail: '',
    category: '',
    tags: '',
    excerpt: '',
    content: ''
  });

  const filteredBlogs = blogs.filter(blog => 
    blog.published && 
    (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
     blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handlePublishBlog = () => {
    if (!newBlog.title || !newBlog.author || !newBlog.content) {
      alert('Please fill in required fields: Title, Author, and Content');
      return;
    }

    const blog = {
      id: blogs.length + 1,
      ...newBlog,
      tags: newBlog.tags.split(',').map(t => t.trim()),
      date: new Date().toISOString().split('T')[0],
      published: true
    };

    setBlogs([blog, ...blogs]);
    setNewBlog({
      title: '',
      author: '',
      authorEmail: '',
      category: '',
      tags: '',
      excerpt: '',
      content: ''
    });
    alert('Blog published successfully!');
  };

  const handleDeleteBlog = (id: number) => {
    if (confirm('Are you sure you want to remove this blog?')) {
      setBlogs(blogs.filter(b => b.id !== id));
      setSelectedBlog(null);
    }
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="font-bold text-xl">Legal Insights</span>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-blue-400 transition ${currentPage === 'home' ? 'text-blue-400' : ''}`}>Home</button>
            <button onClick={() => setCurrentPage('blogs')} className={`hover:text-blue-400 transition ${currentPage === 'blogs' ? 'text-blue-400' : ''}`}>Blogs</button>
            <button onClick={() => setCurrentPage('advisory')} className={`hover:text-blue-400 transition ${currentPage === 'advisory' ? 'text-blue-400' : ''}`}>Advisory</button>
            <button onClick={() => setCurrentPage('guidelines')} className={`hover:text-blue-400 transition ${currentPage === 'guidelines' ? 'text-blue-400' : ''}`}>Submit</button>
            <button onClick={() => setIsAdmin(!isAdmin)} className={`px-3 py-1 rounded ${isAdmin ? 'bg-blue-600' : 'bg-slate-700'} hover:bg-blue-500 transition`}>
              {isAdmin ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Legal Insights & Commentary
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A platform for legal scholars, practitioners, and researchers to share insights on corporate law, securities regulation, and emerging legal frameworks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Contributors</h3>
            <p className="text-slate-600">Insights from leading legal minds across India and beyond</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <FileText className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">In-Depth Analysis</h3>
            <p className="text-slate-600">Comprehensive commentary on recent legal developments</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Open Access</h3>
            <p className="text-slate-600">Free access to quality legal scholarship and research</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Recent Publications</h2>
          <div className="space-y-4">
            {blogs.slice(0, 3).map(blog => (
              <div key={blog.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 hover:text-blue-600 cursor-pointer"
                    onClick={() => { setSelectedBlog(blog); setCurrentPage('blog-detail'); }}>
                  {blog.title}
                </h3>
                <div className="flex items-center text-sm text-slate-600 space-x-4 mb-2">
                  <span className="flex items-center"><User className="w-4 h-4 mr-1" />{blog.author}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{blog.date}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.category}</span>
                </div>
                <p className="text-slate-700">{blog.excerpt}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setCurrentPage('blogs')} 
                  className="mt-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold">
            View All Blogs <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  // Blogs Page
  const BlogsPage = () => (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">All Blog Posts</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, or tags..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{blog.category}</span>
                <span className="text-sm text-slate-500">{blog.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 cursor-pointer"
                  onClick={() => { setSelectedBlog(blog); setCurrentPage('blog-detail'); }}>
                {blog.title}
              </h2>
              <p className="text-slate-700 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-600">
                  <User className="w-4 h-4 mr-1" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Blog Detail Page
  const BlogDetailPage = () => {
    if (!selectedBlog) return null;
    
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setCurrentPage('blogs')} 
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />Back to Blogs
          </button>
          
          <article className="bg-white rounded-lg shadow-lg p-8">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{selectedBlog.category}</span>
            <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-6">{selectedBlog.title}</h1>
            
            <div className="flex items-center space-x-6 pb-6 mb-6 border-b">
              <div className="flex items-center text-slate-700">
                <User className="w-5 h-5 mr-2" />
                <div>
                  <div className="font-semibold">{selectedBlog.author}</div>
                  <div className="text-sm text-slate-500">{selectedBlog.authorEmail}</div>
                </div>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-2" />
                {selectedBlog.date}
              </div>
            </div>

            <div className="prose max-w-none text-slate-800 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {selectedBlog.tags.map((tag: string) => (
                  <span key={tag} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>

            {isAdmin && (
              <div className="mt-6 pt-6 border-t">
                <button onClick={() => handleDeleteBlog(selectedBlog.id)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  <Trash2 className="w-4 h-4 mr-2" />Remove Blog
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  };

  // Advisory Page
  const AdvisoryPage = () => (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Advisory Board</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-slate-700 mb-6">
            Our platform is guided by leading experts in corporate law, securities regulation, and legal academia.
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold text-slate-900">Editorial Standards</h3>
              <p className="text-slate-700 mt-2">All submissions undergo rigorous review to ensure academic quality and practical relevance.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold text-slate-900">Peer Review Process</h3>
              <p className="text-slate-700 mt-2">Each article is evaluated by subject matter experts before publication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Submission Guidelines Page
  const GuidelinesPage = () => (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Submission Guidelines</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <div className="flex items-center mb-3">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-slate-900">Submit Your Blog</h2>
            </div>
            <p className="text-lg text-slate-700 mb-3">
              Send your submissions to: <a href="mailto:submissions@legalinsights.com" className="text-blue-600 font-semibold hover:underline">submissions@legalinsights.com</a>
            </p>
            <p className="text-slate-600">All review and publication processes are conducted via email.</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Content Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Original, unpublished work on corporate law, securities regulation, or related topics</li>
                <li>Length: 1,500-4,000 words</li>
                <li>Proper citations and references required</li>
                <li>Author bio (50-100 words) and professional email</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Submission Format</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Word document (.docx) or PDF format</li>
                <li>Times New Roman, 12pt font, double-spaced</li>
                <li>Include title, author name, and contact information</li>
                <li>Suggested category and 3-5 keywords/tags</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Review Process</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Initial review within 7-10 business days</li>
                <li>Editorial team reviews for quality and relevance</li>
                <li>Authors notified via email about acceptance/revision/rejection</li>
                <li>No amendments made without author consent</li>
                <li>Full credit given to authors upon publication</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>We do not amend submitted content - only publish or remove</li>
                <li>Authors retain copyright to their work</li>
                <li>Platform reserves right to remove content at any time</li>
                <li>No publication fees required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Publish New Blog */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2 text-blue-600" />
              Publish New Blog
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Blog Title *"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.title}
                onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
              />
              <input
                type="text"
                placeholder="Author Name *"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.author}
                onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
              />
              <input
                type="email"
                placeholder="Author Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.authorEmail}
                onChange={(e) => setNewBlog({...newBlog, authorEmail: e.target.value})}
              />
              <input
                type="text"
                placeholder="Category (e.g., Corporate Law)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.category}
                onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.tags}
                onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
              />
              <textarea
                placeholder="Excerpt"
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
              />
              <textarea
                placeholder="Full Content (HTML supported) *"
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={newBlog.content}
                onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
              />
              <button 
                onClick={handlePublishBlog}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Publish Blog
              </button>
            </div>
          </div>

          {/* Manage Existing Blogs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              Manage Blogs
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {blogs.map(blog => (
                <div key={blog.id} className="border rounded-lg p-4 hover:bg-slate-50">
                  <h3 className="font-semibold text-slate-900 mb-1">{blog.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">by {blog.author} • {blog.date}</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => { setSelectedBlog(blog); setCurrentPage('blog-detail'); }}
                      className="flex items-center text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                      <Eye className="w-4 h-4 mr-1" />View
                    </button>
                    <button 
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="flex items-center text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                      <Trash2 className="w-4 h-4 mr-1" />Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      {isAdmin ? <AdminDashboard /> : (
        <>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'blogs' && <BlogsPage />}
          {currentPage === 'blog-detail' && <BlogDetailPage />}
          {currentPage === 'advisory' && <AdvisoryPage />}
          {currentPage === 'guidelines' && <GuidelinesPage />}
        </>
      )}
    </div>
  );
}