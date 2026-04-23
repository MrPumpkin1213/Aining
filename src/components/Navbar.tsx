import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Calculator, Brain, Heart, Ghost, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', name: '首頁', icon: Home },
    { path: '/countdown', name: '考試倒數', icon: Clock },
    { path: '/grade', name: '成績計算', icon: Calculator },
    { path: '/quiz', name: '心理測驗', icon: Brain },
    { path: '/mood', name: '心情紀錄', icon: Heart },
    { path: '/joke', name: '地獄梗區', icon: Ghost },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Clock className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">時間壓力緩解區</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-gray-100 bg-white px-2 py-2 gap-2 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Icon className="w-3 h-3" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
