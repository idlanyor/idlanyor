import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { API_BASE_URL } from '../config';
import AdPlaceholder from '../components/AdPlaceholder';
import { parseMarkdownToHtml } from '../utils/markdownParser';


const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);

  useEffect(() => {
    // 1. Check local database first for speed & offline capability
    const localPost = blogPosts.find(p => p.slug === id || p.id === id);

    fetch(`${API_BASE_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) {
          setPost(data);
        } else if (localPost) {
          setPost(localPost);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('API fetch error, using local article database:', err);
        if (localPost) {
          setPost(localPost);
        } else {
          setPost(null);
        }
        setLoading(false);
      });
  }, [id]);

  // Set up Next & Previous Articles
  useEffect(() => {
    if (post) {
      const currentIndex = blogPosts.findIndex(p => p.slug === post.slug || p.id === post.id);
      if (currentIndex !== -1) {
        setPrevPost(currentIndex > 0 ? blogPosts[currentIndex - 1] : null);
        setNextPost(currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null);
      }
    }
  }, [post]);

  // Dynamically update page title, meta keywords, and JSON-LD structured data for Google Search SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | idlanyor-web`;
      
      // Inject JSON-LD Schema
      const schemaId = 'blog-jsonld-schema';
      let script = document.getElementById(schemaId);
      if (!script) {
        script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": [post.image],
        "datePublished": post.date || new Date().toISOString(),
        "dateModified": post.date || new Date().toISOString(),
        "author": [{
          "@type": "Person",
          "name": post.author || "Roynaldi",
          "url": "https://idlanyor.web.id/about"
        }],
        "publisher": {
          "@type": "Organization",
          "name": "idlanyor-web",
          "logo": {
            "@type": "ImageObject",
            "url": "https://api.github.com/users/idlanyor"
          }
        },
        "description": post.excerpt || post.title
      };

      script.innerHTML = JSON.stringify(jsonLd);

      return () => {
        const scriptToRemove = document.getElementById(schemaId);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [post]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center text-slate-500 dark:text-slate-400 min-h-[60vh] flex flex-col items-center justify-center">
        <i className="fas fa-spinner animate-spin text-3xl text-emerald-500 mb-4"></i>
        Membaca artikel lengkap...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <i className="fas fa-exclamation-triangle text-4xl text-amber-500 mb-4 animate-bounce"></i>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Artikel Tidak Ditemukan</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Maaf, tautan artikel yang Anda cari telah kedaluwarsa atau dihapus.</p>
        <Link to="/" className="clay-btn-primary !mt-6 !bg-emerald-500">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Parse markdown/HTML content first to guarantee it is full HTML with <p> tags
  const parsedContent = parseMarkdownToHtml(post.content);

  // Split content in half to dynamically inject an AdSense ad banner in the middle of the article
  const contentParagraphs = parsedContent.split('</p>');
  const midIndex = Math.ceil(contentParagraphs.length / 2);
  const firstHalf = contentParagraphs.slice(0, midIndex).join('</p>') + '</p>';
  const secondHalf = contentParagraphs.slice(midIndex).join('</p>');


  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-20 max-w-4xl mx-auto px-0">
      
      {/* Breadcrumb & Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 dark:hover:text-amber-400 transition-colors mb-6 sm:mb-8 font-bold text-sm"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Beranda
      </Link>

      <article className="clay-panel relative overflow-hidden bg-white/40 dark:bg-slate-900/40 border border-emerald-500/5">
        
        {/* Visual accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

        <header className="mb-12 border-b border-black/5 dark:border-white/5 pb-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-amber-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            <span className="text-slate-400 text-xs font-bold">{formatDate(post.date)}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-6 sm:mb-8">
            {post.title}
          </h1>

          {/* E-E-A-T Author Information */}
          <div className="flex items-center gap-4 bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 dark:border-white/5">
            <div className="w-12 h-12 rounded-xl overflow-hidden clay-card border border-emerald-500/20">
              <img 
                src="https://avatars.githubusercontent.com/u/52753423" 
                alt="Roynaldi" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-black text-sm">{post.author || 'Roynaldi'}</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">Founder & Penulis idlanyor-web</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video rounded-[2rem] overflow-hidden mb-12 border border-black/5 dark:border-white/5 relative z-10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* First Half of Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 relative z-10
          prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-8
          prose-p:leading-relaxed prose-p:mb-6
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-3 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          prose-li:my-1
          prose-pre:bg-slate-950 prose-pre:text-emerald-400 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:border prose-pre:border-emerald-500/10
          "
          dangerouslySetInnerHTML={{ __html: firstHalf }}
        />

        {/* Dynamic Ad Placement in the Middle of Article (Excellent for AdSense review) */}
        <AdPlaceholder label="IN-ARTICLE BANNER AD" className="my-10" />

        {/* Second Half of Content */}
        {secondHalf && (
          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 relative z-10
            prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-8
            prose-p:leading-relaxed prose-p:mb-6
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-3 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            prose-li:my-1
            prose-pre:bg-slate-950 prose-pre:text-emerald-400 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:border prose-pre:border-emerald-500/10
            "
            dangerouslySetInnerHTML={{ __html: secondHalf }}
          />
        )}

        {/* Bottom Ad Slot */}
        <AdPlaceholder label="BOTTOM-ARTICLE BANNER AD" className="mt-12" />

        {/* Social Share Call-to-action */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share this article:</span>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-all">
              <i className="fab fa-facebook-f text-sm"></i>
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-all">
              <i className="fab fa-twitter text-sm"></i>
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-all">
              <i className="fab fa-linkedin-in text-sm"></i>
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-all">
              <i className="fas fa-link text-sm"></i>
            </button>
          </div>
        </div>

      </article>

      {/* Prev / Next Article Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {prevPost ? (
          <Link 
            to={`/blog/${prevPost.slug || prevPost.id}`}
            className="clay-panel border border-emerald-500/5 hover:border-emerald-500/20 p-6 flex gap-4 items-center group bg-white/40 dark:bg-slate-900/40 text-left transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:-translate-x-1 transition-transform">
              <i className="fas fa-arrow-left"></i>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Artikel Sebelumnya</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-1 group-hover:text-emerald-500 transition-colors">{prevPost.title}</h4>
            </div>
          </Link>
        ) : <div className="hidden md:block"></div>}

        {nextPost ? (
          <Link 
            to={`/blog/${nextPost.slug || nextPost.id}`}
            className="clay-panel border border-emerald-500/5 hover:border-emerald-500/20 p-6 flex gap-4 items-center justify-between group bg-white/40 dark:bg-slate-900/40 text-right transition-all duration-300"
          >
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Artikel Selanjutnya</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-1 group-hover:text-emerald-500 transition-colors">{nextPost.title}</h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
              <i className="fas fa-arrow-right"></i>
            </div>
          </Link>
        ) : <div className="hidden md:block"></div>}
      </div>

    </div>
  );
};

export default BlogDetail;
