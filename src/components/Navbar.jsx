import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCatalogClick = () => {
    if (location.pathname === '/database-catalog') {
      window.location.href = '/database-catalog';
    } else {
      navigate('/database-catalog');
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="glass-nav">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold">黄</span>
              </div>
              <span className="text-xl font-bold text-white">黄河三角洲资源环境科学数据平台</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">网站首页</Link>
              <button 
                onClick={handleCatalogClick}
                className="text-gray-300 hover:text-blue-400 font-medium cursor-pointer transition-colors"
              >
                数据库目录
              </button>
              <Link to="/other-results" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">其他成果</Link>
              <Link to="/help-center" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">帮助中心</Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLoginClick}
                className="login-btn flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:inline">登录</span>
              </button>
              
              <button className="md:hidden text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}

export default Navbar;