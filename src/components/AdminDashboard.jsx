import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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

function GlowingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-3xl"></div>
    </div>
  );
}

function SideNavItem({ icon, label, active = false, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      <div className={`transition-all duration-300 ${active || isHovered ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
      )}
    </button>
  );
}

function FileCard({ title, icon, files, size, color }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSize = 15;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((size / totalSize) * 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [size]);

  const colorClasses = {
    blue: { bg: 'bg-blue-500', glow: 'shadow-blue-500/50', text: 'text-blue-400' },
    orange: { bg: 'bg-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400' },
    cyan: { bg: 'bg-cyan-500', glow: 'shadow-cyan-500/50', text: 'text-cyan-400' },
    purple: { bg: 'bg-purple-500', glow: 'shadow-purple-500/50', text: 'text-purple-400' },
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-xl ' + colorClasses[color].glow : ''
      }`}
    >
      <div className="absolute top-3 right-3 flex gap-1">
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
      </div>

      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/10 ${isHovered ? 'scale-110' : ''} transition-transform`}>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="text-white font-semibold mb-2">{title}</div>
      <div className="text-gray-500 text-sm mb-3">{files} Files</div>

      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color].bg} transition-all duration-1000`}
          style={{ width: `${progress}%`, boxShadow: `0 0 10px ${colorClasses[color].bg}` }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className={colorClasses[color].text}>{size}GB</span>
        <span className="text-gray-500 text-xs">of {totalSize}GB</span>
      </div>
    </div>
  );
}

function StorageRing({ used, total }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const sectionRef = useRef(null);
  const percentage = (used / total) * 100;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const duration = 2000;
          const steps = 60;
          const increment = used / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= used) {
              setDisplayValue(used);
              clearInterval(timer);
            } else {
              setDisplayValue(current.toFixed(1));
            }
          }, duration / steps);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [used]);

  return (
    <div ref={sectionRef} className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="url(#storageGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isVisible ? strokeDashoffset : circumference}
          className="transition-all duration-1500"
          style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }}
        />
        <defs>
          <linearGradient id="storageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{displayValue}</span>
        <span className="text-gray-500 text-sm">of {total}GB</span>
      </div>
    </div>
  );
}

function StorageItem({ icon, label, files, size, color }) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: 'border-blue-500/30 hover:border-blue-500/50',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/50',
    yellow: 'border-yellow-500/30 hover:border-yellow-500/50',
    red: 'border-red-500/30 hover:border-red-500/50',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-3 p-3 rounded-lg border bg-white/5 transition-all duration-300 ${colorClasses[color]} ${isHovered ? 'bg-white/10 scale-[1.02]' : ''}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 ${isHovered ? 'scale-110' : ''} transition-transform`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{label}</div>
        <div className="text-gray-500 text-xs">{files} Files</div>
      </div>
      <div className="text-white font-bold">{size}</div>
    </div>
  );
}

function RecentFile({ icon, name, date, size, color }) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    pink: 'bg-pink-500/20 text-pink-400',
    purple: 'bg-purple-500/20 text-purple-400',
    blue: 'bg-blue-500/20 text-blue-400',
    orange: 'bg-orange-500/20 text-orange-400',
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 ${isHovered ? 'bg-white/10' : ''}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{name}</div>
        <div className="text-gray-500 text-xs">{date}</div>
      </div>
      <div className="text-gray-400 text-sm">{size}</div>
    </div>
  );
}

function AnalyticsBar({ value, day, maxValue }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const heightPercentage = (value / maxValue) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const colors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div ref={sectionRef} className="flex flex-col items-center gap-2">
      <div className="w-8 bg-white/5 rounded-t-lg overflow-hidden relative group">
        <div
          className="w-full rounded-t-lg transition-all duration-1000 ease-out relative"
          style={{
            height: isVisible ? `${heightPercentage}%` : '0%',
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>
        </div>
      </div>
      <span className="text-gray-500 text-xs font-medium">{day}</span>
    </div>
  );
}

function UserMenu({ isOpen, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
          isOpen || isHovered ? 'bg-white/10' : ''
        }`}
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-white text-sm font-semibold">全栈开发: 陆鹏光</div>
          <div className="text-gray-500 text-xs">管理员</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-lg border border-white/10 shadow-xl z-50">
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-semibold">陆鹏光</div>
                <div className="text-gray-500 text-xs">CEO / 管理员</div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              个人资料
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              设置
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('documents');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [switchTab, setSwitchTab] = useState('accounts');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const accounts = [
    { id: 1, name: 'AIGC 王宇欣', role: '管理员' },
    { id: 2, name: '全栈 陆鹏光', role: '管理员' },
    { id: 4, name: '销售 赵文琪', role: '管理员' },
  ];

  const handleSwitchSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSwitchModal(false);
      if (selectedAccount === 1) {
        navigate('/cloud-storage');
      }
    }, 1500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSwitchModal(false);
    }, 1500);
  };

  const navItems = [
    { id: 'dashboard', label: '仪表盘', icon: '📊' },
    { id: 'transactions', label: '交易记录', icon: '📋' },
    { id: 'tasks', label: '任务', icon: '✅' },
    { id: 'documents', label: '文档', icon: '📁' },
    { id: 'store', label: '商店', icon: '🛒' },
    { id: 'notifications', label: '通知', icon: '🔔' },
    { id: 'profile', label: '个人资料', icon: '👤' },
    { id: 'settings', label: '设置', icon: '⚙️' },
  ];

  const fileCards = [
    { title: '文件数据', icon: '📁', files: 1328, size: 13, color: 'blue' },
    { title: 'Google云服务', icon: '☁️', files: 2320, size: 2.9, color: 'orange' },
    { title: 'One Drive', icon: '☁️', files: 1816, size: 1.7, color: 'cyan' },
    { title: '数据', icon: '💾', files: 328, size: 1.1, color: 'purple' },
  ];

  const recentFiles = [
    { icon: '📱', name: 'Xd File', date: '01-03-2021', size: '3.5mb', color: 'pink' },
    { icon: '🎨', name: 'Figma File', date: '27-02-2021', size: '19mb', color: 'purple' },
    { icon: '📄', name: 'Documetns', date: '27-02-2021', size: '15mb', color: 'blue' },
    { icon: '📄', name: 'Documetns', date: '23-02-2021', size: '15mb', color: 'blue' },
    { icon: '🎵', name: 'Sound File', date: '21-02-2021', size: '40mb', color: 'orange' },
    { icon: '🎬', name: 'Media', date: '20-02-2021', size: '15mb', color: 'green' },
    { icon: '🎬', name: 'Media', date: '20-02-2021', size: '15mb', color: 'yellow' },
    { icon: '📊', name: 'Sals PDF', date: '21-02-2021', size: '9mb', color: 'green' },
    { icon: '📊', name: 'Excel File', date: '21-02-2021', size: '11mb', color: 'cyan' },
  ];

  const storageItems = [
    { icon: '📁', label: '文件管理', files: 1328, size: '1.3GB', color: 'blue' },
    { icon: '🎬', label: '视频存储', files: 1328, size: '15.1GB', color: 'cyan' },
    { icon: '📂', label: '其他文件存储', files: 1328, size: '12.7GB', color: 'yellow' },
    { icon: '🗜️', label: '压缩包存储', files: 428, size: '1.3GB', color: 'red' },
  ];

  const analyticsData = [
    { day: 'Sat', value: 35 },
    { day: 'Sun', value: 50 },
    { day: 'Mon', value: 60 },
    { day: 'Tue', value: 20 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 25 },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      <GlowingBackground />
      
      <div className="relative z-10 flex min-h-screen">
        <aside className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">管</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">管理员页面</h1>
                <p className="text-gray-500 text-xs">黄河三角洲数据平台</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <SideNavItem
                key={item.id}
                icon={<span className="text-lg">{item.icon}</span>}
                label={item.label}
                active={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">切换管理员账号</div>
                  <div className="text-gray-500 text-xs">点击切换</div>
                </div>
              </div>
              <button 
                onClick={() => setShowSwitchModal(true)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                点击切换
              </button>
            </div>

            <button
              onClick={handleBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>离开</span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    返回首页
                  </button>
                  <div className="h-6 w-px bg-white/10"></div>
                  <h2 className="text-xl font-bold text-white">全部文件</h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New
                  </button>

                  <UserMenu isOpen={showUserMenu} onToggle={() => setShowUserMenu(!showUserMenu)} />
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-6 py-6">
            <AnimatedSection className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fileCards.map((card, index) => (
                  <FileCard
                    key={index}
                    title={card.title}
                    icon={card.icon}
                    files={card.files}
                    size={card.size}
                    color={card.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <AnimatedSection delay={100}>
                  <div className="glass-card rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-white">Recent Files</h3>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors">
                        See more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                      <button className="text-white text-sm font-medium">File Name</button>
                      <button className="text-gray-500 text-sm hover:text-white transition-colors">Date</button>
                      <button className="text-gray-500 text-sm hover:text-white transition-colors">Size</button>
                    </div>

                    <div className="space-y-2">
                      {recentFiles.map((file, index) => (
                        <RecentFile
                          key={index}
                          icon={file.icon}
                          name={file.name}
                          date={file.date}
                          size={file.size}
                          color={file.color}
                        />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <div className="glass-card rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-white">Analytics</h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between h-48 gap-4">
                      {analyticsData.map((item, index) => (
                        <AnalyticsBar key={index} value={item.value} day={item.day} maxValue={100} />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="space-y-6">
                <AnimatedSection delay={300}>
                  <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">存储详情</h3>
                    <StorageRing used={29.1} total={128} />
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={400}>
                  <div className="glass-card rounded-xl p-6 border border-white/10 space-y-3">
                    {storageItems.map((item, index) => (
                      <StorageItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        files={item.files}
                        size={item.size}
                        color={item.color}
                      />
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSwitchModal(false)}
          />
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:opacity-80" onClick={() => setShowSwitchModal(false)}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex border-b border-white/10 mt-8">
                <button
                  onClick={() => setSwitchTab('accounts')}
                  className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                    switchTab === 'accounts'
                      ? 'text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  管理员账号
                </button>
                <button
                  onClick={() => setSwitchTab('login')}
                  className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                    switchTab === 'login'
                      ? 'text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  后台登录
                </button>
              </div>
              <div className="p-6">
                {switchTab === 'accounts' ? (
                  <div className="space-y-3">
                    {accounts.map((account) => (
                      <button
                        key={account.id}
                        onClick={() => setSelectedAccount(account.id)}
                        className={`w-full p-3 rounded-lg border transition-all duration-300 text-left flex items-center gap-3 ${
                          selectedAccount === account.id
                            ? 'bg-blue-600/30 border-blue-500/50 shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${selectedAccount === account.id ? 'bg-blue-500/30' : 'bg-white/10'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${selectedAccount === account.id ? 'text-blue-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${selectedAccount === account.id ? 'text-blue-300' : 'text-white'}`}>{account.name}</div>
                          <div className="text-gray-500 text-xs">{account.role}</div>
                        </div>
                        {selectedAccount === account.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                    <button
                      onClick={handleSwitchSubmit}
                      disabled={isLoading || !selectedAccount}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          切换中...
                        </>
                      ) : (
                        '切换账号'
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">请输入账号</label>
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="请输入账号"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">请输入密码</label>
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="请输入密码"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-offset-0" />
                        <span>记住密码</span>
                      </label>
                      <button type="button" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">忘记密码</button>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !username || !password}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          登录中...
                        </>
                      ) : (
                        '后台登录'
                      )}
                    </button>
                    <div className="text-center">
                      <span className="text-gray-500 text-sm">没有账号？</span>
                      <button type="button" className="text-blue-400 text-sm hover:text-blue-300 transition-colors ml-1">立即注册</button>
                    </div>
                  </form>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;