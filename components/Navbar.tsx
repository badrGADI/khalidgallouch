
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'الرئيسية' },
    { path: '/activities', label: 'الأنشطة' },
    { path: '/gallery', label: 'المعرض' },
    { path: '/blog', label: 'المدونة' },
    { path: '/about', label: 'عن المنصة' },
    { path: '/contact', label: 'اتصل بنا' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col items-center gap-0 group pt-2 pb-2">
          <img 
            src="/images/khalidicon.png" 
            alt="شعار" 
            className="h-60 w-auto object-contain group-hover:scale-110 transition-transform" 
          />
          {/* <span className="text-white text-xl font-black tracking-tight mt-1">خالد الكلوش</span> */}
        </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-amber-600 focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
