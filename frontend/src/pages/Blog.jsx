import { useState, useEffect } from 'react';


const Blog = () => {
  const API_BASE_URL = "http://localhost:3000";
  const [isVisible, setIsVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/blogs`);
        const data = await response.json();

        const combinedArticles = [...data, ...blogArticles];
        setArticles(combinedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(blogArticles); // fallback to hardcoded
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <section className="relative min-h-[40vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 inline-block">
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg animate-bounce">
              Insights & Trends
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Digital Marketing
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Expert insights, actionable tips, and the latest trends to help you navigate the digital landscape.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-400">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {articles.map((article, index) => (
                <article 
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-6 right-6 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full z-10">
                    {article.category}
                  </div>
                  
                  <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                    <img 
                      src={article.image?.startsWith('http') ? article.image : `http://localhost:3000/uploads/${article.image}`} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <span>{article.date ? article.date : new Date(article.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} read</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <a 
                      href="#"
                      className="inline-flex items-center text-blue-400 hover:text-purple-400 transition-colors duration-300 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Blog post page coming soon!');
                      }}
                    >
                      Read more
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const blogArticles = [
  {
    id: 1,
    slug: "ai-in-digital-marketing",
    title: "How AI is Revolutionizing Digital Marketing in 2024",
    excerpt: "Artificial Intelligence is no longer the future—it's the present. Discover how AI tools are transforming SEO, content creation, and customer targeting to deliver unprecedented results.",
    category: "Trends",
    date: "May 15, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1085&q=80"
  },
  {
    id: 2,
    slug: "seo-strategies",
    title: "5 SEO Strategies That Actually Work in 2024",
    excerpt: "With search algorithms constantly evolving, what worked last year might not work today. Learn the proven SEO tactics that are driving traffic and conversions right now.",
    category: "SEO",
    date: "April 28, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1469&q=80"
  },
  {
    id: 3,
    slug: "video-marketing-tips",
    title: "Video Marketing: Capturing Attention in the Age of Short-Form Content",
    excerpt: "Video continues to dominate digital marketing. Learn how to create engaging video content that converts, whether you're working with TikTok, YouTube, or Instagram Reels.",
    category: "Content",
    date: "April 10, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    slug: "email-marketing-metrics",
    title: "The Email Marketing Metrics You Should Actually Care About",
    excerpt: "Open rates and click-through rates tell only part of the story. Discover the underrated metrics that reveal the true performance of your email campaigns.",
    category: "Email",
    date: "March 22, 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1470&q=80"
  }
];

export default Blog;
