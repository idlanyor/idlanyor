import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { API_BASE_URL } from '../config';
import AdPlaceholder from '../components/AdPlaceholder';

const Home = ({ theme }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Fetch posts from API + Merge with local high-quality articles
  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // If API returns posts, merge them, putting local ones as fallback and ensuring uniqueness by slug
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
        console.warn('API error, falling back to rich local articles:', err);
        setPosts(blogPosts);
        setLoading(false);
      });
  }, []);

  // Reset pagination to page 1 on category or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get categories lists
  const categories = ['All', ...new Set(posts.map(p => p.category))];

  // Filtering
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Post is the first article (highest index or simply the first one in lists)
  const featuredPost = posts.find(p => p.category === 'Office' || p.category === 'Development') || posts[0];
  const otherPosts = filteredPosts.filter(p => p.slug !== featuredPost?.slug);

  // Pagination computations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = otherPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(otherPosts.length / postsPerPage);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-20 space-y-12 sm:space-y-16">
      
      {/* 1. Blog Hero Header branding idlanyor-web & tagline */}
      <section className="relative min-h-[35vh] sm:min-h-[40vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-8 sm:py-10 rounded-2xl sm:rounded-[3rem] bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 border border-emerald-500/10 dark:border-amber-400/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-3xl space-y-4 sm:space-y-6 relative z-10">
          <span className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase rounded-full">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-2"></span>
            Portal Edukasi Teknologi Terlengkap
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            idlanyor<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">-web</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-bold tracking-tight italic">
            "Learn anything, Share everything"
          </p>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Menyajikan panduan praktis pemrograman web, tips penggunaan Microsoft Word & Excel, tutorial CorelDRAW, kupas tuntas AI, hingga kiat produktivitas kerja harian.
          </p>

          {/* Quick search input */}
          <div className="max-w-md mx-auto pt-3 sm:pt-4 relative group">
            <input 
              type="text" 
              placeholder="Cari tutorial apa hari ini?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-white dark:bg-slate-900 border border-emerald-500/10 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-12 shadow-lg shadow-black/5 dark:text-white text-sm sm:text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-500 transition-colors">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Header Ad Slot */}
      <AdPlaceholder label="LEADERBOARD BANNER AD" className="!my-6" />

      {/* 2. Featured Post Section (Hanya tampil jika tidak sedang memfilter pencarian spesifik) */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span className="w-2.5 h-8 bg-gradient-to-b from-emerald-500 to-amber-400 rounded-full"></span>
            Artikel Pilihan Utama
          </h2>
          <div className="group clay-panel border border-emerald-500/10 hover:border-emerald-500/20 bg-white/40 dark:bg-slate-900/40 p-5 md:p-8 rounded-2xl sm:rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center transition-all duration-300">
            <div className="lg:col-span-7 aspect-[16/10] rounded-xl sm:rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-inner">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-amber-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">{formatDate(featuredPost.date)}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">
                <Link to={`/blog/${featuredPost.slug || featuredPost._id || featuredPost.id}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 sm:line-clamp-4 text-sm sm:text-base">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white font-bold text-xs">
                    R
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{featuredPost.author || 'Roynaldi'}</span>
                </div>
                <Link 
                  to={`/blog/${featuredPost.slug || featuredPost._id || featuredPost.id}`}
                  className="clay-btn-primary !bg-emerald-500 hover:!bg-emerald-600 !px-4 sm:!px-5 !py-2.5 sm:!py-3 !text-xs"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Content: Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 sm:pt-6">
        
        {/* Left Column: Articles Grid */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          
          {/* Category Tabs list */}
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-8 bg-amber-400 rounded-full"></span>
              {selectedCategory === 'All' ? 'Artikel Terbaru' : `Kategori: ${selectedCategory}`}
            </h2>
            <span className="text-xs font-bold text-slate-400">{filteredPosts.length} Artikel</span>
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mx-0.5 px-0.5">
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

          {loading ? (
            <div className="py-20 text-center text-slate-500 dark:text-slate-400">
              <i className="fas fa-spinner animate-spin text-3xl text-emerald-500 mb-4 block"></i>
              Memuat data artikel...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 text-center clay-panel">
              <i className="fas fa-search-minus text-4xl text-slate-400 mb-4 block"></i>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Artikel Tidak Ditemukan</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Coba cari dengan kata kunci lain atau pilih kategori lain.</p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentPosts.map((post) => (
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

                    <div className="px-6 pb-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold">Oleh: {post.author || 'Roynaldi'}</span>
                      <Link 
                        to={`/blog/${post.slug || post._id || post.id}`}
                        className="text-xs font-black text-emerald-500 dark:text-amber-400 hover:text-emerald-600 dark:hover:text-amber-300 flex items-center gap-1 group"
                      >
                        Baca Artikel <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Premium Claymorphic Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black text-xs transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-transparent text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-50'
                        : 'bg-white dark:bg-slate-900 border-emerald-500/10 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:text-amber-400 cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-95'
                    }`}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-300 cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border-emerald-500'
                          : 'bg-white dark:bg-slate-900 border border-emerald-500/10 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:text-amber-400 shadow-sm hover:-translate-y-0.5 active:scale-95'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black text-xs transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-transparent text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-50'
                        : 'bg-white dark:bg-slate-900 border-emerald-500/10 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:text-amber-400 cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-95'
                    }`}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Ad Slot Middle Grid */}
          <AdPlaceholder label="MID-GRID BANNER AD" />

        </div>

        {/* Right Column: Sidebar Widgets */}
        <aside className="lg:col-span-4 space-y-12">
          
          {/* Widget 1: Author Mini Profile */}
          <div className="clay-panel border-t-4 border-t-emerald-500 space-y-6 text-center">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Penulis & Editor
            </h3>
            
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden clay-card border border-emerald-500/20 mx-auto">
                <img 
                  src="https://avatars.githubusercontent.com/u/52753423" 
                  alt="Roynaldi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-md">Roynaldi</h4>
                <p className="text-xs text-slate-400 mt-1">Mahasiswa STMIK Widya Utama & Freelancer</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                Menulis artikel panduan teknologi, office, desainer grafis, dan fullstack development secara santai dan edukatif.
              </p>
              <Link 
                to="/about"
                className="clay-btn-secondary !w-full !py-2.5 !text-xs !bg-emerald-500/5 hover:!bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
              >
                Ketahui Lebih Banyak
              </Link>
            </div>
          </div>

          {/* Widget 2: Sidebar Ad Placeholder */}
          <AdPlaceholder label="SIDEBAR BANNER AD" className="!my-0" />

          {/* Widget 3: Popular Articles */}
          <div className="clay-panel space-y-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
              Artikel Populer
            </h3>
            <div className="space-y-4">
              {posts.slice(0, 4).map((post) => (
                <div key={post.slug || post._id || post.id} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-black/5 dark:border-white/5">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors">
                      <Link to={`/blog/${post.slug || post._id || post.id}`}>
                        {post.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 4: Newsletter Subscription */}
          <div className="clay-panel bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10 border border-emerald-500/20 dark:border-amber-400/10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-emerald-500/20">
              <i className="fas fa-paper-plane text-sm"></i>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Langganan Buletin
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dapatkan notifikasi tutorial teknologi dan office terbaru langsung ke kotak masuk email Anda setiap hari Senin.
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in-up">
                Berhasil terdaftar! Terima kasih.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Alamat email Anda..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-emerald-500/25 dark:border-white/5 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500 text-xs dark:text-white"
                />
                <button 
                  type="submit" 
                  className="clay-btn-primary !w-full !py-3 !text-xs !bg-gradient-to-r !from-emerald-500 !to-amber-400 hover:scale-[1.02] border-none font-black tracking-wider shadow-none"
                >
                  Daftar Sekarang
                </button>
              </form>
            )}
          </div>

        </aside>

      </div>
    </main>
  );
};

export default Home;
