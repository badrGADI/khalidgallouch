
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings, ArrowRight, Images } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-[#0d2137] mb-2">لوحة التحكم</h1>
        <p className="text-gray-500 text-lg mb-12">مرحباً بك في لوحة تحكم الموقع.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Activities Card */}
          <Link to="/admin/activities" className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0d2137] mb-2">إدارة الأنشطة</h3>
            <p className="text-gray-400 mb-6 line-clamp-2">إضافة وتعديل وحذف الأنشطة والفعاليات في الموقع.</p>
            <div className="flex items-center text-amber-600 font-bold gap-2 group-hover:gap-3 transition-all">
              الدخول
              <ArrowLeft className="w-5 h-5" />
            </div>
          </Link>

          {/* Placeholder for future sections */}
          {/* Registrations Card */}
          <Link to="/admin/registrations" className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0d2137] mb-2">المسجلين</h3>
            <p className="text-gray-400 mb-6 line-clamp-2">عرض قائمة المسجلين في الأنشطة وتصدير البيانات.</p>
            <div className="flex items-center text-blue-600 font-bold gap-2 group-hover:gap-3 transition-all">
              عرض القائمة
              <ArrowLeft className="w-5 h-5" />
            </div>
          </Link>

          {/* Gallery Card */}
          <Link to="/admin/gallery" className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Images className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#0d2137] mb-2">المعرض</h3>
            <p className="text-gray-400 mb-6 line-clamp-2">إضافة صور وفيديوهات للمعرض.</p>
            <div className="flex items-center text-purple-600 font-bold gap-2 group-hover:gap-3 transition-all">
              إدارة المعرض
              <ArrowLeft className="w-5 h-5" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

// Simple ArrowLeft icon component locally if needed, but it's imported from lucide-react
import { ArrowLeft } from 'lucide-react';

export default AdminDashboard;
