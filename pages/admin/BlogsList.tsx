
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, User } from 'lucide-react';
import { getBlogs, deleteBlog } from '../../src/lib/blogs';
import { BlogPost } from '../../types';

const BlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        alert('حدث خطأ أثناء الحذف');
        console.error(error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">جاري تحميل المقالات...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#0d2137]">إدارة المدونة</h1>
          <Link
            to="/admin/blogs/new"
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            إضافة مقال جديد
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-black text-[#0d2137]">الصورة</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">العنوان</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">التاريخ</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">الموقع</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-10 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 max-w-xs truncate">{blog.title}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        {blog.date || new Date().toLocaleDateString('ar-MA')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        {blog.author}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      لا توجد مقالات حالياً. أضف مقالك الأول!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
