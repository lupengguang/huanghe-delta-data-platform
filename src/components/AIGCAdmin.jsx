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
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-aigc" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-aigc)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-900/20 to-transparent"></div>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ icon, title, files, size, color, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedFiles, setAnimatedFiles] = useState(0);
  const [animatedSize, setAnimatedSize] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const targetFiles = parseInt(files.replace(/[^0-9]/g, ''));
      const targetSize = parseFloat(size.replace(/[^0-9.]/g, ''));
      const duration = 1500;
      const steps = 60;
      const incrementFiles = targetFiles / steps;
      const incrementSize = targetSize / steps;
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setAnimatedFiles(Math.min(Math.round(incrementFiles * current), targetFiles));
        setAnimatedSize(Math.min(parseFloat((incrementSize * current).toFixed(1)), targetSize));
        if (current >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay + 500);
    return () => clearTimeout(timer);
  }, [delay, files, size]);

  const colorMap = {
    blue: { bg: 'from-blue-600/20 to-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
    orange: { bg: 'from-orange-600/20 to-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    purple: { bg: 'from-purple-600/20 to-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-5 bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} transition-all duration-300 cursor-pointer ${
          isHovered ? `scale-105 shadow-lg ${colors.glow}` : 'shadow-md'
        }`}
      >
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-2 h-2 bg-red-500/50 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500/50 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500/50 rounded-full"></div>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 ${colors.text}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="text-white font-semibold mb-1">{title}</div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-white">{animatedFiles}</span>
          <span className="text-gray-500 text-sm mb-1">Files</span>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Storage</span>
            <span>{animatedSize} GB</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colors.text.replace('text-', 'bg-')} rounded-full transition-all duration-1000`}
              style={{ width: `${Math.min(animatedSize * 10, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function RecentFileItem({ name, date, size, color, icon, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer ${
          isHovered ? 'bg-blue-600/10 border-blue-500/30 scale-[1.02]' : ''
        }`}
      >
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-medium">{name}</div>
          <div className="text-gray-500 text-xs">{date}</div>
        </div>
        <div className="text-gray-500 text-sm">{size}</div>
      </div>
    </AnimatedSection>
  );
}

function AnalyticsChart() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const data = [
    { day: 'Sat', value: 40 },
    { day: 'Sun', value: 55 },
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 60 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 30 },
    { day: 'Fri', value: 25 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  const colors = [
    'from-blue-500 to-blue-400',
    'from-cyan-500 to-cyan-400',
    'from-green-500 to-green-400',
    'from-blue-500 to-blue-400',
    'from-blue-500 to-blue-400',
    'from-orange-500 to-orange-400',
    'from-cyan-500 to-cyan-400',
  ];

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold">Analytics</h3>
        <button className="text-gray-500 hover:text-white text-xs transition-colors">See more</button>
      </div>
      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((item, index) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full flex justify-center">
              <div
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                className={`w-6 rounded-t-lg bg-gradient-to-t ${colors[index]} transition-all duration-500 cursor-pointer ${
                  hoveredBar === index ? 'scale-110 shadow-lg shadow-blue-500/30' : ''
                }`}
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  animation: `grow 1s ease-out ${index * 0.1}s both`,
                }}
              >
                {hoveredBar === index && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    {item.value}%
                  </div>
                )}
              </div>
            </div>
            <span className="text-gray-500 text-xs">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorageDetails() {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = 12.93 / steps;
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setAnimatedPercent(Math.min(parseFloat((increment * current).toFixed(2)), 12.93));
        if (current >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const storageItems = [
    { icon: '📄', label: '文件管理', files: '1,328 Files', size: '1.3GB', color: 'bg-blue-600/20 border-blue-500/30 text-blue-400' },
    { icon: '🎬', label: '视频存储', files: '1,328 Files', size: '18.1GB', color: 'bg-cyan-600/20 border-cyan-500/30 text-cyan-400' },
    { icon: '📁', label: '其他文件存储', files: '1,328 Files', size: '12.7GB', color: 'bg-yellow-600/20 border-yellow-500/30 text-yellow-400' },
    { icon: '📦', label: '压缩包存储', files: '1,328 Files', size: '1.3GB', color: 'bg-red-600/20 border-red-500/30 text-red-400' },
  ];

  return (
    <AnimatedSection delay={400}>
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <h3 className="text-white font-semibold mb-4">存储详情</h3>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(animatedPercent / 128) * 283} 283`}
              className="transition-all duration-1500 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="30%" stopColor="#f59e0b" />
                <stop offset="60%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{animatedPercent}</span>
            <span className="text-gray-500 text-xs">of 128GB</span>
          </div>
        </div>
        <div className="space-y-3">
          {storageItems.map((item, index) => (
            <AnimatedSection key={index} delay={600 + index * 100}>
              <div className={`flex items-center gap-3 p-2 rounded-lg ${item.color} cursor-pointer hover:scale-[1.02] transition-transform`}>
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-white text-sm">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.files}</div>
                </div>
                <div className="text-white text-sm">{item.size}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function AIGCAdmin() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: '仪表盘', icon: '📊' },
    { id: 'transactions', label: '交易记录', icon: '📋' },
    { id: 'tasks', label: '任务', icon: '✅' },
    { id: 'documents', label: '文档', icon: '📄' },
    { id: 'store', label: '商店', icon: '🛒' },
    { id: 'notifications', label: '通知', icon: '🔔' },
    { id: 'profile', label: '个人资料', icon: '👤' },
    { id: 'settings', label: '设置', icon: '⚙️' },
  ];

  const statCards = [
    { icon: '📄', title: '文件数据', files: '1,328 Files', size: '1.3GB', color: 'blue' },
    { icon: '☁️', title: 'Google云服务', files: '2,328 Files', size: '2.9GB', color: 'orange' },
    { icon: '☁️', title: 'One Drive', files: '1,016 Files', size: '1.7GB', color: 'cyan' },
    { icon: '📊', title: '数据', files: '328 Files', size: '1.1GB', color: 'purple' },
  ];

  const recentFiles = [
    { name: 'Xd File', date: '01-03-2021', size: '3.5mb', color: 'bg-pink-600/20', icon: '🎨' },
    { name: 'Figma File', date: '27-02-2021', size: '19mb', color: 'bg-purple-600/20', icon: '🎯' },
    { name: 'Documetns', date: '27-02-2021', size: '19mb', color: 'bg-red-600/20', icon: '📝' },
    { name: 'Documetns', date: '23-02-2021', size: '15mb', color: 'bg-red-600/20', icon: '📝' },
    { name: 'Sound File', date: '21-02-2021', size: '40mb', color: 'bg-orange-600/20', icon: '🎵' },
    { name: 'Media', date: '20-02-2021', size: '15mb', color: 'bg-orange-600/20', icon: '📷' },
    { name: 'Media', date: '20-02-2021', size: '15mb', color: 'bg-orange-600/20', icon: '📷' },
    { name: 'Sals PDF', date: '21-02-2021', size: '9mb', color: 'bg-green-600/20', icon: '📕' },
    { name: 'Excel File', date: '21-02-2021', size: '11mb', color: 'bg-blue-600/20', icon: '📗' },
  ];

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative">
      <GridBackground />
      
      <div className="relative z-10 flex min-h-screen">
        <aside className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AIGC Admin
            </div>
            <div className="text-gray-500 text-xs mt-1">Delta Platform</div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeNav === item.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-3">
            <button
              onClick={handleBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>退出登录</span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-white">黄河三角洲资源环境科学数据平台管理员页面</h1>
                  <p className="text-gray-500 text-sm mt-1">Welcome, AIGC 王宇欣</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
                    />
                  </div>
                  
                  <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">A</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">AIGC: 王宇欣</div>
                      <div className="text-gray-500 text-xs">管理员</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">全部文件</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} delay={index * 150} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AnimatedSection delay={300}>
                  <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-semibold">Recent Files</h3>
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">See more</button>
                    </div>
                    <div className="space-y-2">
                      {recentFiles.map((file, index) => (
                        <RecentFileItem key={index} {...file} delay={400 + index * 50} />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={500}>
                  <AnalyticsChart />
                </AnimatedSection>
              </div>

              <div>
                <StorageDetails />
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

export default AIGCAdmin;