
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Users, Calendar, Mail, Phone, Search } from 'lucide-react';
import { getRegistrations } from '../../src/lib/registrations';
import { Registration } from '../../types';

const RegistrationsList: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getRegistrations();
      setRegistrations(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = registrations.filter(r => 
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.activity_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ['الاسم الكامل', 'البريد الإلكتروني', 'الهاتف', 'النشاط', 'تاريخ التسجيل'];
    const csvContent = [
      headers.join(','),
      ...filtered.map(r => [
        `"${r.full_name}"`,
        `"${r.email}"`,
        `"${r.phone}"`,
        `"${r.activity_title}"`,
        `"${new Date(r.created_at).toLocaleDateString('ar-MA')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-10 text-center text-gray-500">جاري تحميل المسجلين...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
             <Link to="/admin" className="bg-white p-2.5 rounded-xl text-gray-500 hover:text-amber-600 shadow-sm border border-gray-100 transition-all">
               <ArrowLeft className="w-5 h-5" />
             </Link>
             <div>
               <h1 className="text-3xl font-black text-[#0d2137]">المسجلين في الأنشطة</h1>
               <p className="text-gray-400 text-sm mt-1">{registrations.length} مسجل إجمالاً</p>
             </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
               <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input 
                 type="text" 
                 placeholder="بحث باسم، بريد، أو نشاط..." 
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 className="w-full md:w-64 bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-amber-500 text-sm"
               />
             </div>
             <button 
               onClick={downloadCSV}
               className="bg-[#0d2137] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#162840] transition-all"
             >
               <Download className="w-4 h-4" />
               تصدير CSV
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-black text-[#0d2137] text-sm">الاسم الكامل</th>
                  <th className="px-6 py-4 font-black text-[#0d2137] text-sm">معلومات الاتصال</th>
                  <th className="px-6 py-4 font-black text-[#0d2137] text-sm">النشاط المسجل فيه</th>
                  <th className="px-6 py-4 font-black text-[#0d2137] text-sm">تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                          {reg.full_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-gray-900">{reg.full_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {reg.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                           <Phone className="w-3.5 h-3.5 text-gray-400" />
                           <span dir="ltr" className="text-right">{reg.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {reg.activity_title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                      {new Date(reg.created_at).toLocaleDateString('ar-MA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-12 h-12 opacity-20" />
                        <p>لا توجد تسجيلات مطابقة للبحث</p>
                      </div>
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

export default RegistrationsList;
