
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, ArrowRight, Images, Maximize2, Calendar, Tag, Clock, CheckCircle, Users, MapPin } from 'lucide-react';
import { Activity, ActivityStatus } from '../types';
import { getActivity } from '../src/lib/activities';

const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        const data = await getActivity(id);
        setActivity(data);
      }
    };
    fetchActivity();
    window.scrollTo(0, 0);
  }, [id]);

  if (!activity) return null;

  const isCompleted = activity.status === ActivityStatus.COMPLETED;

  const openLightbox = (index: number) => {
    setSelectedImgIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImgIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.gallery && selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex + 1) % activity.gallery.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activity.gallery && selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex - 1 + activity.gallery.length) % activity.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Image ─────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137] via-[#0d2137]/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-xl font-bold hover:bg-white/30 transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          الرجوع
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 right-0 left-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-black ${isCompleted ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {isCompleted ? 'نشاط منتهي' : 'قادم قريباً'}
              </span>
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                <Tag className="w-4 h-4" />
                {activity.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {activity.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Article Body ───────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Meta Info Bar */}
        <div className="flex flex-wrap gap-6 items-center py-6 border-b border-gray-100 mb-10 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="font-bold">{activity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <span className="font-bold">50+ مشارك</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span className="font-bold">الدار البيضاء، المغرب</span>
          </div>
          <div className="flex items-center gap-2">
            <Images className="w-4 h-4 text-amber-500" />
            <span className="font-bold">{activity.gallery?.length || 0} صور</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 text-xl leading-[2] font-medium whitespace-pre-line">
            {activity.description}
          </p>
        </div>

        {/* Highlights */}
        {(activity.highlights && activity.highlights.length > 0) ? (
          <div className="bg-amber-50 border-r-4 border-amber-500 p-6 rounded-2xl mb-12">
            <h3 className="text-[#0d2137] font-black text-lg mb-4">
              {isCompleted ? 'أبرز الإنجازات' : 'ماذا ستجد في هذا النشاط؟'}
            </h3>
            <ul className="space-y-3">
              {activity.highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* Default/Fallback Highlights if none provided */
          <div className="bg-amber-50 border-r-4 border-amber-500 p-6 rounded-2xl mb-12">
            <h3 className="text-[#0d2137] font-black text-lg mb-4">ماذا ستجد في هذا النشاط؟</h3>
            <ul className="space-y-3">
              {[
                'جلسات تفاعلية مع خبراء متخصصين',
                'ورشات عملية تطبيقية',
                'فرص للتواصل وبناء العلاقات المهنية',
                'شهادات مشاركة معتمدة'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {!isCompleted && (
          <div className="bg-[#0d2137] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div>
              <h3 className="text-2xl font-black mb-1">سجّل مشاركتك الآن</h3>
              <p className="text-blue-200/80">الأماكن محدودة — لا تفوّت الفرصة!</p>
            </div>
            <Link
              to="/activities"
              className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg whitespace-nowrap"
            >
              التسجيل في النشاط
            </Link>
          </div>
        )}

        {/* ── Photo Gallery ─────────────────────────── */}
        {activity.gallery && activity.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#0d2137] mb-8 flex items-center gap-3">
              <Images className="w-6 h-6 text-amber-500" />
              صور النشاط
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activity.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`صورة ${idx + 1}`} />
                  <div className="absolute inset-0 bg-[#0d2137]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white w-7 h-7" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox ───────────────────────────────── */}
      {selectedImgIndex !== null && activity.gallery && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4" onClick={prevImg}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4" onClick={nextImg}>
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-5xl w-full h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img src={activity.gallery[selectedImgIndex]} className="max-w-full max-h-full object-contain rounded-lg" alt="Slide" />
            <div className="absolute bottom-4 text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              {selectedImgIndex + 1} / {activity.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
