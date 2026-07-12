import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withBase } from '../utils/pathUtils';

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

function ScanLineEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        style={{
          animation: 'scanLine 3s linear infinite',
          top: '0',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
        }}
      />
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

function SatelliteScanAnimation() {
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30"></div>
      <div className="absolute inset-4 rounded-full border border-cyan-500/20"></div>
      <div className="absolute inset-8 rounded-full border border-cyan-500/10"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute w-1 h-32 bg-gradient-to-t from-cyan-500 to-transparent origin-bottom"
          style={{
            transform: `rotate(${scanAngle}deg)`,
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
          }}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-600/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <span className="text-4xl">🛰️</span>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
}

function TimelineSlider() {
  const [activeYear, setActiveYear] = useState(2000);
  
  const years = [1979, 1986, 1992, 1995, 2000, 2005];
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-gray-400 text-sm">历史影像时间线</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-center">
          {years.map((year, index) => (
            <div 
              key={year}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveYear(year)}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeYear === year 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50 scale-150' 
                  : 'bg-gray-600 group-hover:bg-gray-500'
              }`}></div>
              <span className={`text-sm mt-2 transition-colors ${
                activeYear === year ? 'text-cyan-400 font-semibold' : 'text-gray-500'
              }`}>
                {year}
              </span>
            </div>
          ))}
        </div>
        
        <div 
          className="absolute top-1.5 h-0.5 bg-cyan-500 transition-all duration-300"
          style={{
            left: `${(years.indexOf(activeYear) / (years.length - 1)) * 100}%`,
            width: '12px',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
          }}
        />
      </div>
      
      <div className="mt-8 p-4 bg-white/5 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-cyan-500/30">
            <img 
              src={withBase('/images/黄河三角洲湿地.png')} 
              alt={`${activeYear}年影像`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-cyan-400 font-semibold text-lg">{activeYear}年 Landsat TM 影像</div>
            <div className="text-gray-400 text-sm mt-1">空间分辨率：30米</div>
            <div className="text-gray-400 text-sm">数据来源：国家地球系统科学数据中心</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResolutionCard({ title, resolution, description, color = 'cyan' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    cyan: {
      bg: 'bg-cyan-600/20',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/30',
    },
    blue: {
      bg: 'bg-blue-600/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/30',
    },
    purple: {
      bg: 'bg-purple-600/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/30',
    },
  };

  return (
    <div 
      className={`relative glass-card p-6 border transition-all duration-500 ${colorClasses[color].border} ${
        isHovered ? 'scale-105 shadow-xl ' + colorClasses[color].glow : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScanLineEffect />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
            <div className={`text-3xl font-bold ${colorClasses[color].text}`}>{resolution}</div>
          </div>
          <div className={`w-12 h-12 rounded-xl ${colorClasses[color].bg} flex items-center justify-center`}>
            <span className="text-2xl">📡</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function DataQualityIndicator({ label, value, max, color = '#22d3ee' }) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg className="w-24 h-24 -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1500"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="text-xl font-bold text-white mt-2">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function MultiSourceDataCard({ icon, name, description, specs }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="glass-card p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold">{name}</h4>
            <svg 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{spec.label}</span>
              <span className="text-cyan-400 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EVIAnimation() {
  const [frame, setFrame] = useState(0);
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 12);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">EVI 时间序列动态演示</h3>
          <div className="text-gray-400 text-sm">2000-2020年高时空分辨率EVI数据集</div>
        </div>
        <div className="text-cyan-400 font-bold text-xl">
          2020年 {months[frame]}
        </div>
      </div>
      
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img 
          src={withBase('/images/黄河三角洲NDVI.png')} 
          alt="EVI可视化"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-blue-900/20"></div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>低植被覆盖</span>
            <span>高植被覆盖</span>
          </div>
          <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-cyan-500"></div>
        </div>
        
        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-600/80 text-white text-sm font-medium"
          style={{
            animation: 'pulse 2s infinite',
          }}
        >
          动态更新中
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        {months.map((month, index) => (
          <div 
            key={month}
            className={`w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all ${
              frame === index 
                ? 'bg-cyan-500 text-white' 
                : 'bg-white/10 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechBadge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    gold: 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    blue: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function RemoteSensing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  
  const tabs = [
    { id: 'history', label: '历史存档' },
    { id: 'highres', label: '高分辨率数据' },
    { id: 'scientific', label: '科研级数据' },
    { id: 'quality', label: '数据质控' },
  ];

  const historyData = [
    { year: 1979, type: 'Landsat TM', resolution: '30m', status: '已归档' },
    { year: 1986, type: 'Landsat TM', resolution: '30m', status: '已归档' },
    { year: 1992, type: 'Landsat TM', resolution: '30m', status: '已归档' },
    { year: 1995, type: 'Landsat TM', resolution: '30m', status: '已归档' },
    { year: 2000, type: 'Landsat ETM+', resolution: '30m', status: '已归档' },
    { year: 2005, type: 'Landsat TM', resolution: '30m', status: '已归档' },
  ];

  const multiSourceData = [
    {
      icon: '🛰️',
      name: 'Sentinel-1/2',
      description: '欧空局哨兵系列卫星，提供高分辨率光学与雷达影像',
      specs: [
        { label: '空间分辨率', value: '10m-60m' },
        { label: '重复周期', value: '5天' },
        { label: '光谱波段', value: '13个' },
      ],
    },
    {
      icon: '📡',
      name: '资源一号02D',
      description: '国产高光谱卫星，具备丰富的光谱信息',
      specs: [
        { label: '空间分辨率', value: '5m/10m' },
        { label: '光谱波段', value: '32个' },
        { label: '幅宽', value: '60km' },
      ],
    },
    {
      icon: '🚁',
      name: '无人机载高光谱',
      description: '低空无人机平台搭载高光谱成像系统',
      specs: [
        { label: '空间分辨率', value: '厘米级' },
        { label: '光谱波段', value: '数百个' },
        { label: '应用场景', value: '精细监测' },
      ],
    },
    {
      icon: '📊',
      name: 'LiDAR数据',
      description: '激光雷达数据，提供高精度三维地形信息',
      specs: [
        { label: '点云密度', value: '100-500点/m²' },
        { label: '精度', value: '厘米级' },
        { label: '应用', value: '植被高度测量' },
      ],
    },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>

        <AnimatedSection className="mb-12">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-purple-900/60"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}></div>
            </div>
            <ScanLineEffect />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
              <style>{`
                @keyframes twinkle {
                  0%, 100% { opacity: 0.3; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.5); }
                }
              `}</style>
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <SatelliteScanAnimation />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <TechBadge variant="cyan">卫星遥感</TechBadge>
                    <TechBadge variant="blue">高分辨率</TechBadge>
                    <TechBadge variant="gold">国家级数据</TechBadge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    遥感影像：记录变迁的"天眼"档案
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    这是保护区历史与现状的空间数据基础，来源多样，时空分辨率高，为研究土地利用/覆盖变化提供宝贵的科学资料。
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
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'history' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">历史存档数据</h2>
                  <p className="text-gray-400 text-sm">国家地球系统科学数据中心提供</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  国家地球系统科学数据中心提供了 <span className="text-cyan-400 font-semibold">1979、1986、1992、1995、2000、2005年</span> 的 
                  <span className="text-blue-400 font-semibold">Landsat TM</span> 遥感影像，
                  是研究土地利用/覆盖变化的宝贵资料，为分析保护区近40年来的生态演变提供了坚实的数据基础。
                </p>
                <TimelineSlider />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyData.map((item, index) => (
                  <div 
                    key={item.year}
                    className="glass-card p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-cyan-400">{item.year}</div>
                      <TechBadge variant="green">{item.status}</TechBadge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">数据类型</span>
                        <span className="text-white">{item.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">空间分辨率</span>
                        <span className="text-cyan-400">{item.resolution}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 rounded-lg bg-cyan-600/20 text-cyan-400 text-sm font-medium hover:bg-cyan-600/30 transition-colors opacity-0 group-hover:opacity-100">
                      下载数据
                    </button>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲湿地.png')}
                  alt="历史影像对比"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">1979-2005年土地利用变化</h3>
                      <p className="text-gray-300 text-sm">通过历史遥感影像，可清晰追溯保护区近30年的生态变迁过程</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">6年</div>
                        <div className="text-xs text-gray-500">存档年份</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">30m</div>
                        <div className="text-xs text-gray-500">空间分辨率</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">26年</div>
                        <div className="text-xs text-gray-500">时间跨度</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'highres' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <span className="text-2xl">📸</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">高分辨率数据</h2>
                  <p className="text-gray-400 text-sm">黄委信息中心采集处理</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-8">
                  黄委信息中心已采集处理覆盖保护区的 <span className="text-blue-400 font-semibold">2米分辨率</span> 
                  高分辨率卫星影像，用于构建"数字基底"，为精细化生态监测和管理提供高精度空间数据支撑。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResolutionCard
                    title="高分辨率卫星影像"
                    resolution="2米"
                    description="黄委信息中心采集处理，覆盖保护区全域，构建高精度数字基底"
                    color="blue"
                  />
                  <ResolutionCard
                    title="Landsat TM/ETM+"
                    resolution="30米"
                    description="历史存档数据，用于长时间序列土地利用变化分析"
                    color="cyan"
                  />
                  <ResolutionCard
                    title="Sentinel-2"
                    resolution="10米"
                    description="欧空局哨兵卫星，5天重复周期，高时间分辨率监测"
                    color="purple"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>🗺️</span>
                  数字基底构建
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={withBase('/images/黄河三角洲湿地.png')} 
                      alt="数字基底"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-cyan-400 font-semibold">2米分辨率基底</div>
                      <div className="text-gray-400 text-sm">精细化地表覆盖分类</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/30 flex items-center justify-center">
                          <span>🎯</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">高精度定位</div>
                          <div className="text-gray-400 text-sm">2米分辨率实现精准地物识别</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-600/30 flex items-center justify-center">
                          <span>📊</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">动态监测</div>
                          <div className="text-gray-400 text-sm">支持年度/季度尺度的变化检测</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-600/30 flex items-center justify-center">
                          <span>🗂️</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">数据融合</div>
                          <div className="text-gray-400 text-sm">多源数据融合提升监测精度</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'scientific' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">科研级专题数据</h2>
                  <p className="text-gray-400 text-sm">长时间序列与多源数据应用</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">长时间序列数据集</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      基于Landsat和MODIS数据融合生成的 <span className="text-cyan-400 font-semibold">"2000-2020年黄河三角洲高时空分辨率EVI时空融合数据集"</span>，
                      提供 <span className="text-green-400 font-semibold">8天</span> 时间分辨率、 
                      <span className="text-blue-400 font-semibold">30米</span> 空间分辨率的增强植被指数（EVI）数据。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-3xl font-bold text-cyan-400 mb-1">8天</div>
                        <div className="text-gray-400 text-sm">时间分辨率</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-1">30米</div>
                        <div className="text-gray-400 text-sm">空间分辨率</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">21年</div>
                        <div className="text-gray-400 text-sm">时间跨度</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-1">~960期</div>
                        <div className="text-gray-400 text-sm">数据期数</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <EVIAnimation />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🛰️</span>
                多源数据应用
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {multiSourceData.map((data, index) => (
                  <MultiSourceDataCard
                    key={index}
                    icon={data.icon}
                    name={data.name}
                    description={data.description}
                    specs={data.specs}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📈</span>
                  数据应用场景
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: '🌿', title: '植被动态监测', desc: 'EVI时序分析植被生长周期' },
                    { icon: '💧', title: '湿地变化检测', desc: '识别湿地扩张与退化区域' },
                    { icon: '🏜️', title: '土地利用分类', desc: '高精度土地覆盖类型提取' },
                    { icon: '🦅', title: '栖息地评估', desc: '评估鸟类栖息地适宜性' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="text-white font-medium mb-1">{item.title}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'quality' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">数据质控</h2>
                  <p className="text-gray-400 text-sm">严格质量评估与验证</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-8">
                  这些数据集通常经过严格质量评估，例如上述EVI数据集的验证结果 
                  <span className="text-green-400 font-semibold">R²&gt;0.92</span>，
                  确保数据的可靠性和准确性，为科学研究提供高质量的数据支撑。
                </p>
                <div className="flex justify-center gap-12">
                  <DataQualityIndicator label="EVI验证R²" value="0.92+" max="1" color="#22c55e" />
                  <DataQualityIndicator label="数据完整性" value="98" max="100" color="#22d3ee" />
                  <DataQualityIndicator label="时间连续性" value="95" max="100" color="#3b82f6" />
                  <DataQualityIndicator label="空间一致性" value="96" max="100" color="#8b5cf6" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <span>🔍</span>
                    质量控制流程
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', title: '数据预处理', desc: '辐射校正、大气校正、几何校正' },
                      { step: '2', title: '质量检查', desc: '云检测、阴影去除、异常值过滤' },
                      { step: '3', title: '数据融合', desc: '时空融合算法生成高时空分辨率数据' },
                      { step: '4', title: '精度验证', desc: '地面实测数据验证，R²>0.92' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-green-600/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-400 font-bold">{item.step}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-gray-400 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                    <span>📋</span>
                    数据认证
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                      <div className="w-12 h-12 rounded-xl bg-green-600/30 flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">国家公共数据资源登记</div>
                        <div className="text-gray-400 text-sm">遥感影像数据已获国家级数据资源登记认证</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/30 flex items-center justify-center">
                        <span className="text-2xl">🔬</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">科研数据认证</div>
                        <div className="text-gray-400 text-sm">通过科研级数据质量认证标准</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/30 flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">ISO质量认证</div>
                        <div className="text-gray-400 text-sm">符合ISO数据质量管理体系标准</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📈</span>
                  数据质量指标
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'EVI验证精度', value: 92, max: 100, color: '#22c55e', unit: '%' },
                    { label: '云量覆盖率', value: 5, max: 100, color: '#22d3ee', unit: '%' },
                    { label: '数据完整性', value: 98, max: 100, color: '#3b82f6', unit: '%' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}{item.unit}</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${item.value}%`,
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

        <AnimatedSection delay={600} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：遥感影像数据持续更新中，以上数据为最新统计值。数据平台持续扩展数据源，以提升保护区生态环境监测能力。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default RemoteSensing;