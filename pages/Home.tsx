
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Target, BookOpen, Cpu, Globe, Rocket, X, BarChart2, Users, TrendingUp } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { Activity, ActivityStatus } from '../types';
import { getActivities } from '../src/lib/activities';

const Home: React.FC = () => {
  const [featuredActivities, setFeaturedActivities] = useState<Activity[]>([]);
  const [statsActivity, setStatsActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities();
      // Show only top 3, preferably upcoming or recent
      setFeaturedActivities(data.slice(0, 3));
    };
    fetchActivities();
  }, []);
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center text-white py-16 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/khalidhero.png" 
            className="w-full h-full object-cover"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-[#0d2137]/85 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          {/* <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20">
            <Star className="text-amber-400 w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold">أفضل منصة للأنشطة في المغرب</span>
          </div> */}
          
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight max-w-4xl mx-auto">
            اللقاءات الرسمية للسيد <span className="inline-block border-2 border-amber-400 px-4 py-2 rounded-2xl mx-1 mt-2 md:mt-0">خالد الكلوش</span>
            <span className="block text-amber-400 mt-4">عضو اللجنة التنفيذية لحزب الاستقلال</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
منصتكم المتكاملة لمواكبة كل ما هو جديد حول أنشطة السيد خالد الكلوش والتسجيل في اللقاءات التي يؤطرها بأسلوب عصري ومنظم.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/activities" className="bg-amber-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition-all shadow-xl flex items-center justify-center gap-2">
              تصفح الأنشطة
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="bg-white/10 border border-white/30 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b -mt-10 mx-4 rounded-2xl shadow-lg max-w-5xl md:mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8 relative z-20">
        {[
          { label: 'نشاط تم تنفيذه', value: '+150' },
          { label: 'مشارك نشط', value: '+5,000' },
          { label: 'مدينة مغربية', value: '12' },
          { label: 'تقييم إيجابي', value: '4.9/5' }
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-2xl md:text-3xl font-black text-[#0d2137] mb-0.5">{stat.value}</div>
            <div className="text-gray-400 font-bold text-xs uppercase">{stat.label}</div>
          </div>
        ))}
      </section>
 {/* ==================== Creator Section (Single Person) ==================== */}
      <section className="py-24 px-4 bg-white">

        <div className="max-w-5xl mx-auto">
          {/* Section Label */}
          {/* <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full text-sm font-bold border border-amber-100 text-[#0d2137]">
              <Rocket className="w-4 h-4 text-amber-600" />
              من وراء المنصة؟
            </span>
          </div> */}

          {/* Single Creator Card — indigo background */}
          <div className="bg-[#0d2137] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl shadow-indigo-200">
            {/* Photo Side */}
            <div className="md:w-2/5 w-full h-72 md:h-auto relative flex-shrink-0">
              <img
                src="/images/molchi.jpeg"
                alt="مؤسس المنصة"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0d2137]/70 to-transparent"></div>
            </div>

            {/* Info Side */}
            <div className="p-10 md:p-14 flex flex-col justify-center text-white">
              {/* <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-2 rounded-full mb-6 w-fit">
                🚀 مؤسس المنصة
              </div> */}
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">خالد الكلوش</h2>
              <p className="text-amber-200 font-bold mb-6">عضو اللجنة التنفيذية لحزب الاستقلال مستشار وزير النقل واللوجيستيك طالب باحث في سلك الدكتورة</p>
              <p className="text-white/70 leading-relaxed mb-8 text-lg">
              خالد الكلوش فاعل سياسي شاب من أبناء أولاد تايمة، تدرج داخل هياكل حزب الاستقلال منذ سنة 2004 إلى أن أصبح سنة 2024 عضوًا في لجنته التنفيذية، مجسّدًا مسارًا قائمًا على العمل الجاد والانضباط.<br></br>
ويعد نموذجا للشباب المغربي الطموح الذي اختار الاشتغال في صمت، واضعا خدمة المجتمع ونكران الذات في صلب مسيرته
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/15 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">📚 تعليم</span>
                <span className="bg-white/15 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">🎨 إبداع</span>
                <span className="bg-white/15 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-full">🤝 تطوع</span>
              </div>
              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-amber-500 text-white font-black px-8 py-4 rounded-xl hover:bg-amber-600 transition-all shadow-xl text-base"
                >
                  تعرف على القصة كاملة
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Goals */}
      {/* <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">لماذا نقوم بهذه الأنشطة؟</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">نهدف لبناء جيل متكامل المهارات قادر على الإبداع.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'تنمية المهارات', icon: Target, color: 'text-blue-600 bg-blue-50' },
            { title: 'نشر المعرفة', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
            { title: 'الابتكار التقني', icon: Cpu, color: 'text-indigo-600 bg-indigo-50' },
            { title: 'التواصل المجتمعي', icon: Globe, color: 'text-pink-600 bg-pink-50' }
          ].map((goal, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${goal.color} rounded-xl flex items-center justify-center mb-4`}>
                <goal.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{goal.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">توفير محتوى تعليمي متميز يواكب آخر التطورات العالمية في مختلف المجالات.</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Featured Activities */}
      <section className="py-20 px-4 bg-[#0d2137]">
        <div className="max-w-7xl mx-auto mb-10 flex justify-between items-end">
           <h2 className="text-3xl font-black text-white">أبرز الأنشطة</h2>
           <Link to="/activities" className="text-amber-300 font-bold flex items-center gap-1 hover:gap-2 hover:text-white transition-all">
             الكل <ArrowLeft className="w-4 h-4" />
           </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredActivities.length > 0 ? (
            featuredActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onStats={setStatsActivity} />
            ))
          ) : (
             <div className="col-span-3 text-center text-white/50 py-10">
               جاري تحميل الأنشطة...
             </div>
          )}
        </div>
      </section>

      {/* ==================== Blog Preview Section ==================== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-2 block">المدونة</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0d2137]">أحدث المقالات</h2>
          </div>
          <Link to="/blog" className="text-amber-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            كل المقالات <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'أهمية التخطيط للأنشطة المدرسية الموازية',
              excerpt: 'تعتبر الأنشطة الموازية جزءاً لا يتجزأ من المنظومة التعليمية الحديثة، فهي تساهم في صقل شخصية التلميذ.',
              date: '12 مايو 2024',
              author: 'أحمد العلمي',
              image: 'https://picsum.photos/seed/edu/800/600',
              category: 'تعليم'
            },
            {
              title: 'دور التكنولوجيا في إنجاح الفعاليات الثقافية',
              excerpt: 'في عصر الرقمنة، أصبح استخدام الأدوات التقنية ضرورة ملحة لتنظيم فعاليات تتسم بالكفاءة والاحترافية.',
              date: '5 مايو 2024',
              author: 'فاطمة الزهراء',
              image: 'https://picsum.photos/seed/tech/800/600',
              category: 'تقنية'
            },
            {
              title: 'كيف تزيد من تفاعل الجمهور في نشاطك القادم؟',
              excerpt: 'التفاعل هو مفتاح النجاح لأي نشاط. سنناقش 5 استراتيجيات فعالة لجذب انتباه الحضور ومشاركتهم.',
              date: '28 أبريل 2024',
              author: 'ياسين بناني',
              image: 'https://picsum.photos/seed/engagement/800/600',
              category: 'تطوير'
            }
          ].map((post, i) => (
            <article key={i} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
              <div className="h-52 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-black px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug group-hover:text-[#0d2137] transition-colors flex-grow">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  to="/blog"
                  className="text-amber-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  اقرأ المزيد <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

     

      {/* ── Per-Activity Stats Modal ── */}
      {statsActivity && (() => {
        const s = statsActivity;
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setStatsActivity(null)}>
            <div className="absolute inset-0 bg-[#0d2137]/60 backdrop-blur-sm" />
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden" onClick={e => e.stopPropagation()}>
              {/* Header with cover image */}
              <div className="relative h-40 overflow-hidden">
                <img src={statsActivity.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-[#0d2137]/75 flex items-end p-6">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">{statsActivity.category}</span>
                    <h3 className="text-white font-black text-lg leading-tight">{statsActivity.title}</h3>
                  </div>
                </div>
                <button onClick={() => setStatsActivity(null)} className="absolute top-4 left-4 text-white/60 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* 4 quick stats */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: Users, label: 'مشارك', value: s.participants || 0 },
                    { icon: Star, label: 'تقييم', value: s.rating || 0 },
                    { icon: BarChart2, label: 'صورة', value: s.gallery?.length || 0 },
                    { icon: TrendingUp, label: 'مدة', value: s.duration || '--' },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="bg-amber-50 rounded-2xl p-3 text-center border border-amber-100">
                      <Icon className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                      <div className="text-lg font-black text-[#0d2137]">{value}</div>
                      <div className="text-[10px] text-gray-400 font-bold">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-black text-[#0d2137] mb-3 uppercase tracking-wider">أبرز الإنجازات</h4>
                  <ul className="space-y-2">
                    {(s.highlights || []).map((h, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setStatsActivity(null)}
                  className="w-full bg-[#0d2137] hover:bg-[#162840] text-white font-black py-3.5 rounded-2xl transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Home;
