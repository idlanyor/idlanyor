import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts?limit=2`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setPosts(data);
        } else {
          // Fallback if DB empty
          setPosts([
            {
              _id: '1',
              title: 'Membangun Portfolio dengan React',
              excerpt: 'Panduan lengkap membuat portfolio modern menggunakan React dan Tailwind CSS...',
              date: '2026-05-15',
              image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60'
            },
            {
              _id: '2',
              title: 'Tips Deploy ke VPS',
              excerpt: 'Langkah demi langkah melakukan deployment aplikasi Node.js ke Virtual Private Server...',
              date: '2026-05-18',
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

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Latest <span className="text-blue-500">Blog</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            Writings about technology, development, and my journey as a developer.
          </p>
        </div>
        <Link 
          to="/blog" 
          className="text-blue-500 font-bold hover:underline underline-offset-4 flex items-center gap-2"
        >
          View All Posts <i className="fas fa-arrow-right text-sm"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post._id || post.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{formatDate(post.date)}</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-4 group-hover:text-blue-500 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug || post._id || post.id}`} 
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group/link"
              >
                Read More 
                <span className="w-8 h-[2px] bg-blue-500 group-hover/link:w-12 transition-all duration-300"></span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
