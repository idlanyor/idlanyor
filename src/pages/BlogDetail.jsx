import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) {
          setPost(data);
        } else {
          // Fallback if not found
          setPost({
            id: id,
            title: 'Membangun Portfolio dengan React',
            content: `
              <p>Portfolio adalah salah satu aset terpenting bagi seorang developer. Di era digital saat ini, memiliki ruang sendiri untuk menampilkan karya Anda sangatlah krusial.</p>
              <h2>Kenapa React?</h2>
              <p>React menawarkan komponen yang reusable, ekosistem yang luas, dan performa yang optimal untuk aplikasi web modern. Dengan bantuan Tailwind CSS, kita bisa membangun UI yang cantik dengan sangat cepat.</p>
              <blockquote>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</blockquote>
              <h2>Langkah-langkah Implementasi</h2>
              <ol>
                <li>Inisialisasi project dengan Vite</li>
                <li>Instalasi Tailwind CSS</li>
                <li>Membuat struktur komponen</li>
                <li>Integrasi animasi dengan AOS atau Framer Motion</li>
              </ol>
              <p>Dalam tutorial ini, kita akan fokus pada bagaimana mengelola state tema (dark/light) dan membuat animasi background yang dinamis.</p>
            `,
            date: '2026-05-15',
            category: 'Development',
            author: 'Roy',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80'
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) return <div className="pt-32 text-center text-white">Loading...</div>;
  if (!post) return <div className="pt-32 text-center text-white">Post not found.</div>;

  return (
    <div className="pt-32 pb-20">
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors mb-12 font-bold"
      >
        <i className="fas fa-arrow-left"></i> Back to Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 text-xs font-black uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            <span className="text-slate-400 text-sm">{formatDate(post.date)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              R
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-bold">{post.author}</p>
              <p className="text-slate-500 text-xs">Software Developer</p>
            </div>
          </div>
        </header>

        <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-16 border border-black/5 dark:border-white/5">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-slate-600 dark:prose-p:text-slate-400
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          prose-li:text-slate-600 dark:prose-li:text-slate-400
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogDetail;
