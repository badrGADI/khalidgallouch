import React, { useState, useEffect } from 'react';
import { X, Images, PlayCircle, ArrowRight, Video } from 'lucide-react';
import { getGalleryItems } from '../src/lib/gallery';
import { getActivities } from '../src/lib/activities';
import { GalleryItem, Activity } from '../types';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [galleryData, activitiesData] = await Promise.all([
        getGalleryItems(),
        getActivities()
      ]);
      setItems(galleryData);
      setActivities(activitiesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter activities to only show those that have gallery items
  const activitiesWithGallery = activities.filter(act => 
    items.some(item => item.activity_id === act.id)
  );

  // Group items by activity for the "details" view
  const activityItems = selectedActivityId 
    ? items.filter(item => item.activity_id === selectedActivityId)
    : [];

  const selectedActivity = activities.find(a => a.id === selectedActivityId);

  const openLightbox = (item: GalleryItem) => {
    setLightboxItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-gray-400">جاري تحميل المعرض...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-amber-50 py-16 px-4 border-b border-amber-100">
        <div className="max-w-7xl mx-auto text-center">
          {selectedActivityId ? (
            <div>
               <button 
                 onClick={() => setSelectedActivityId(null)}
                 className="flex items-center gap-2 text-amber-600 hover:text-amber-800 font-bold mb-4 mx-auto transition-colors"
               >
                 <ArrowRight className="w-4 h-4" />
                 العودة للألبومات
               </button>
               <h1 className="text-3xl md:text-4xl font-black text-[#0d2137] mb-2">{selectedActivity?.title}</h1>
               <p className="text-[#0d2137]/60">{activityItems.length} عنصر في هذا الألبوم</p>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0d2137] mb-4">ألبومات الأنشطة</h1>
              <p className="text-[#0d2137]/60 text-lg max-w-2xl mx-auto">
                توثيق للحظات المميزة والأنشطة التي قمنا بها. اختر نشاطاً لمشاهدة صوره وفيديوهاته.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="p-6 max-w-7xl mx-auto min-h-[50vh]">
        
        {/* VIEW 1: List of Activities (Albums) */}
        {!selectedActivityId && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activitiesWithGallery.length > 0 ? (
              activitiesWithGallery.map(activity => {
                const count = items.filter(i => i.activity_id === activity.id).length;
                return (
                  <div 
                    key={activity.id}
                    onClick={() => setSelectedActivityId(activity.id)}
                    className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/90 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-6 right-6 text-white">
                        <span className="bg-amber-500 text-xs font-black px-2 py-1 rounded-md mb-2 inline-block shadow-sm">
                          {activity.category}
                        </span>
                        <h3 className="text-xl font-black leading-tight mb-1">{activity.title}</h3>
                        <p className="text-white/70 text-sm flex items-center gap-1">
                          <Images className="w-4 h-4" /> {count} عنصر
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-20 text-gray-400">
                <Images className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>لا توجد ألبومات حالياً.</p>
              </div>
            )}
            
            {/* Optional: 'General' or 'Unlinked' Items bucket if there are items without activity_id */}
            {items.some(i => !i.activity_id) && (
               <div 
               onClick={() => setSelectedActivityId('general')}
               className="group cursor-pointer bg-gray-50 rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-amber-500 transition-all flex flex-col items-center justify-center h-64"
             >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Images className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-gray-500 group-hover:text-[#0d2137]">ألبوم عام</h3>
                <p className="text-gray-400 text-sm">صور متنوعة</p>
             </div>
            )}
          </div>
        )}

        {/* VIEW 2: Items in Selected Activity */}
        {selectedActivityId && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-fade-in">
             {(selectedActivityId === 'general' ? items.filter(i => !i.activity_id) : activityItems).map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
              >
                {item.type === 'video' ? (
                  <div className="relative">
                    <video src={item.url} className="w-full h-auto object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  {item.title && <h3 className="text-white font-bold text-sm line-clamp-2">{item.title}</h3>}
                  <span className="text-white/60 text-xs mt-1">{item.type === 'video' ? 'فيديو' : 'صورة'}</span>
                </div>
              </div>
            ))}
             
             {(selectedActivityId === 'general' ? items.filter(i => !i.activity_id) : activityItems).length === 0 && (
                <div className="text-center py-20 text-gray-400 col-span-full">
                   لا توجد عناصر في هذا الألبوم بعد.
                </div>
             )}
          </div>
        )}

      </section>

      {/* ── Lightbox ── */}
      {lightboxItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-5 right-5 text-white/60 hover:text-white bg-black/50 rounded-full p-2" onClick={closeLightbox}>
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            {lightboxItem.type === 'video' ? (
              <video 
                src={lightboxItem.url} 
                controls 
                autoPlay 
                className="max-w-full max-h-[80vh] rounded-xl shadow-2xl bg-black"
              />
            ) : (
              <img
                src={lightboxItem.url}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                alt={lightboxItem.title}
              />
            )}
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-lg">{lightboxItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
