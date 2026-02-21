
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, ImageIcon } from 'lucide-react';
import { createBlog, getBlog, updateBlog } from '../../src/lib/blogs';
import { uploadImage } from '../../src/lib/activities'; // Reuse activity image upload
import { BlogPost } from '../../types';

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'خالد الكلوش',
    image: '',
    date: new Date().toLocaleDateString('ar-MA')
  });

  useEffect(() => {
    if (isEditing) {
      const fetchBlog = async () => {
        const data = await getBlog(id);
        if (data) {
          setFormData(data);
        }
      };
      fetchBlog();
    }
  }, [id, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    try {
      const file = e.target.files[0];
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`فشل رفع الصورة: ${error.message || 'خطأ غير معروف'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updateBlog(id, formData);
      } else {
        await createBlog(formData as Omit<BlogPost, 'id'>);
      }
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/blogs')} className="bg-white p-2 rounded-lg text-gray-600 hover:text-amber-600 shadow-sm">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black text-[#0d2137]">
            {isEditing ? 'تعديل المقال' : 'إضافة مقال جديد'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">عنوان المقال</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الموقع (المصدر)</label>
                <input
                  required
                  type="text"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="مثال: صوت سوس"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">التاريخ</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="مثال: 12 مايو 2024"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رابط المقال الأصلي (Link)</label>
              <input
                type="url"
                value={formData.external_url || ''}
                onChange={e => setFormData({ ...formData, external_url: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="https://sawtsouss.com/archives/..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">مقتطف قصير (يظهر في القائمة)</label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">المحتوى الكامل</label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية</label>
              <div className="space-y-4">
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-40 h-24 object-cover rounded-xl border border-gray-200" />
                )}
                <div className="flex gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
                    <Upload className="w-5 h-5" />
                    رفع صورة
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <input 
                    type="text" 
                    placeholder="أو رابط الصورة..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 text-white px-10 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              {loading ? 'جاري الحفظ...' : 'حفظ المقال'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
