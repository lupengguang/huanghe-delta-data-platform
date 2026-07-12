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

function RadarGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
        }}></div>
      </div>
      
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-cyan-500/10"
          style={{
            left: '50%',
            top: '50%',
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <style>{`
        @keyframes radarPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }
        .rounded-full.border-cyan-500\\/10 {
          animation: radarPulse 4s ease-in-out infinite;
        }
        .rounded-full.border-cyan-500\\/10:nth-child(2) { animation-delay: 0.5s; }
        .rounded-full.border-cyan-500\\/10:nth-child(3) { animation-delay: 1s; }
        .rounded-full.border-cyan-500\\/10:nth-child(4) { animation-delay: 1.5s; }
        .rounded-full.border-cyan-500\\/10:nth-child(5) { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

function SatelliteOrbitAnimation() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
          <span className="text-3xl">🌍</span>
        </div>
      </div>
      
      <div 
        className="absolute inset-0"
        style={{
          animation: `orbit ${20}s linear infinite`,
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50">
            <span className="text-xs">🛰️</span>
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-2"
        style={{
          animation: `orbit ${15}s linear infinite`,
          animationDirection: 'reverse',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-xs">📡</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function DataFlowLines() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine = {
        id: Date.now() + Math.random(),
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        angle: Math.random() * 360,
        duration: 2 + Math.random() * 3,
      };
      setLines(prev => [...prev, newLine]);
      setTimeout(() => {
        setLines(p => p.filter(l => l.id !== newLine.id));
      }, newLine.duration * 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map(line => (
        <div
          key={line.id}
          className="absolute w-px bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
          style={{
            top: `${line.top}%`,
            left: `${line.left}%`,
            height: '100px',
            transform: `rotate(${line.angle}deg)`,
            animation: `dataLineFlow ${line.duration}s ease-out forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes dataLineFlow {
          0% { opacity: 0; transform: rotate(var(--angle)) translateY(0); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--angle)) translateY(-200px); }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value, unit, description, color = 'cyan', animated = false }) {
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
    cyan: { bg: 'from-cyan-600/20 to-cyan-800/20', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    blue: { bg: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/50' },
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
    green: { bg: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/50' },
    orange: { bg: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/50' },
    teal: { bg: 'from-teal-600/20 to-teal-800/20', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/50' },
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} hover:shadow-xl ${colorClasses[color].glow} ${isHovered ? 'scale-105' : ''}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-500 ${isHovered ? 'from-cyan-600 to-blue-600' : 'from-white/10 to-white/5'}`}>
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

function MonitoringCard({ icon, title, description, stats, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = {
    sky: 'from-blue-600/30 to-cyan-600/30 border-blue-500/30 hover:border-blue-500/50',
    earth: 'from-green-600/30 to-teal-600/30 border-green-500/30 hover:border-green-500/50',
    sea: 'from-cyan-600/30 to-blue-600/30 border-cyan-500/30 hover:border-cyan-500/50',
    air: 'from-purple-600/30 to-pink-600/30 border-purple-500/30 hover:border-purple-500/50',
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
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DataPoolVisualization() {
  const [activeElement, setActiveElement] = useState(null);

  const elements = [
    { id: 'meteorology', label: '气象', icon: '🌤️', count: '1.2亿条', color: '#3b82f6' },
    { id: 'hydrology', label: '水文', icon: '💧', count: '2.5亿条', color: '#06b6d4' },
    { id: 'soil', label: '土壤', icon: '🌱', count: '8000万条', color: '#10b981' },
    { id: 'ocean', label: '海洋', icon: '🌊', count: '1.8亿条', color: '#0ea5e9' },
    { id: 'vegetation', label: '植被', icon: '🌿', count: '3亿条', color: '#22c55e' },
    { id: 'wildlife', label: '野生动物', icon: '🐦', count: '5000万条', color: '#8b5cf6' },
    { id: 'waterquality', label: '水质', icon: '💚', count: '9000万条', color: '#14b8a6' },
    { id: 'atmosphere', label: '大气', icon: '🌫️', count: '6000万条', color: '#f97316' },
  ];

  return (
    <div className="glass-card p-6">
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-600/40 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10亿+</div>
              <div className="text-xs text-gray-400">数据总量</div>
            </div>
          </div>
        </div>

        {elements.map((item, index) => {
          const angle = (index / elements.length) * 360;
          const radius = 140;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius + 50;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius + 50;

          return (
            <div
              key={item.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                activeElement === item.id ? 'scale-125 z-10' : 'scale-100'
              }`}
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActiveElement(item.id)}
              onMouseLeave={() => setActiveElement(null)}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300"
                style={{ 
                  backgroundColor: `${item.color}30`,
                  borderColor: activeElement === item.id ? item.color : `${item.color}50`,
                  boxShadow: activeElement === item.id ? `0 0 20px ${item.color}50` : 'none',
                }}
              >
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="text-center mt-2">
                <div className="text-xs text-white font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.count}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {elements.map(item => (
          <div
            key={item.id}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-all duration-300 cursor-pointer ${
              activeElement === item.id 
                ? 'bg-white/20 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
            onMouseEnter={() => setActiveElement(item.id)}
            onMouseLeave={() => setActiveElement(null)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineCard({ year, events }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`glass-card p-4 border border-white/10 transition-all duration-500 cursor-pointer ${
        isExpanded ? 'border-cyan-500/30 bg-cyan-600/10' : 'hover:border-cyan-500/20'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${
            isExpanded ? 'bg-cyan-600/30 text-cyan-400' : 'bg-white/10 text-gray-400'
          }`}>
            {year}
          </div>
          <div>
            <div className="text-white font-semibold">遥感数据采集</div>
            <div className="text-gray-500 text-xs">{events.length}项数据成果</div>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isExpanded ? 'bg-cyan-600/30 rotate-180' : 'bg-white/10'
        }`}>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></div>
              <span className="text-gray-400">{event}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    cyan: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
    teal: 'bg-teal-600/30 text-teal-300 border border-teal-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function EcoEnvironmentMonitoring() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('network');
  
  const tabs = [
    { id: 'network', label: '天空地海一体化监测' },
    { id: 'platform', label: '数据平台与资源池' },
    { id: 'biodiversity', label: '生物多样性监测' },
  ];

  const stats = [
    { icon: '💰', label: '总投资', value: '1', unit: '亿元', description: '生态环境监测体系建设', color: 'orange', animated: true },
    { icon: '📡', label: '5G基站', value: '35', unit: '处', description: '地面通信网络覆盖', color: 'cyan', animated: true },
    { icon: '🌍', label: '观测站', value: '9', unit: '处', description: '湿地生态定位观测站', color: 'blue', animated: true },
    { icon: '📷', label: '视频监控', value: '300+', unit: '处', description: '全域视频监控覆盖', color: 'purple', animated: true },
    { icon: '🤖', label: 'AI识别', value: '18', unit: '处', description: '具备AI智能识别功能', color: 'green', animated: true },
    { icon: '📊', label: '数据总量', value: '10亿+', unit: '条', description: '多源监测数据整合', color: 'teal', animated: true },
  ];

  const monitoringLayers = [
    { 
      icon: '🛰️', 
      title: '天空层 - 遥感监测', 
      description: '利用卫星遥感技术，获取高精度、大尺度的生态环境监测数据，实现宏观生态格局的动态监测',
      stats: [{ value: '1979年', label: '数据起始' }, { value: 'Landsat', label: '数据源' }],
      color: 'sky',
    },
    { 
      icon: '📡', 
      title: '空间层 - 网络覆盖', 
      description: '建设5G基站35处，构建高速通信网络，保障监测数据实时传输',
      stats: [{ value: '35处', label: '5G基站' }, { value: '全覆盖', label: '通信网络' }],
      color: 'air',
    },
    { 
      icon: '🌍', 
      title: '地面层 - 定点监测', 
      description: '建设9处湿地生态定位观测站，实现水文、土壤、气象等关键要素的长期连续监测',
      stats: [{ value: '9处', label: '观测站' }, { value: '24h', label: '实时监测' }],
      color: 'earth',
    },
    { 
      icon: '🌊', 
      title: '海洋层 - 海域监测', 
      description: '整合海洋监测数据，实现陆海生态系统一体化监测，保护海洋生态环境',
      stats: [{ value: '1.8亿条', label: '海洋数据' }, { value: '全覆盖', label: '海域范围' }],
      color: 'sea',
    },
  ];

  const remoteSensingTimeline = [
    { 
      year: '1979年', 
      events: ['Landsat TM遥感影像开始采集', '建立长期遥感监测序列'] 
    },
    { 
      year: '1986年', 
      events: ['持续采集Landsat数据', '开展土地利用变化研究'] 
    },
    { 
      year: '2000年', 
      events: ['Landsat和MODIS数据融合', '生成高时空分辨率EVI数据集'] 
    },
    { 
      year: '2010年', 
      events: ['Sentinel-1/2数据应用', '无人机载高光谱与LiDAR数据采集'] 
    },
    { 
      year: '2020年', 
      events: ['2000-2020年EVI数据集发布', 'R²>0.92验证精度'] 
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
            <RadarGridBackground />
            <DataFlowLines />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <SatelliteOrbitAnimation />
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge variant="cyan">智慧监测</Badge>
                    <Badge variant="purple">全域感知</Badge>
                    <Badge variant="blue">天空地海</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    生态环境监测：全域感知的"智慧大脑"
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    这是保护区覆盖面最广、技术最前沿的数据资源体系，总投资达1亿元，构建"监测-分析-决策-应用"全链条闭环的生态环境监测网络。
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

        {activeTab === 'network' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">天空地海一体化监测网络</h2>
                  <p className="text-gray-400 text-sm">全方位、多层次的生态环境监测体系</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {monitoringLayers.map((layer, index) => (
                  <MonitoringCard
                    key={index}
                    icon={layer.icon}
                    title={layer.title}
                    description={layer.description}
                    stats={layer.stats}
                    color={layer.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📡</span>
                地面监测设施
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '📶', title: '5G基站', value: '35处', desc: '构建高速通信网络，保障实时数据传输', color: 'from-blue-600/20 to-cyan-600/20' },
                  { icon: '🌍', title: '湿地观测站', value: '9处', desc: '长期定位监测湿地生态环境变化', color: 'from-green-600/20 to-teal-600/20' },
                  { icon: '📷', title: '视频监控', value: '300+处', desc: '全域覆盖，实时监控保护区动态', color: 'from-purple-600/20 to-pink-600/20' },
                  { icon: '🤖', title: 'AI识别', value: '18处', desc: '搭载AI算法，实现智能识别分析', color: 'from-cyan-600/20 to-blue-600/20' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-cyan-400 text-lg font-bold mt-1">{item.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                多维数据整合
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: '🌤️', label: '气象监测', desc: '气温、湿度、降水、风速等气象要素实时监测' },
                    { icon: '💧', label: '水文监测', desc: '水位、流量、水质等水文要素自动监测' },
                    { icon: '🌱', label: '土壤监测', desc: '土壤湿度、养分、pH值等土壤要素监测' },
                    { icon: '🌊', label: '海洋监测', desc: '海水温度、盐度、海洋生态监测' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex-1 min-w-[200px] p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white font-semibold">{item.label}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>🔄</span>
                监测闭环流程
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {[
                    { icon: '📡', label: '数据采集', color: 'from-cyan-600/40 to-blue-600/40' },
                    { icon: '💾', label: '数据存储', color: 'from-blue-600/40 to-purple-600/40' },
                    { icon: '🔍', label: '数据分析', color: 'from-purple-600/40 to-pink-600/40' },
                    { icon: '📊', label: '决策支持', color: 'from-pink-600/40 to-cyan-600/40' },
                    { icon: '🎯', label: '应用实施', color: 'from-cyan-600/40 to-green-600/40' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-cyan-500/20`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="text-center ml-2">
                        <div className="text-white font-semibold text-sm">{item.label}</div>
                      </div>
                      {index < 4 && (
                        <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent mx-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'platform' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">数据平台与资源池</h2>
                  <p className="text-gray-400 text-sm">生态环境数据的中枢大脑</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  平台整合多源数据超 <span className="text-cyan-400 font-semibold">10亿条</span>，
                  构建起覆盖 <span className="text-blue-400 font-semibold">21类要素</span> 的 <span className="text-purple-400 font-semibold">PB级</span> 生态数据资源池。
                  核心平台"黄河三角洲湿地生态数据要素流通服务平台"，打造"生态环境一张图"，实现"监测-分析-决策-应用"全链条闭环。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="cyan">10亿+数据</Badge>
                  <Badge variant="blue">21类要素</Badge>
                  <Badge variant="purple">PB级资源池</Badge>
                  <Badge variant="green">全链条闭环</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <span>🌀</span>
                数据资源池可视化
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <DataPoolVisualization />
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🏢</span>
                核心平台
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8 border border-blue-500/30 bg-blue-600/10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center">
                    <span className="text-4xl">🌐</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">黄河三角洲湿地生态数据要素流通服务平台</h4>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      该平台整合多源生态数据，打造"生态环境一张图"，实现从数据采集、存储、分析到决策应用的全链条闭环管理。
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: '数据存储', value: 'PB级' },
                        { label: '数据类型', value: '21类' },
                        { label: '数据总量', value: '10亿+' },
                        { label: '服务能力', value: '7x24h' },
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-lg font-bold text-blue-400">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                平台功能
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '📈', label: '数据可视化', desc: '生态环境一张图，直观展示各类监测数据' },
                  { icon: '🔍', label: '智能分析', desc: 'AI驱动的数据分析，自动识别异常情况' },
                  { icon: '🎯', label: '决策支持', desc: '基于数据的科学决策，支持生态管理' },
                  { icon: '🔄', label: '数据流通', desc: '数据要素流通服务，实现数据共享复用' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-semibold">{item.label}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'biodiversity' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">🐦</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">生物多样性监测数据</h2>
                  <p className="text-gray-400 text-sm">长期监测积累的宝贵数据资源</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  拥有 <span className="text-cyan-400 font-semibold">1979年至今</span> 的Landsat长序列遥感影像，
                  以及 <span className="text-green-400 font-semibold">2000-2020年</span> 高时空分辨率EVI数据集。
                  利用环志、AI识别、卫星遥测等技术跟踪旗舰物种，在野外长期监测中积累了超 <span className="text-blue-400 font-semibold">100万条</span> 水、土、气、生等关键数据。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="cyan">1979年至今</Badge>
                  <Badge variant="green">Landsat长序列</Badge>
                  <Badge variant="blue">100万+关键数据</Badge>
                  <Badge variant="purple">旗舰物种跟踪</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>🛰️</span>
                遥感数据时间线
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {remoteSensingTimeline.map((item, index) => (
                  <TimelineCard
                    key={index}
                    year={item.year}
                    events={item.events}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                EVI数据集
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-4">2000-2020年黄河三角洲高时空分辨率EVI时空融合数据集</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[
                        { label: '时间分辨率', value: '8天' },
                        { label: '空间分辨率', value: '30米' },
                        { label: '时间跨度', value: '2000-2020年' },
                        { label: '验证精度', value: 'R²>0.92' },
                      ].map((stat, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg">
                          <div className="text-gray-500 text-xs mb-1">{stat.label}</div>
                          <div className="text-white font-semibold">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">
                      该数据集基于Landsat和MODIS数据融合生成，提供高时空分辨率的增强植被指数（EVI）数据，为生态环境监测和研究提供重要数据支撑。
                    </p>
                  </div>
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                    <span className="text-5xl">📈</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🦅</span>
                旗舰物种监测技术
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '🏷️', label: '环志技术', desc: '为鸟类佩戴环志，跟踪迁徙路线和种群动态' },
                  { icon: '🤖', label: 'AI识别', desc: '利用人工智能算法，自动识别鸟类种类和数量' },
                  { icon: '🛰️', label: '卫星遥测', desc: '通过卫星跟踪器，实时监测旗舰物种活动范围' },
                  { icon: '📷', label: '视频监控', desc: '18处具备AI识别功能的视频监控，实时监测鸟类活动' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-semibold">{item.label}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={1000}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                野外监测数据
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={1100}>
              <div className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span>📈</span> 野外监测数据积累
                    </h4>
                    <div className="space-y-4">
                      {[
                        { label: '水质数据', value: '30万条', percentage: 30, color: '#06b6d4' },
                        { label: '土壤数据', value: '25万条', percentage: 25, color: '#10b981' },
                        { label: '气象数据', value: '35万条', percentage: 35, color: '#3b82f6' },
                        { label: '生物数据', value: '10万条', percentage: 10, color: '#8b5cf6' },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">{item.label}</span>
                            <span className="text-white font-medium">{item.value}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1500"
                              style={{ 
                                width: `${item.percentage}%`, 
                                backgroundColor: item.color,
                                boxShadow: `0 0 10px ${item.color}`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">累计监测数据</span>
                        <span className="text-white font-bold text-xl">100万+条</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span>🌍</span> 监测覆盖范围
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: '🗺️', label: '湿地生态系统', value: '9处定位观测站' },
                        { icon: '🌊', label: '海洋生态系统', value: '海域全覆盖' },
                        { icon: '🏞️', label: '陆地生态系统', value: '3518平方公里' },
                        { icon: '🐦', label: '鸟类栖息地', value: '重点区域监测' },
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span>{item.icon}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{item.label}</div>
                            <div className="text-gray-500 text-xs">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={600} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：生态环境监测数据持续更新中，以上数据为最新统计值。监测网络将继续扩展完善，提升全域感知能力。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default EcoEnvironmentMonitoring;