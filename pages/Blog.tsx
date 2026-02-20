
import React from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'أهمية التخطيط للأنشطة المدرسية الموازية',
    excerpt: 'تعتبر الأنشطة الموازية جزءاً لا يتجزأ من المنظومة التعليمية الحديثة، فهي تساهم في صقل شخصية التلميذ...',
    date: '12 مايو 2024',
    author: 'أحمد العلمي',
    image: 'https://picsum.photos/seed/edu/800/600'
  },
  {
    id: '2',
    title: 'دور التكنولوجيا في إنجاح الفعاليات الثقافية',
    excerpt: 'في عصر الرقمنة، أصبح استخدام الأدوات التقنية ضرورة ملحة لتنظيم فعاليات تتسم بالكفاءة والاحترافية...',
    date: '5 مايو 2024',
    author: 'فاطمة الزهراء',
    image: 'https://picsum.photos/seed/tech/800/600'
  },
  {
    id: '3',
    title: 'كيف تزيد من تفاعل الجمهور في نشاطك القادم؟',
    excerpt: 'التفاعل هو مفتاح النجاح لأي نشاط. سنناقش هنا 5 استراتيجيات فعالة لجذب انتباه الحضور ومشاركتهم...',
    date: '28 أبريل 2024',
    author: 'ياسين بناني',
    image: 'https://picsum.photos/seed/engagement/800/600'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0d2137] py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">مدونة أنشطتي</h1>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            مقالات، دروس، وتغطيات حصرية لكل ما يخص عالم الأنشطة والفعاليات في المغرب.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16 last:border-0">
              <div className="md:w-1/3 w-full overflow-hidden rounded-3xl shadow-lg aspect-video md:aspect-square">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all flex items-center gap-2">
                  اقرأ المقال كاملاً
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0d2137] py-20 px-4 text-white">
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
      </section>
    </div>
  );
};

export default Blog;
