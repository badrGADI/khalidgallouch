
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, Tag, CheckCircle, Clock, Eye, EyeOff } from 'lucide-react';
import { getActivities, deleteActivity, updateActivity } from '../../src/lib/activities';
import { Activity, ActivityStatus } from '../../types';

const ActivitiesList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    setLoading(true);
    const data = await getActivities(true); // Include hidden activities in admin list
    setActivities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
      try {
        await deleteActivity(id);
        setActivities(activities.filter(a => a.id !== id));
      } catch (error) {
        alert('حدث خطأ أثناء الحذف');
        console.error(error);
      }
    }
  };

  const handleToggleVisibility = async (activity: Activity) => {
    try {
      const newHiddenStatus = !activity.is_hidden;
      await updateActivity(activity.id, { is_hidden: newHiddenStatus });
      setActivities(activities.map(a => 
        a.id === activity.id ? { ...a, is_hidden: newHiddenStatus } : a
      ));
    } catch (error) {
      alert('حدث خطأ أثناء تحديث الحالة');
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#0d2137]">إدارة الأنشطة</h1>
          <Link
            to="/admin/activities/new"
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            إضافة نشاط جديد
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
                  <th className="px-6 py-4 font-black text-[#0d2137]">التصنيف</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">للحالة</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">الظهور</th>
                  <th className="px-6 py-4 font-black text-[#0d2137]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{activity.title}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        {activity.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {activity.status === ActivityStatus.COMPLETED ? (
                        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          منتهي
                        </span>
                      ) : (
                        <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          قادم
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleVisibility(activity)}
                        className={`p-2 rounded-lg transition-all ${
                          activity.is_hidden 
                            ? 'text-gray-400 hover:bg-gray-100' 
                            : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={activity.is_hidden ? 'إظهار' : 'إخفاء'}
                      >
                        {activity.is_hidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/activities/edit/${activity.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      لا توجد أنشطة حالياً. أضف نشاطك الأول!
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

export default ActivitiesList;
