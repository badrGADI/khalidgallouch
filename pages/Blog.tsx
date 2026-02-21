import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Globe } from 'lucide-react';
import { getBlogs } from '../src/lib/blogs';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const data = await getBlogs();
      setBlogPosts(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0d2137] py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">  اخبار و تغطيات اعلامية</h1>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            مقالات، دروس، وتغطيات حصرية لكل ما يخص عالم الأنشطة والفعاليات في المغرب.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {loading ? (
            <div className="text-center text-gray-400 py-10">جاري تحميل المقالات...</div>
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className="group flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16 last:border-0">
                <div className="md:w-1/3 w-full overflow-hidden rounded-3xl shadow-lg aspect-video md:aspect-square">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-12 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <span className="bg-[#0d2137] text-white px-3 py-1.5 rounded-lg text-sm font-black whitespace-nowrap mt-1 shadow-sm flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <button 
                    onClick={() => post.external_url && window.open(post.external_url, '_blank')}
                    className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all flex items-center gap-2"
                  >
                    اقرأ المقال كاملاً
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-400 py-10">لا توجد مقالات حالياً.</div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      {/* <section className="bg-[#0d2137] py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">اشترك في نشرتنا البريدية</h2>
          <p className="text-blue-200 mb-10">توصل بأحدث المقالات والأنشطة مباشرة في بريدك الإلكتروني.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-10 rounded-xl transition-all">
              اشترك الآن
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Blog;
