import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function StorageRing({ used, total, color }) {
  const percentage = (used / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(230, 230, 240, 0.3)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1500 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{used}</span>
        <span className="text-xs text-gray-500">GB</span>
      </div>
    </div>
  );
}

function QuickAccessCard({ title, files, size, color, icon, badge }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = {
    purple: 'from-purple-600 to-purple-700 text-white',
    blue: 'from-blue-500 to-blue-600 text-white',
    gray: 'from-gray-100 to-gray-200 text-gray-700',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-4 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden ${
        color === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-700' : 'bg-white'
      } ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}`}
    >
      {badge && (
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs ${
          color === 'purple' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-600'
        }`}>
          +{badge}
        </div>
      )}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
        color === 'purple' ? 'bg-white/20' : 'bg-gray-100'
      }`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className={`font-semibold text-sm mb-1 ${color === 'purple' ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </div>
      <div className={`text-xs ${color === 'purple' ? 'text-purple-200' : 'text-gray-500'}`}>
        {files} files
      </div>
      {size && (
        <div className={`text-xs mt-1 ${color === 'purple' ? 'text-purple-200' : 'text-gray-500'}`}>
          {size} MB
        </div>
      )}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : ''
      } ${color === 'purple' ? 'bg-white/10' : 'bg-gray-50'}`} />
    </div>
  );
}

function FolderCard({ name, files, size }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-4 rounded-xl bg-white border border-gray-100 transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-lg scale-[1.02] border-purple-200' : 'shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
          <span className="text-xl">📁</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 text-sm truncate">{name}</div>
          <div className="text-xs text-gray-500 mt-1">{files} files</div>
          <div className="text-xs text-gray-500">{size}</div>
        </div>
        <div className={`opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function RecentFileRow({ name, date, members, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
        isHovered ? 'bg-purple-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className={`w-8 h-8 rounded flex items-center justify-center ${
        icon === 'mp4' ? 'bg-blue-100' : icon === 'zip' ? 'bg-purple-100' : 'bg-red-100'
      }`}>
        <span className="text-sm">
          {icon === 'mp4' ? '🎬' : icon === 'zip' ? '📦' : '📄'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 truncate">{name}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
      <div className="text-xs text-gray-500">{members}</div>
      <div className={`opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
        <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CloudStorage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('myfiles');

  const navItems = [
    { id: 'home', icon: '🏠', label: '首页' },
    { id: 'myfiles', icon: '📁', label: '我的文件', hasSub: true },
    { id: 'shared', icon: '👥', label: '共享' },
    { id: 'recent', icon: '🕐', label: '最近' },
    { id: 'starred', icon: '⭐', label: '收藏' },
    { id: 'trash', icon: '🗑️', label: '回收站' },
    { id: 'settings', icon: '⚙️', label: '设置' },
  ];

  const subNavItems = [
    { id: 'assets', label: '资产' },
    { id: 'marketing', label: '营销' },
    { id: 'personal', label: '个人资料' },
    { id: 'info', label: '信息组合' },
    { id: 'project', label: '项目' },
    { id: 'other', label: '其他' },
  ];

  const quickAccessItems = [
    { title: 'Projects', files: 8, icon: '📁', color: 'purple', badge: 5 },
    { title: 'Brand Guideline.pdf', files: null, size: 12, icon: '📄', color: 'gray', badge: 8 },
    { title: 'MyVacation.mp4', files: null, size: 237, icon: '🎬', color: 'gray' },
  ];

  const folders = [
    { name: 'Projects', files: 453, size: '11 GB' },
    { name: 'Marketing', files: 84, size: '3.6 GB' },
    { name: 'Personal', files: 1872, size: '8.9 GB' },
    { name: 'Portfolio', files: 576, size: '6 GB' },
  ];

  const recentFiles = [
    { name: 'MyVacation.mp4', date: 'Nov 11, 2021 | 12:54', members: 'Only you', icon: 'mp4' },
    { name: 'Project Brief & Assets.zip', date: 'Nov 10, 2021 | 11:15', members: '10 members', icon: 'zip' },
    { name: 'Logo Guideline.pdf', date: 'Nov 10, 2021 | 10:26', members: '6 members', icon: 'pdf' },
    { name: 'Landing Page Brief.pdf', date: 'Nov 9, 2021 | 09:37', members: '3 members', icon: 'pdf' },
  ];

  const storageStats = [
    { label: 'Videos', files: 302, size: '16.2 GB', color: '#FF6B6B' },
    { label: 'Photos', files: 1872, size: '12.1 GB', color: '#FFD93D' },
    { label: 'Documents', files: 576, size: '9 GB', color: '#6BCB77' },
    { label: 'Other Files', files: 249, size: '5.1 GB', color: '#4D96FF' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      <GridBackground />

      <div className="relative z-10 flex min-h-screen">
        <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold">MyCloud</span>
            </div>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New
            </button>
          </div>

          <nav className="flex-1 px-4 pb-4">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                    activeNav === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {item.hasSub && (
                    <svg className="ml-auto w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.hasSub && (
                  <div className="ml-6 mt-1 space-y-1">
                    {subNavItems.map((sub) => (
                      <button
                        key={sub.id}
                        className="w-full text-left px-3 py-2 text-sm text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your files..."
                  className="w-80 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">Hi, Adam</div>
                      <div className="text-xs text-gray-500">Premium</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6">
            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                <AnimatedSection delay={100}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Quick Access</h2>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View all</button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {quickAccessItems.map((item, index) => (
                      <QuickAccessCard key={index} {...item} />
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Folders</h2>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      <svg className="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      View all
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {folders.map((folder, index) => (
                      <FolderCard key={index} {...folder} />
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Recent Files</h2>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      <svg className="inline w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      View all
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    {recentFiles.map((file, index) => (
                      <RecentFileRow key={index} {...file} />
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              <aside className="w-72 space-y-6">
                <AnimatedSection delay={200}>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Storage</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <StorageRing used={42.4} total={50} color="#8B5CF6" />
                      <div>
                        <div className="text-sm text-gray-500">of 50 GB capacity</div>
                        <div className="text-xs text-gray-400 mt-1">You've used 84.8%</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {storageStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                            <span className="text-xs text-gray-600">{stat.label}</span>
                          </div>
                          <span className="text-xs text-gray-600">{stat.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Upgrade to PRO</h3>
                    <p className="text-sm text-gray-600 mb-4">Get more space for your storage and access to all features</p>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-200">
                      Upgrade Now
                    </button>
                  </div>
                </AnimatedSection>
              </aside>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}

export default CloudStorage;
