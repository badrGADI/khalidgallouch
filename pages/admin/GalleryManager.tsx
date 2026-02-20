
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Video, ExternalLink } from 'lucide-react';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '../../src/lib/gallery';
import { getActivities, uploadImage } from '../../src/lib/activities';
import { GalleryItem, Activity, ActivityStatus } from '../../types';

const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View State
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ 
    title: '', 
    category: 'عام', 
    type: 'image' as 'image' | 'video', 
    url: '',
    activity_id: '' 
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const galleryData = await getGalleryItems();
    setItems(galleryData);
    
    const activitiesData = await getActivities();
    setActivities(activitiesData);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0 && !newItem.url) return alert('يرجى اختيار ملفات أو إضافة رابط');
    
    setUploading(true);
    try {
      const activityIdToUse = newItem.activity_id || (selectedActivity ? selectedActivity.id : '');

      // 1. Bulk Upload Mode
      if (selectedFiles.length > 0) {
         let successCount = 0;
         for (let i = 0; i < selectedFiles.length; i++) {
           const file = selectedFiles[i];
           try {
             const url = await uploadImage(file);
             await createGalleryItem({
               ...newItem,
               activity_id: activityIdToUse,
               title: selectedFiles.length > 1 ? `${newItem.title} (${i + 1})` : newItem.title,
               url
             });
             successCount++;
           } catch (err) {
             console.error(`Failed to upload file ${i}`, err);
           }
         }
         alert(`تم رفع ${successCount} من ${selectedFiles.length} بنجاح`);
      } 
      // 2. Value/URL Mode
      else {
        await createGalleryItem({
            ...newItem,
            activity_id: activityIdToUse
        });
      }

      setNewItem({ title: '', category: 'عام', type: 'image', url: '', activity_id: '' });
      setSelectedFiles([]);
      setIsAdding(false);
      fetchItems();
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
     if(window.confirm('حذف هذا العنصر؟')) {
       await deleteGalleryItem(id);
       setItems(items.filter(i => i.id !== id));
     }
  };

  // Filter items based on view
  const filteredItems = selectedActivity 
    ? items.filter(i => i.activity_id === selectedActivity.id)
    : items.filter(i => !i.activity_id); // Show unlinked items if no activity selected? Or separate "General" folder?
  
  // Helper to count items per activity
  const getItemCount = (actId: string) => items.filter(i => i.activity_id === actId).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
             {selectedActivity ? (
                 <button 
                    onClick={() => {
                        setSelectedActivity(null);
                        setIsAdding(false);
                    }}
                    className="bg-white p-2.5 rounded-xl text-gray-500 hover:text-amber-600 shadow-sm border border-gray-100 transition-all"
                 >
                   <ArrowLeft className="w-5 h-5" />
                 </button>
             ) : (
                 <Link to="/admin" className="bg-white p-2.5 rounded-xl text-gray-500 hover:text-amber-600 shadow-sm border border-gray-100 transition-all">
                   <ArrowLeft className="w-5 h-5" />
                 </Link>
             )}
             
             <div>
                <h1 className="text-3xl font-black text-[#0d2137]">
                    {selectedActivity ? selectedActivity.title : 'ألبومات المعرض'}
                </h1>
                {selectedActivity && <p className="text-sm text-gray-500 mt-1">إدارة الصور والفيديوهات لهذا النشاط</p>}
             </div>
           </div>

           {selectedActivity && (
               <button 
                 onClick={() => setIsAdding(!isAdding)}
                 className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-700 transition-all"
               >
                 <Plus className="w-5 h-5" />
                 {isAdding ? 'إغلاق' : 'إضافة ميديا'}
               </button>
           )}
        </div>

        {/* VIEW 1: Activities Grid (Albums) */}
        {!selectedActivity && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {/* General Gallery Folder */}
                <div 
                    onClick={() => setSelectedActivity({ id: '', title: 'معرض عام (غير مرتبط)', description: '', date: '', image: '', category: '', status: ActivityStatus.COMPLETED } as Activity)}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-amber-100 text-gray-600 group-hover:text-amber-600 transition-colors">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                            {items.filter(i => !i.activity_id).length} عنصر
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">معرض عام</h3>
                    <p className="text-gray-400 text-sm mt-1">صور وفيديوهات غير مرتبطة بنشاط محدد</p>
                </div>

                {/* Activity Folders */}
                {activities.map(act => (
                    <div 
                        key={act.id}
                        onClick={() => setSelectedActivity(act)}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                                <img src={act.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={act.title} />
                            </div>
                            <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
                                {getItemCount(act.id)} عنصر
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{act.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">{act.category}</p>
                    </div>
                ))}
            </div>
        )}

        {/* VIEW 2: Media Grid (Items) */}
        {selectedActivity && (
            <>
                {/* Add Form */}
                {isAdding && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
                     <h3 className="font-bold text-lg mb-6 text-[#0d2137]">إضافة إلى: {selectedActivity.title}</h3>
                     <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">العنوان</label>
                          <input required value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                          <input required value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3" list="cat-suggestions" />
                          <datalist id="cat-suggestions">
                            <option value="عام" />
                            <option value="تعليمي" />
                            <option value="رياضي" />
                            <option value="ثقافي" />
                          </datalist>
                        </div>
        
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">النوع</label>
                           <div className="flex gap-4">
                             <label className={`flex-1 p-3 rounded-xl border cursor-pointer text-center font-bold ${newItem.type === 'image' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-gray-50 border-gray-200'}`}>
                                <input type="radio" name="type" className="hidden" onClick={() => setNewItem({...newItem, type: 'image'})} />
                                صورة
                             </label>
                             <label className={`flex-1 p-3 rounded-xl border cursor-pointer text-center font-bold ${newItem.type === 'video' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-gray-50 border-gray-200'}`}>
                                <input type="radio" name="type" className="hidden" onClick={() => setNewItem({...newItem, type: 'video'})} />
                                فيديو
                             </label>
                           </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            {newItem.type === 'image' ? 'ملفات الصور (يمكن اختيار أكثر من واحدة)' : 'ملف الفيديو أو رابط (YouTube/MP4)'}
                          </label>
                          <div className="flex gap-2">
                            <input 
                              required 
                              value={newItem.url} 
                              onChange={e => setNewItem({...newItem, url: e.target.value})} 
                              className="flex-grow bg-gray-50 border border-gray-100 rounded-xl p-3 text-left" 
                              dir="ltr"
                              placeholder={selectedFiles.length > 0 ? `${selectedFiles.length} ملفات محددة` : "https://..."}
                              disabled={selectedFiles.length > 0}
                            />
                             <label className="bg-gray-100 hover:bg-gray-200 px-4 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                               <Plus className="w-5 h-5 text-gray-600" />
                               <input 
                                 type="file" 
                                 multiple
                                 accept={newItem.type === 'image' ? "image/*" : "video/*"} 
                                 className="hidden" 
                                 onChange={handleFileSelect} 
                               />
                             </label>
                          </div>
                          {uploading && <p className="text-xs text-amber-600 mt-1">جاري الرفع...</p>}
                        </div>
        
                        <div className="md:col-span-2">
                          <button type="submit" disabled={uploading} className="w-full bg-[#0d2137] text-white py-3 rounded-xl font-bold hover:bg-[#162840] transition-colors">
                            حفظ ونشر في {selectedActivity.title}
                          </button>
                        </div>
                     </form>
                  </div>
                )}
        
                {/* Media Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
                       {filteredItems.map(item => (
                         <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 relative group">
                            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
                               {item.type === 'image' ? (
                                 <img src={item.url} className="w-full h-full object-cover" alt={item.title} />
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Video className="w-10 h-10" />
                                 </div>
                               )}
                               <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                                  {item.category}
                               </div>
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">{item.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-gray-400 font-mono">{item.type}</span>
                               <div className="flex gap-2">
                                  <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700"><ExternalLink className="w-4 h-4" /></a>
                                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">لا توجد صور في هذا الألبوم</h3>
                        <p className="text-gray-400 mt-2">اضغط على زر "إضافة ميديا" لرفع صور أو فيديوهات</p>
                    </div>
                )}
            </>
        )}

      </div>
    </div>
  );
};

export default GalleryManager;
