import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { API_BASE_URL } from '../config';
import AdPlaceholder from '../components/AdPlaceholder';

const BlogList = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch + Merge API and local posts for high resilience
  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = [...data];
          blogPosts.forEach(localPost => {
            if (!merged.some(p => p.slug === localPost.slug || p._id === localPost.id)) {
              merged.push(localPost);
            }
          });
          setPosts(merged);
        } else {
          setPosts(blogPosts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('API error, falling back to local posts database:', err);
        setPosts(blogPosts);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                          post.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20">
      {/* Header Banner */}
      <div className="text-center mb-16 max-w-2xl mx-auto px-4">
        <span className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full inline-block mb-4">
          Arsip Pembelajaran
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none">
          Indeks <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">Artikel</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          Temukan ratusan tutorial praktis seputar office, coding, desain vektor CorelDRAW, hingga ulasan teknologi terkini.
        </p>
      </div>

      {/* Ad slot below header */}
      <AdPlaceholder label="LEADERBOARD BANNER AD" className="!my-6" />

      {/* Search and Filters */}
      <div className="mb-12 max-w-4xl mx-auto px-4 space-y-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Cari artikel berdasarkan judul, kategori, atau bahasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-emerald-500/10 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-12 shadow-lg shadow-black/5 dark:text-white"
          />
          <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors"></i>
        </div>

        {/* Category horizontal filters */}
        <div className="flex flex-wrap gap-2 justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                  : 'bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'All' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400">
          <i className="fas fa-spinner animate-spin text-3xl text-emerald-500 mb-4 block"></i>
          Menghubungkan ke database artikel...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto clay-panel">
          <i className="fas fa-search-minus text-4xl text-slate-400 mb-4 block"></i>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tidak Ada Hasil</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Maaf, kami tidak menemukan artikel yang sesuai dengan kata kunci "{search}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {filteredPosts.map((post) => (
            <article key={post.slug || post._id || post.id} className="group clay-card-interactive bg-white/50 dark:bg-slate-900/40 border border-emerald-500/5 hover:border-emerald-500/20 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-t-[1.5rem] border-b border-black/5 dark:border-white/5">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">{formatDate(post.date)}</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-emerald-500 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug || post._id || post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Oleh: {post.author || 'Roynaldi'}</span>
                <Link 
                  to={`/blog/${post.slug || post._id || post.id}`}
                  className="text-xs font-black text-emerald-500 dark:text-amber-400 hover:text-emerald-600 dark:hover:text-amber-300 flex items-center gap-1 group animate-pulse"
                >
                  Baca Selengkapnya <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Ad slot below grid */}
      <AdPlaceholder label="BOTTOM BANNER AD" className="mt-12" />
    </div>
  );
};

export default BlogList;
