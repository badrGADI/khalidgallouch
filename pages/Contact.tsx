
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<{
    loading: boolean;
    type: 'success' | 'error' | null;
    message: string;
  }>({
    loading: false,
    type: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, type: null, message: '' });

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ]);

      if (error) throw error;

      setStatus({
        loading: false,
        type: 'success',
        message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus({
        loading: false,
        type: 'error',
        message: 'حدث خطأ أثناء إرسال الرسالة. المرجو المحاولة مرة أخرى.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#0d2137] mb-4">تواصل معنا</h1>
          <p className="text-gray-500 text-lg">لديك سؤال أو اقتراح؟ يسعدنا دائماً سماع رأيك.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h4>
                <p className="text-gray-500">contact@anshitaty.ma</p>
                <p className="text-gray-500">support@anshitaty.ma</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">رقم الهاتف</h4>
                <p className="text-gray-500" dir="ltr">+212 6 00 00 00 00</p>
                <p className="text-gray-500" dir="ltr">+212 5 22 00 00 00</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">الموقع</h4>
                <p className="text-gray-500">حي المعاريف، الدار البيضاء، المغرب</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
              {status.message && (
                <div className={`p-4 mb-6 rounded-xl ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {status.message}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">الاسم الكامل</label>
                  <input
                    required
                    type="text"
                    disabled={status.loading}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all disabled:opacity-50"
                    placeholder="أدخل اسمك هنا"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">البريد الإلكتروني</label>
                  <input
                    required
                    type="email"
                    disabled={status.loading}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all disabled:opacity-50"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">الموضوع</label>
                <input
                  required
                  type="text"
                  disabled={status.loading}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all disabled:opacity-50"
                  placeholder="كيف يمكننا مساعدتك؟"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="mb-10">
                <label className="block text-sm font-bold text-gray-700 mb-3">الرسالة</label>
                <textarea
                  required
                  rows={5}
                  disabled={status.loading}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all disabled:opacity-50"
                  placeholder="اكتب رسالتك هنا..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-amber-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status.loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
