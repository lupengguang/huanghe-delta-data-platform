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

function WaterWaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute bottom-0 left-0 w-full h-full">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="url(#waveGradient)" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full" style={{ transform: 'translateY(20px)' }}>
        <svg className="w-full h-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="url(#waveGradient2)" 
            d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,229.3C672,224,768,192,864,181.3C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-20px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .absolute.bottom-0 svg {
          animation: waveMove 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`,
            backgroundColor: i % 5 === 0 ? '#10b981' : i % 5 === 1 ? '#06b6d4' : i % 5 === 2 ? '#3b82f6' : i % 5 === 3 ? '#8b5cf6' : '#0ea5e9',
            animation: `floatUp ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          25% { transform: translateY(-40px) translateX(20px) scale(1.2); opacity: 0.7; }
          50% { transform: translateY(-20px) translateX(-10px) scale(1); opacity: 0.5; }
          75% { transform: translateY(-60px) translateX(15px) scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

function DataFlowAnimation() {
  const [flowItems, setFlowItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowItems(prev => {
        const newItem = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        };
        const updated = [...prev, newItem];
        setTimeout(() => {
          setFlowItems(p => p.filter(item => item.id !== newItem.id));
        }, 3000);
        return updated.slice(-8);
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flowItems.map(item => (
        <div
          key={item.id}
          className="absolute w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-transparent"
          style={{
            left: `${item.left}%`,
            top: '-32px',
            animation: `dataFlow 3s ease-in-out forwards`,
            animationDelay: `${item.delay}s`,
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
          }}
        />
      ))}
      <style>{`
        @keyframes dataFlow {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value, unit, description, color = 'green', animated = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  
  useEffect(() => {
    if (animated && value) {
      const num = parseFloat(value.replace(/[^\d.]/g, ''));
      if (!isNaN(num)) {
        const duration = 2500;
        const steps = 80;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            const suffix = value.replace(/[\d.]/g, '');
            const finalValue = value.includes('.') ? current.toFixed(1) : Math.floor(current);
            setDisplayValue(finalValue + suffix);
          }
        }, duration / steps);
        return () => clearInterval(timer);
      }
    }
    setDisplayValue(value);
  }, [value, animated]);

  const colorClasses = {
    green: { bg: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/50' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-800/20', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    blue: { bg: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/50' },
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
    teal: { bg: 'from-teal-600/20 to-teal-800/20', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/50' },
    emerald: { bg: 'from-emerald-600/20 to-emerald-800/20', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/50' },
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} hover:shadow-xl ${colorClasses[color].glow} ${isHovered ? 'scale-105' : ''}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-500 ${isHovered ? 'from-green-600 to-cyan-600' : 'from-white/10 to-white/5'}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className={`text-3xl font-bold ${colorClasses[color].text} mb-1`}>
          {displayValue}
          {unit && <span className="text-lg ml-1">{unit}</span>}
        </div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
}

function ProgressRing({ value, max, label, color, icon }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <div ref={sectionRef} className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            className="transition-all duration-1500"
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

function ProjectCard({ icon, title, value, unit, description, stats, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = {
    water: 'from-blue-600/30 to-cyan-600/30 border-blue-500/30 hover:border-blue-500/50',
    land: 'from-green-600/30 to-emerald-600/30 border-green-500/30 hover:border-green-500/50',
    plant: 'from-emerald-600/30 to-teal-600/30 border-emerald-500/30 hover:border-emerald-500/50',
    wave: 'from-cyan-600/30 to-blue-600/30 border-cyan-500/30 hover:border-cyan-500/50',
    invasive: 'from-orange-600/30 to-red-600/30 border-orange-500/30 hover:border-orange-500/50',
    habitat: 'from-teal-600/30 to-green-600/30 border-teal-500/30 hover:border-teal-500/50',
  };

  return (
    <div 
      className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colors[color]} ${isHovered ? 'scale-102 shadow-xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-gray-500">{unit}</div>
        </div>
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, index) => (
            <span key={index} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
              {stat.label}: {stat.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ComparisonCard({ label, before, after, unit, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = ((after - before) / before * 100).toFixed(0);

  return (
    <div 
      className={`glass-card p-6 border border-white/10 transition-all duration-500 ${isHovered ? 'border-green-500/30 shadow-xl shadow-green-500/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600/20 to-cyan-600/20 flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <h4 className="text-white font-semibold">{label}</h4>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">修复前</div>
          <div className="text-lg font-bold text-gray-400">{before}</div>
          <div className="text-xs text-gray-600">{unit}</div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <div className={`text-xl font-bold ${percentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {percentage > 0 ? '+' : ''}{percentage}%
          </div>
          <div className="text-xs text-gray-500">提升</div>
        </div>
        <div className="text-center p-3 bg-green-600/10 rounded-lg border border-green-500/20">
          <div className="text-xs text-green-400 mb-1">修复后</div>
          <div className="text-lg font-bold text-green-400">{after}</div>
          <div className="text-xs text-gray-600">{unit}</div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    cyan: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    teal: 'bg-teal-600/30 text-teal-300 border border-teal-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function WetlandRestoration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('scale');
  
  const tabs = [
    { id: 'scale', label: '修复工程规模' },
    { id: 'effect', label: '修复成效监测' },
    { id: 'water', label: '生态补水调控' },
  ];

  const stats = [
    { icon: '💧', label: '水系连通', value: '241', unit: '公里', description: '疏通潮沟76公里', color: 'blue', animated: true },
    { icon: '🌊', label: '湿地恢复', value: '7.4', unit: '万亩', description: '新增淡水湿地', color: 'cyan', animated: true },
    { icon: '🌿', label: '植被恢复', value: '5.2', unit: '万亩', description: '恢复盐地碱蓬', color: 'green', animated: true },
    { icon: '🚰', label: '生态补水', value: '5.3', unit: '亿立方米', description: '近3年累计', color: 'teal', animated: true },
    { icon: '🔄', label: '入侵治理', value: '13.1', unit: '万亩', description: '治理互花米草', color: 'purple', animated: true },
    { icon: '🦪', label: '生境构建', value: '2.6', unit: '万亩', description: '构建牡蛎礁、贝藻礁', color: 'emerald', animated: true },
  ];

  const projects = [
    { 
      icon: '🌊', 
      title: '水系连通工程', 
      value: '241', 
      unit: '公里', 
      description: '疏通潮沟76公里，连通水系241公里，构建完整的湿地水网系统',
      stats: [{ label: '潮沟疏通', value: '76公里' }, { label: '水系连通', value: '241公里' }],
      color: 'water',
    },
    { 
      icon: '🏞️', 
      title: '湿地恢复工程', 
      value: '7.4', 
      unit: '万亩', 
      description: '新增淡水湿地7.4万亩，修复湿地7.25万亩，显著提升湿地生态功能',
      stats: [{ label: '新增湿地', value: '7.4万亩' }, { label: '修复湿地', value: '7.25万亩' }],
      color: 'land',
    },
    { 
      icon: '🌿', 
      title: '植被恢复工程', 
      value: '5.2', 
      unit: '万亩', 
      description: '恢复盐地碱蓬5.2万亩，修复盐地碱蓬和海草床4.7万亩',
      stats: [{ label: '恢复碱蓬', value: '5.2万亩' }, { label: '修复海草床', value: '4.7万亩' }],
      color: 'plant',
    },
    { 
      icon: '💧', 
      title: '生态补水工程', 
      value: '5.3', 
      unit: '亿立方米', 
      description: '近3年生态补水达5.3亿立方米，保障湿地生态用水需求',
      stats: [{ label: '补水总量', value: '5.3亿m³' }, { label: '实施年限', value: '3年' }],
      color: 'wave',
    },
    { 
      icon: '🔄', 
      title: '入侵物种治理', 
      value: '13.1', 
      unit: '万亩', 
      description: '治理互花米草13.1万亩，保护本土生态系统',
      stats: [{ label: '治理面积', value: '13.1万亩' }, { label: '治理物种', value: '互花米草' }],
      color: 'invasive',
    },
    { 
      icon: '🦪', 
      title: '生境构建工程', 
      value: '2.6', 
      unit: '万亩', 
      description: '构建牡蛎礁、贝藻礁2.6万亩，恢复海洋生态系统',
      stats: [{ label: '牡蛎礁', value: '2.6万亩' }, { label: '贝藻礁', value: '2.6万亩' }],
      color: 'habitat',
    },
  ];

  const effectStats = [
    { icon: '🔬', label: '技术应用面积', value: '3200', unit: '公顷', description: '退化湿地修复技术体系成功应用' },
    { icon: '🌱', label: '野大豆保育区', value: '7.46', unit: '万亩', description: '划定野大豆保育区' },
    { icon: '🌳', label: '柳树种质资源库', value: '1634', unit: '亩', description: '建设柳树林木种质资源库' },
    { icon: '🐦', label: '鸟类栖息地改善', value: '显著', unit: '', description: '湿地修复后鸟类数量增加' },
  ];

  const waterRegulation = [
    { label: '引提水能力', before: '<40', after: '131', unit: '立方米/秒', icon: '🚰' },
    { label: '引黄闸数量', before: '0', after: '6', unit: '座', icon: '🏗️' },
    { label: '生态补水量', before: '0', after: '5.3', unit: '亿立方米', icon: '💧' },
    { label: '湿地恢复面积', before: '0', after: '14.65', unit: '万亩', icon: '🌊' },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>

        <AnimatedSection className="mb-12">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-teal-900/50 to-cyan-900/60"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.4) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}></div>
            </div>
            <WaterWaveBackground />
            <FloatingParticles />
            <DataFlowAnimation />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-green-600/40 to-cyan-600/40 flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl">🌿</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-green-500/20 animate-pulse"></div>
                  <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-cyan-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge variant="green">湿地保护</Badge>
                    <Badge variant="cyan">生态修复</Badge>
                    <Badge variant="teal">工程成效</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    湿地保护修复：工程成效的量化见证
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    围绕"陆海生态系统一体化保护修复"，数据资源精确记录了修复工程的规模与成效，见证了湿地生态系统的恢复与改善。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-cyan-600 text-white shadow-lg shadow-green-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                description={stat.description}
                color={stat.color}
                animated={stat.animated}
              />
            ))}
          </div>
        </AnimatedSection>

        {activeTab === 'scale' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">📐</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">修复工程规模数据</h2>
                  <p className="text-gray-400 text-sm">陆海生态系统一体化保护修复工程</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    icon={project.icon}
                    title={project.title}
                    value={project.value}
                    unit={project.unit}
                    description={project.description}
                    stats={project.stats}
                    color={project.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                工程规模可视化
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { icon: '🌊', label: '水系连通', value: 241, max: 300, color: '#3b82f6' },
                    { icon: '🏞️', label: '湿地恢复', value: 7.4, max: 10, color: '#06b6d4' },
                    { icon: '🌿', label: '植被恢复', value: 5.2, max: 8, color: '#10b981' },
                    { icon: '💧', label: '生态补水', value: 5.3, max: 8, color: '#14b8a6' },
                    { icon: '🔄', label: '入侵治理', value: 13.1, max: 15, color: '#8b5cf6' },
                    { icon: '🦪', label: '生境构建', value: 2.6, max: 5, color: '#0ea5e9' },
                  ].map((item, index) => (
                    <ProgressRing
                      key={index}
                      value={item.value}
                      max={item.max}
                      label={item.label}
                      color={item.color}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📈</span>
                工程进度
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <div className="space-y-4">
                  {[
                    { label: '水系连通工程', progress: 95, color: '#3b82f6' },
                    { label: '湿地恢复工程', progress: 88, color: '#06b6d4' },
                    { label: '植被恢复工程', progress: 92, color: '#10b981' },
                    { label: '生态补水工程', progress: 85, color: '#14b8a6' },
                    { label: '入侵物种治理', progress: 90, color: '#8b5cf6' },
                    { label: '生境构建工程', progress: 75, color: '#0ea5e9' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">{item.label}</span>
                        <span className="text-white font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1500"
                          style={{ 
                            width: `${item.progress}%`, 
                            backgroundColor: item.color,
                            boxShadow: `0 0 10px ${item.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'effect' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-green-600/30 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">修复成效监测数据</h2>
                  <p className="text-gray-400 text-sm">量化评估修复工程效果</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  退化湿地修复技术体系已成功应用于 <span className="text-green-400 font-semibold">3200公顷</span> 的修复工程。
                  保护区内还划定了 <span className="text-cyan-400 font-semibold">野大豆保育区7.46万亩</span>、
                  <span className="text-teal-400 font-semibold">柳树林木种质资源库1634亩</span> 等，
                  有效保护了珍稀濒危物种的栖息地。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="green">3200公顷修复工程</Badge>
                  <Badge variant="cyan">野大豆保育区</Badge>
                  <Badge variant="teal">柳树种质资源库</Badge>
                  <Badge variant="purple">珍稀物种保护</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {effectStats.map((stat, index) => (
                  <div 
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600/20 to-cyan-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                    <div className="text-white font-semibold text-lg">{stat.value} {stat.unit}</div>
                    <div className="text-gray-500 text-xs mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>🌱</span>
                保育区与资源库
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 border border-green-500/30 bg-green-600/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 flex items-center justify-center">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">野大豆保育区</h4>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-3xl font-bold text-green-400">7.46</div>
                          <div className="text-xs text-gray-500">万亩</div>
                        </div>
                        <div className="h-10 w-px bg-white/20"></div>
                        <div>
                          <div className="text-sm text-gray-400">国家二级保护植物</div>
                          <div className="text-xs text-gray-500">珍稀濒危物种</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border border-cyan-500/30 bg-cyan-600/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-600/40 to-teal-600/40 flex items-center justify-center">
                      <span className="text-3xl">🌳</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">柳树林木种质资源库</h4>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-3xl font-bold text-cyan-400">1634</div>
                          <div className="text-xs text-gray-500">亩</div>
                        </div>
                        <div className="h-10 w-px bg-white/20"></div>
                        <div>
                          <div className="text-sm text-gray-400">本土树种保护</div>
                          <div className="text-xs text-gray-500">种质资源保存</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📈</span>
                修复成效对比
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: '植被覆盖率', before: '45%', after: '78%', icon: '🌿', color: '#10b981' },
                  { label: '鸟类种类', before: '280种', after: '376种', icon: '🐦', color: '#3b82f6' },
                  { label: '湿地面积', before: '45万亩', after: '60万亩', icon: '🌊', color: '#06b6d4' },
                  { label: '生态系统健康指数', before: '0.55', after: '0.82', icon: '💚', color: '#14b8a6' },
                ].map((item, index) => {
                  const beforeNum = parseFloat(item.before.replace(/[^\d.]/g, ''));
                  const afterNum = parseFloat(item.after.replace(/[^\d.]/g, ''));
                  const percentage = ((afterNum - beforeNum) / beforeNum * 100).toFixed(0);
                  
                  return (
                    <div 
                      key={index}
                      className="glass-card p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <span>{item.icon}</span>
                        </div>
                        <span className="text-white font-medium">{item.label}</span>
                        <span className={`ml-auto text-sm font-bold ${percentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {percentage > 0 ? '+' : ''}{percentage}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gray-500"
                            style={{ width: `${(beforeNum / Math.max(beforeNum, afterNum)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-16 text-right">{item.before}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${(afterNum / Math.max(beforeNum, afterNum)) * 100}%`, 
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                        <span className="text-xs text-green-400 w-16 text-right">{item.after}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'water' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">生态补水调控数据</h2>
                  <p className="text-gray-400 text-sm">科学的补水体系构建</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  通过新建、改建 <span className="text-cyan-400 font-semibold">6座引黄闸（船）</span>，
                  将保护区内引提水能力从不足 <span className="text-gray-400 font-semibold">40立方米/秒</span>
                  提升至 <span className="text-green-400 font-semibold">131立方米/秒</span>，
                  形成了科学的补水体系，保障湿地生态用水需求。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="cyan">6座引黄闸</Badge>
                  <Badge variant="green">131m³/s</Badge>
                  <Badge variant="blue">科学补水体系</Badge>
                  <Badge variant="teal">生态用水保障</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <span>📈</span>
                能力提升对比
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {waterRegulation.map((item, index) => (
                  <ComparisonCard
                    key={index}
                    label={item.label}
                    before={item.before}
                    after={item.after}
                    unit={item.unit}
                    icon={item.icon}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🏗️</span>
                引黄闸建设
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div 
                      key={num}
                      className="glass-card p-4 border border-cyan-500/30 bg-cyan-600/10 text-center hover:scale-105 transition-transform cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/40 to-blue-600/40 flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl font-bold text-white">{num}</span>
                      </div>
                      <div className="text-white font-semibold text-sm">引黄闸{num}号</div>
                      <div className="text-gray-500 text-xs mt-1">已建成投入使用</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>💧</span>
                补水体系架构
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="glass-card p-6 mb-8">
                <div className="relative">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-600/40 to-orange-600/40 flex items-center justify-center mb-4">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <div className="text-white font-semibold mb-2">黄河水源</div>
                    <div className="w-1 h-12 bg-gradient-to-b from-yellow-500/50 to-cyan-500/50"></div>
                  </div>

                  <div className="flex justify-center gap-8 mt-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/40 to-blue-600/40 flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg">🏗️</span>
                        </div>
                        <div className="text-gray-400 text-xs">引黄闸{num}号</div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-1 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-cyan-600/30 mt-4"></div>

                  <div className="flex justify-center gap-8 mt-4">
                    {[4, 5, 6].map((num) => (
                      <div key={num} className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/40 to-blue-600/40 flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg">🏗️</span>
                        </div>
                        <div className="text-gray-400 text-xs">引黄闸{num}号</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-500/50 to-green-500/50"></div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 flex items-center justify-center mt-4">
                      <span className="text-2xl">🌿</span>
                    </div>
                    <div className="text-white font-semibold mt-2">湿地生态系统</div>
                    <div className="text-gray-500 text-xs">补水能力: 131m³/s</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={1000}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                补水成效数据
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={1100}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>💧</span> 近3年生态补水趋势
                  </h4>
                  <div className="space-y-4">
                    {[
                      { year: '2022年', amount: '1.5亿m³', percentage: 28 },
                      { year: '2023年', amount: '1.8亿m³', percentage: 34 },
                      { year: '2024年', amount: '2.0亿m³', percentage: 38 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400 text-sm">{item.year}</span>
                          <span className="text-green-400 font-medium">{item.amount}</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-green-600 to-cyan-600 transition-all duration-1000"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">累计补水</span>
                      <span className="text-white font-bold text-xl">5.3亿m³</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>🌊</span> 补水效益
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: '湿地恢复面积', value: '14.65万亩', icon: '🏞️' },
                      { label: '植被覆盖率提升', value: '+33%', icon: '🌿' },
                      { label: '鸟类栖息环境改善', value: '显著', icon: '🐦' },
                      { label: '生态系统健康指数', value: '0.82', icon: '💚' },
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg text-center">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-gray-500 text-xs mb-1">{item.label}</div>
                        <div className="text-white font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={600} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：湿地保护修复数据持续更新中，以上数据为最新统计值。保护区将继续推进陆海生态系统一体化保护修复工程，提升湿地生态系统质量和稳定性。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default WetlandRestoration;