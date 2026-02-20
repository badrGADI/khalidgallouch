
import React, { useState, useEffect } from 'react';
import { Activity, ActivityStatus } from '../types';
import { getActivities } from '../src/lib/activities';
import ActivityCard from '../components/ActivityCard';
import { createRegistration } from '../src/lib/registrations';
import { Search, Filter, X, Send, CheckCircle2, ChevronLeft, BarChart2, Users, Star, TrendingUp } from 'lucide-react';



const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ActivityStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeringActivity, setRegisteringActivity] = useState<Activity | null>(null);
  const [regStatus, setRegStatus] = useState<'idle' | 'success' | 'loading'>('idle');
  const [regForm, setRegForm] = useState({ fullName: '', email: '', phone: '' });

  const [statsActivity, setStatsActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const data = await getActivities();
      setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.status === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRegister = (activity: Activity) => {
    setRegisteringActivity(activity);
    setRegStatus('idle');
  };

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringActivity) return;

    setRegStatus('loading');
    try {
      await createRegistration({
        activity_id: registeringActivity.id,
        activity_title: registeringActivity.title,
        full_name: regForm.fullName,
        email: regForm.email,
        phone: regForm.phone
      });

      setRegStatus('success');
      setTimeout(() => {
        setRegisteringActivity(null);
        setRegStatus('idle');
        setRegForm({ fullName: '', email: '', phone: '' });
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      setRegStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-amber-50 py-12 px-4 border-b border-amber-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black mb-2 text-[#0d2137]">استكشف برامجنا</h1>
          <p className="text-[#0d2137]/60 text-lg">سجل حافل بالنجاحات وبرامج مستقبلية طموحة.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-[#0d2137] mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-600" />
                تصفية الأنشطة
              </h3>
              
              <div className="relative mb-8">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ابحث..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:border-amber-500 focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', label: 'كل الأنشطة' },
                  { id: ActivityStatus.UPCOMING, label: 'الأنشطة القادمة' },
                  { id: ActivityStatus.COMPLETED, label: 'الأرشيف (السابقة)' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id as any)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-bold transition-all ${
                      filter === btn.id 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {btn.label}
                    {filter === btn.id && <ChevronLeft className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 hidden lg:block">
               <h4 className="font-black text-[#0d2137] mb-2">هل تحتاج مساعدة؟</h4>
               <p className="text-sm text-amber-800 leading-relaxed mb-4">فريقنا متواجد دائماً للإجابة على استفساراتكم حول التسجيل.</p>
               <button className="text-amber-600 font-black text-sm hover:underline">اتصل بنا الآن</button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:w-3/4">
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} onRegister={handleRegister} onStats={setStatsActivity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="text-gray-300 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">لم نجد أي نشاط</h3>
                <p className="text-gray-500 text-sm">جرب تغيير كلمات البحث أو الفلتر.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Registration Modal */}
      {registeringActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0d2137]/60 backdrop-blur-sm" onClick={() => setRegisteringActivity(null)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden">
            {regStatus === 'success' ? (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">تم التسجيل!</h3>
                <p className="text-gray-500">سنتواصل معك لتأكيد الحضور.</p>
              </div>
            ) : (
              <>
                <div className="bg-[#0d2137] p-6 text-white flex justify-between items-center">
                  <h3 className="text-lg font-black">تسجيل في: {registeringActivity.title}</h3>
                  <button onClick={() => setRegisteringActivity(null)}><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={submitRegistration} className="p-8 space-y-4">
                  <input required value={regForm.fullName} onChange={e => setRegForm({...regForm, fullName: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="الاسم الكامل" />
                  <input required type="email" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="البريد الإلكتروني" />
                  <input required type="tel" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="رقم الهاتف" />
                  <button disabled={regStatus === 'loading'} type="submit" className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                    {regStatus === 'loading' ? 'جاري التسجيل...' : 'تأكيد التسجيل'} {regStatus !== 'loading' && <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
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

export default Activities;
