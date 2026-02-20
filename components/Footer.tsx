
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0d2137] border-t border-white/10 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-6">
              <img 
                src="/images/khalidicon.png" 
                alt="شعار" 
                style={{ width: '233px', height: '225px', marginTop: '-98px', marginBottom: '-85px' }}
                className="object-contain"
              />
            </Link>
            <p className="text-blue-100/70 leading-relaxed mb-8">
              منصتكم الأولى لاكتشاف ومشاركة الأنشطة الفعالة. نؤمن بأن الحركة هي الحياة، والتعلم المستمر هو سر النجاح.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-blue-100/50 hover:bg-amber-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              {[
                { label: 'الرئيسية', path: '/' },
                { label: 'الأنشطة', path: '/activities' },
                { label: 'المدونة', path: '/blog' },
                { label: 'عن المنصة', path: '/about' },
                { label: 'اتصل بنا', path: '/contact' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-blue-100/70 hover:text-amber-500 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">تصنيفات الأنشطة</h4>
            <ul className="space-y-4">
              {['أنشطة سياسية', 'أنشطة جمعوية', 'تكوينات'].map((item, i) => (
                <li key={i}>
                  <Link to="/activities" className="text-blue-100/70 hover:text-amber-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">معلومات التواصل</h4>
            <ul className="space-y-4">
              <li className="text-blue-100/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                contact@anshitaty.ma
              </li>
              <li className="text-blue-100/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                +212 5 22 00 00 00
              </li>
              <li className="text-blue-100/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                الدار البيضاء، المغرب
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-100/40 text-sm">
            © 2024 جميع الحقوق محفوظة لWin Way Business.
          </p>
          <div className="flex items-center gap-2 text-sm text-blue-100/40">
            تم التطوير بكل <Heart className="w-4 h-4 text-red-500 fill-red-500" /> في المغرب
          </div>
        </div>
      </div>
      
      {/* Admin Link (Hidden/Discreet) */}
      {/* <div className="max-w-7xl mx-auto px-4 mt-4 text-center">
        <Link to="/admin" className="text-white/20 text-xs hover:text-amber-500 transition-colors">
          Admin Login
        </Link>
      </div> */}
    </footer>
  );
};

export default Footer;
