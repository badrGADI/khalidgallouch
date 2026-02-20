
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import { createActivity, getActivity, updateActivity, uploadImage } from '../../src/lib/activities';
import { Activity, ActivityStatus } from '../../types';

const ActivityForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Activity>>({
    title: '',
    date: '',
    description: '',
    category: '',
    status: ActivityStatus.UPCOMING,
    image: '',
    gallery: [],
    participants: 0,
    rating: 5.0,
    duration: '',
    highlights: []
  });

  const [highlightsInput, setHighlightsInput] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchActivity = async () => {
        const data = await getActivity(id);
        if (data) {
          setFormData(data);
          setHighlightsInput(data.highlights?.join('\n') || '');
        }
      };
      fetchActivity();
    }
  }, [id, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'gallery') => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    try {
      if (field === 'image') {
        // Single image upload for main image
        const file = e.target.files[0];
        const url = await uploadImage(file);
        setFormData(prev => ({ ...prev, image: url }));
      } else {
        // Multiple image upload for gallery
        const files = Array.from(e.target.files);
        const urls = await Promise.all(files.map((file: File) => uploadImage(file)));
        setFormData(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...urls]
        }));
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      if (error.message && error.message.includes('Bucket not found')) {
         alert('خطأ: لم يتم العثور على مخزن الصور (Bucket). يرجى الذهاب إلى الرابط /debug لإعداد المخزن.');
      } else {
         alert(`فشل رفع الصورة: ${error.message || 'خطأ غير معروف'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const activityData = {
        ...formData,
        highlights: highlightsInput.split('\n').filter(h => h.trim() !== '')
      };

      if (isEditing) {
        await updateActivity(id, activityData);
      } else {
        await createActivity(activityData as Omit<Activity, 'id'>);
      }
      navigate('/admin/activities');
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/activities')} className="bg-white p-2 rounded-lg text-gray-600 hover:text-amber-600 shadow-sm">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black text-[#0d2137]">
            {isEditing ? 'تعديل النشاط' : 'إضافة نشاط جديد'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">عنوان النشاط</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">التاريخ</label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
              <select
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none"
              >
                <option value="" disabled>اختر التصنيف</option>
                <option value="تعليمي">تعليمي</option>
                <option value="رياضي">رياضي</option>
                <option value="ثقافي">ثقافي</option>
                <option value="تقنية">تقنية</option>
                <option value="تطوع">تطوع</option>
                <option value="بيئي">بيئي</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الحالة</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as ActivityStatus })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={ActivityStatus.UPCOMING}>قادم (جديد)</option>
                <option value={ActivityStatus.COMPLETED}>منتهي (أرشيف)</option>
              </select>
            </div>
          </div>

          {/* Conditional Stats Fields */}
          {formData.status === ActivityStatus.COMPLETED && (
             <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
              <h3 className="font-black text-[#0d2137] mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                إحصائيات النشاط (للمنتهي فقط)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">عدد المشاركين</label>
                  <input
                    type="number"
                    value={formData.participants || ''}
                    onChange={e => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">التقييم (من 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={formData.rating || ''}
                    onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المدة الزمنية</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
             </div>
          )}

          {/* Activity Highlights / Features */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">مميزات النشاط / ماذا ستجد في هذا النشاط؟ (كل ميزة في سطر)</label>
            <textarea
              rows={5}
              value={highlightsInput}
              onChange={e => setHighlightsInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="جلسات تفاعلية مع خبراء&#10;ورشات عملية تطبيقية&#10;فرص للتواصل..."
            />
            <p className="text-xs text-gray-400 mt-1">هذه النقاط ستظهر في صفحة تفاصيل النشاط تحت عنوان 'ماذا ستجد في هذا النشاط؟'</p>
          </div>

          {/* Image Uploads */}
          <div className="space-y-6 mb-8">
            {/* Main Image */}
            {/* Main Image */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية</label>
              <div className="space-y-3">
                
                {/* Image Preview */}
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                )}

                <div className="flex flex-col md:flex-row gap-4">
                    {/* File Upload */}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors flex-1">
                      <Upload className="w-5 h-5" />
                      رفع صورة من الجهاز
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} className="hidden" />
                    </label>

                    {/* Manual URL Fallback */}
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="أو ضع رابط الصورة هنا مباشرة..."
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-400">إذا فشل الرفع، يمكنك استخدام رابط صورة خارجي (مثل Google Drive link مباشر أو أي رابط صورة من الإنترنت).</p>
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">صور المعرض (متعدد)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.gallery?.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover rounded-xl border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 transition-colors aspect-square">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm font-bold">إضافة صور</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, 'gallery')} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/activities')}
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 disabled:opacity-70"
            >
              {loading ? 'جاري الحفظ...' : (
                <>
                  <Save className="w-5 h-5" />
                  حفظ النشاط
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
