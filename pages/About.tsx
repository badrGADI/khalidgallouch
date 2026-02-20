
import React from 'react';
import { Target, Heart, Award, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Intro */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-600 font-bold tracking-widest uppercase mb-4 block">قصتنا</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0d2137] mb-8 leading-tight">
              نحن نبني جسراً بين <span className="text-amber-600">المعرفة والتطبيق</span>
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              بدأت منصة "أنشطتي" كمبادرة شبابية تهدف إلى تنظيم وتوثيق الأنشطة الثقافية والتعليمية في المغرب، لضمان استمرارية الأثر المعرفي ومساعدة الجيل القادم على اكتساب المهارات.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-r-4 border-amber-600 pr-6">
                <div className="text-4xl font-black text-[#0d2137] mb-1">2020</div>
                <div className="text-gray-500 font-medium">عام التأسيس</div>
              </div>
              <div className="border-r-4 border-amber-600 pr-6">
                <div className="text-4xl font-black text-[#0d2137] mb-1">50+</div>
                <div className="text-gray-500 font-medium">متطوع شغوف</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="/images/image.png" className="rounded-[3rem] shadow-2xl relative z-10" alt="About Team" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">قيمنا الجوهرية</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">المبادئ التي تقودنا في كل نشاط نقوم به.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'الشفافية', icon: ShieldCheck, desc: 'الوضوح التام في كل ما نقوم به.' },
              { title: 'الابتكار', icon: Target, desc: 'البحث عن طرق جديدة دائماً.' },
              { title: 'التفاني', icon: Heart, desc: 'حب العمل والرغبة في العطاء.' },
              { title: 'التميز', icon: Award, desc: 'لا نرضى بأقل من الأفضل.' }
            ].map((value, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all text-center group">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-blue-100/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0d2137] mb-4">🚀 مؤسس المنصة</h2>
          <p className="text-gray-500 text-lg">الرؤية والشغف وراء هذه المبادرة.</p>
        </div>
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl group border border-gray-100">
              <div className="h-96 relative overflow-hidden">
                <img src="/images/iconkhalid.png" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Founder" />
              </div>
              <div className="p-8 text-center bg-white relative z-10">
                <h4 className="text-2xl font-black text-[#0d2137] mb-2">خالد الكلوش</h4>
                <p className="text-amber-600 font-bold mb-6 tracking-wide uppercase text-sm">عضو اللجنة التنفيذية لحزب الاستقلال</p>
                <p className="text-gray-500 leading-relaxed text-sm">
                  نسعى لتمكين الشباب وتوفير بيئة رقمية متكاملة تدعم الإبداع والتعلم المستمر، وبناء مجتمع نشط يساهم في التنمية.
                </p>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
