import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const BlogList = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setPosts(data);
        } else {
          setPosts([
            {
              _id: '1',
              title: 'Membangun Portfolio dengan React',
              excerpt: 'Panduan lengkap membuat portfolio modern menggunakan React dan Tailwind CSS...',
              date: '2026-05-15',
              category: 'Development',
              image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
            },
            {
              _id: '2',
              title: 'Tips Deploy ke VPS',
              excerpt: 'Langkah demi langkah melakukan deployment aplikasi Node.js ke Virtual Private Server...',
              date: '2026-05-18',
              category: 'DevOps',
              image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&auto=format&fit=crop&q=60'
            }
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
          My <span className="text-blue-500">Blog</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Explore articles on web development, design systems, and my personal experiences in the tech industry.
        </p>
      </div>

      <div className="mb-12 max-w-md mx-auto">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article key={post._id || post.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug || post._id || post.id}`} 
                className="clay-btn-primary !w-full text-center"
              >
                Read Article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
