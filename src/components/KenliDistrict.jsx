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

function MapGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(249, 115, 22, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
        }}></div>
      </div>
    </div>
  );
}

function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
        >
          <span className="text-2xl">{i % 5 === 0 ? '🌍' : i % 5 === 1 ? '🏛️' : i % 5 === 2 ? '🏭' : i % 5 === 3 ? '🏞️' : '🌊'}</span>
        </div>
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(20px); }
          50% { transform: translateY(-15px) translateX(-10px); }
          75% { transform: translateY(-40px) translateX(15px); }
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon, label, value, unit, description, color = 'orange', animated = false }) {
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
    orange: { bg: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/50' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-800/20', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    blue: { bg: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/50' },
    green: { bg: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/50' },
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
    teal: { bg: 'from-teal-600/20 to-teal-800/20', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/50' },
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} hover:shadow-xl ${colorClasses[color].glow} ${isHovered ? 'scale-105' : ''}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-500 ${isHovered ? 'from-orange-600 to-cyan-600' : 'from-white/10 to-white/5'}`}>
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

function InfoCard({ icon, title, description, stats, highlight = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-6 border transition-all duration-500 ${
        highlight ? 'border-orange-500/50 bg-orange-600/10' : 'border-white/10 hover:border-orange-500/30'
      } ${isHovered ? 'scale-102 shadow-xl' : ''}`}
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
              <div className="text-xl font-bold text-orange-400">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineItem({ year, title, description, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`glass-card p-4 border border-white/10 transition-all duration-500 cursor-pointer ${
        isHovered ? 'border-orange-500/30 bg-orange-600/10 scale-102' : 'hover:border-orange-500/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
          isHovered ? 'bg-orange-600/30 text-orange-400' : 'bg-white/10 text-gray-400'
        }`}>
          {year}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span>{icon}</span>
            <span className="text-white font-semibold">{title}</span>
          </div>
          <div className="text-gray-500 text-xs">{description}</div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, max, color }) {
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

  const percentage = (value / max) * 100;

  return (
    <div ref={sectionRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1500"
          style={{ 
            width: isVisible ? `${percentage}%` : '0%', 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    cyan: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
    teal: 'bg-teal-600/30 text-teal-300 border border-teal-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function DistrictCard({ name, type, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-4 border border-white/10 transition-all duration-500 ${
        isHovered ? 'border-orange-500/30 shadow-xl shadow-orange-500/20 scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          isHovered ? 'bg-orange-600/30' : 'bg-white/10'
        }`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-gray-500 text-xs">{type}</div>
        </div>
      </div>
    </div>
  );
}

function KenliDistrict() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('location');
  
  const tabs = [
    { id: 'location', label: '地理位置' },
    { id: 'economy', label: '人口与经济' },
    { id: 'history', label: '历史沿革' },
    { id: 'industry', label: '经济与产业' },
    { id: 'culture', label: '文化与旅游' },
  ];

  const stats = [
    { icon: '📏', label: '区域面积', value: '2339.8', unit: '平方千米', description: '山东省东北部', color: 'cyan', animated: true },
    { icon: '👥', label: '常住人口', value: '25.84', unit: '万人', description: '2025年数据', color: 'blue', animated: true },
    { icon: '💰', label: '地区生产总值', value: '417.4', unit: '亿元', description: '2024年GDP', color: 'green', animated: true },
    { icon: '📈', label: '经济增速', value: '7.7', unit: '%', description: '2024年增长', color: 'orange', animated: true },
    { icon: '🏢', label: '行政区划', value: '8', unit: '个', description: '2街道+5镇+1开发区', color: 'purple', animated: false },
    { icon: '⭐', label: '旅游景区', value: '9', unit: '处', description: '1个5A+2个4A+6个3A', color: 'teal', animated: false },
  ];

  const historyTimeline = [
    { year: '1941年', title: '建立抗日民主政权', description: '垦利地区建立抗日民主政权', icon: '🔴' },
    { year: '1943年', title: '正式设县', description: '垦利县正式设立', icon: '📜' },
    { year: '2016年', title: '撤县设区', description: '撤销垦利县，设立东营市垦利区', icon: '🏛️' },
  ];

  const districts = [
    { name: '垦利街道', type: '街道', icon: '🏙️' },
    { name: '兴隆街道', type: '街道', icon: '🏙️' },
    { name: '黄河口镇', type: '镇', icon: '🌊' },
    { name: '永安镇', type: '镇', icon: '🌾' },
    { name: '胜坨镇', type: '镇', icon: '🏭' },
    { name: '董集镇', type: '镇', icon: '🏠' },
    { name: '郝家镇', type: '镇', icon: '🏠' },
    { name: '垦利经济开发区', type: '省级开发区', icon: '🏢' },
  ];

  const industryData = [
    { label: '第一产业', value: 9.3, color: '#10b981' },
    { label: '第二产业', value: 57.3, color: '#3b82f6' },
    { label: '第三产业', value: 33.4, color: '#8b5cf6' },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>

        <AnimatedSection className="mb-12">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/60 via-amber-900/50 to-yellow-900/60"></div>
            <MapGridBackground />
            <FloatingIcons />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-orange-600/40 to-amber-600/40 flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl">🌍</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-orange-500/20 animate-pulse"></div>
                  <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-amber-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge variant="orange">黄河入海口</Badge>
                    <Badge variant="green">胜利油田</Badge>
                    <Badge variant="cyan">高效生态经济区</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    垦利区：黄河入海的地方
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    垦利区是黄河入海的地方，也是胜利油田的发源地和黄河三角洲高效生态经济区的核心区域。
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
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30'
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

        {activeTab === 'location' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">地理位置</h2>
                  <p className="text-gray-400 text-sm">山东省东北部，黄河最下游入海口</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  垦利区位于山东省东北部，地处黄河最下游入海口。东临渤海，西北与利津县隔河相望，南接东营区，东北与河口区相邻。全区面积 <span className="text-cyan-400 font-semibold">2339.8平方千米</span>，区政府驻垦利街道胜兴路16号。
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: '🌊', label: '东临渤海', desc: '海洋资源丰富' },
                    { icon: '🚣', label: '西北与利津县隔河相望', desc: '黄河为界' },
                    { icon: '🏙️', label: '南接东营区', desc: '中心城区毗邻' },
                    { icon: '📍', label: '东北与河口区相邻', desc: '北部重要区域' },
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

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🌍</span>
                区位优势
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '🏆', label: '黄河入海口', desc: '独特的河海交汇自然景观' },
                  { icon: '⛽', label: '胜利油田发源地', desc: '丰富的石油资源' },
                  { icon: '🌿', label: '高效生态经济区', desc: '国家战略核心区域' },
                  { icon: '🚢', label: '渤海湾畔', desc: '便捷的海洋运输通道' },
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

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>🗺️</span>
                行政区划
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {districts.map((district, index) => (
                  <DistrictCard
                    key={index}
                    name={district.name}
                    type={district.type}
                    icon={district.icon}
                  />
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'economy' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">人口与经济概况</h2>
                  <p className="text-gray-400 text-sm">2024年最新统计数据</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 border border-green-500/30 bg-green-600/10">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>👥</span> 人口统计
                  </h4>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400">25.84</div>
                      <div className="text-gray-500 text-sm">2025年常住人口(万人)</div>
                    </div>
                    <div className="h-16 w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-400">25.81</div>
                      <div className="text-gray-500 text-sm">2024年常住人口(万人)</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">同比增长</span>
                      <span className="text-green-400 font-semibold">+0.12%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border border-blue-500/30 bg-blue-600/10">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>💰</span> 经济数据
                  </h4>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400">417.4</div>
                      <div className="text-gray-500 text-sm">地区生产总值(亿元)</div>
                    </div>
                    <div className="h-16 w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400">7.7%</div>
                      <div className="text-gray-500 text-sm">同比增长率</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">三次产业结构</span>
                      <span className="text-white font-semibold">9.3:57.3:33.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📈</span>
                产业结构占比
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-wrap justify-center gap-8">
                  {industryData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke={item.color}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 56}
                            strokeDashoffset={2 * Math.PI * 56 - (item.value / 100) * 2 * Math.PI * 56}
                            className="transition-all duration-1500"
                            style={{ filter: `drop-shadow(0 0 10px ${item.color})` }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-white">{item.value}%</span>
                        </div>
                      </div>
                      <div className="text-white font-semibold">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>💵</span>
                居民收入
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 flex items-center justify-center">
                      <span>🏢</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">城镇居民人均可支配收入</div>
                      <div className="text-gray-500 text-xs">2024年数据</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-4">61,039</div>
                  <div className="text-gray-400 text-sm">元</div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center">
                      <span>🌾</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">农村居民人均可支配收入</div>
                      <div className="text-gray-500 text-xs">2024年数据</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-4">28,590</div>
                  <div className="text-gray-400 text-sm">元</div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'history' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600/30 to-orange-600/30 flex items-center justify-center">
                  <span className="text-2xl">📜</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">历史沿革与行政区划</h2>
                  <p className="text-gray-400 text-sm">年轻土地的发展历程</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  垦利是由黄河泥沙淤积而成的"年轻土地"。它因垦区和利津洼而得名。<span className="text-orange-400 font-semibold">1941年</span>建立抗日民主政权，<span className="text-amber-400 font-semibold">1943年</span>正式设县。<span className="text-yellow-400 font-semibold">2016年</span>，撤销垦利县，设立东营市垦利区。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="orange">黄河泥沙淤积</Badge>
                  <Badge variant="green">1941年建立政权</Badge>
                  <Badge variant="cyan">1943年正式设县</Badge>
                  <Badge variant="purple">2016年撤县设区</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-orange-400 mb-6 flex items-center gap-2">
                <span>⏱️</span>
                历史时间线
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="space-y-4 mb-8">
                {historyTimeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    year={item.year}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🗺️</span>
                行政区划
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {districts.map((district, index) => (
                  <DistrictCard
                    key={index}
                    name={district.name}
                    type={district.type}
                    icon={district.icon}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <div className="glass-card p-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-orange-400 mb-2">2</div>
                    <div className="text-gray-400">街道</div>
                    <div className="text-gray-500 text-xs mt-1">垦利街道、兴隆街道</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                    <div className="text-gray-400">镇</div>
                    <div className="text-gray-500 text-xs mt-1">黄河口镇、永安镇、胜坨镇、董集镇、郝家镇</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-2">1</div>
                    <div className="text-gray-400">省级开发区</div>
                    <div className="text-gray-500 text-xs mt-1">垦利经济开发区</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'industry' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <span className="text-2xl">🏭</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">经济与产业：从石油到绿色转型</h2>
                  <p className="text-gray-400 text-sm">产业发展经历深刻转型</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard
                  icon="⛽"
                  title="工业与转型"
                  description="作为胜利油田核心产区，其43%的油气产量和45%的已探明储量出自这里。目前正着力打造新能源、新材料、生物医药三大链条。"
                  stats={[
                    { value: '43%', label: '油气产量' },
                    { value: '45%', label: '已探明储量' },
                  ]}
                  highlight={true}
                />
                <InfoCard
                  icon="💻"
                  title="数字经济"
                  description="核心产业增加值较2021年增长超25倍，是山东省首批数字经济'晨星工厂'试点。"
                  stats={[
                    { value: '25倍', label: '增长幅度' },
                    { value: '首批', label: '试点城市' },
                  ]}
                />
                <InfoCard
                  icon="🌾"
                  title="现代农业"
                  description="以黄河口大闸蟹、黄河口刀鱼、海参等名优水产品闻名。作为国家级盐碱地综合利用成果样板区，已筛选培育15个耐盐碱自主知识产权品种。"
                  stats={[
                    { value: '15个', label: '耐盐碱品种' },
                    { value: '国家级', label: '样板区' },
                  ]}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-orange-400 mb-6 flex items-center gap-2">
                <span>🏆</span>
                产业成就
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 border border-green-500/30 bg-green-600/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-600/40 to-emerald-600/40 flex items-center justify-center">
                      <span className="text-3xl">🏢</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">国家级绿色工业园区</h4>
                      <p className="text-gray-400 text-sm mt-1">垦利经济开发区获评国家级绿色工业园区</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border border-blue-500/30 bg-blue-600/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600/40 to-cyan-600/40 flex items-center justify-center">
                      <span className="text-3xl">💰</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">千亿元产业园</h4>
                      <p className="text-gray-400 text-sm mt-1">胜坨化工产业园年营收已突破千亿元</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                产业发展指标
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <ProgressBar label="油气产量占比" value={43} max={100} color="#3b82f6" />
                <ProgressBar label="已探明储量占比" value={45} max={100} color="#06b6d4" />
                <ProgressBar label="工业产值占比" value={57.3} max={100} color="#8b5cf6" />
                <ProgressBar label="数字经济增长" value={2500} max={2500} color="#f97316" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>🌾</span>
                名优农产品
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🦀', name: '黄河口大闸蟹', desc: '中华绒螯蟹优良品种' },
                  { icon: '🐟', name: '黄河口刀鱼', desc: '黄河特产，肉质鲜美' },
                  { icon: '🐙', name: '海参', desc: '优质海珍品' },
                  { icon: '🌾', name: '耐盐碱品种', desc: '15个自主知识产权品种' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-semibold">{item.name}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'culture' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">文化与旅游：河海交汇的文旅胜地</h2>
                  <p className="text-gray-400 text-sm">独特的文化交融之地</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  独特的移民文化、红色文化与黄河文化、石油文化在此交融。垦利被誉为"山东小延安"，拥有丰富的红色历史和独特的自然景观。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="purple">移民文化</Badge>
                  <Badge variant="green">红色文化</Badge>
                  <Badge variant="cyan">黄河文化</Badge>
                  <Badge variant="orange">石油文化</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                <span>🏛️</span>
                文化地标
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 border border-red-500/30 bg-red-600/10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/40 to-orange-600/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">垦利博物馆</h4>
                      <p className="text-gray-400 text-sm">展示垦利的历史文化、自然资源和民俗风情，是了解垦利的重要窗口。</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border border-red-500/30 bg-red-600/10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/40 to-orange-600/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🔴</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">渤海垦区革命纪念馆</h4>
                      <p className="text-gray-400 text-sm">了解"山东小延安"的红色历史，缅怀革命先烈的英勇事迹。</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>⭐</span>
                核心景区
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-4 border border-yellow-500/30 bg-yellow-600/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-yellow-600/30 rounded text-yellow-300 text-xs font-bold">5A</div>
                    <span className="text-xl">🏞️</span>
                  </div>
                  <div className="text-white font-semibold">黄河口生态旅游区</div>
                  <div className="text-gray-500 text-xs mt-1">国家5A级景区</div>
                </div>

                <div className="glass-card p-4 border border-green-500/30 bg-green-600/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-green-600/30 rounded text-green-300 text-xs font-bold">4A</div>
                    <span className="text-xl">🌿</span>
                  </div>
                  <div className="text-white font-semibold">4A级景区</div>
                  <div className="text-gray-500 text-xs mt-1">2处</div>
                </div>

                <div className="glass-card p-4 border border-blue-500/30 bg-blue-600/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-blue-600/30 rounded text-blue-300 text-xs font-bold">3A</div>
                    <span className="text-xl">🏙️</span>
                  </div>
                  <div className="text-white font-semibold">3A级景区</div>
                  <div className="text-gray-500 text-xs mt-1">6处</div>
                </div>

                <div className="glass-card p-4 border border-purple-500/30 bg-purple-600/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-purple-600/30 rounded text-purple-300 text-xs font-bold">总计</div>
                    <span className="text-xl">⭐</span>
                  </div>
                  <div className="text-white font-semibold">旅游景区</div>
                  <div className="text-gray-500 text-xs mt-1">9处</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>🎉</span>
                特色活动
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: '🌾', title: '稻田画风景区', desc: '欣赏壮观的稻田艺术画，感受现代农业魅力' },
                  { icon: '🦀', title: '黄河口大闸蟹开捕节', desc: '体验大闸蟹捕捞，品尝鲜美河鲜' },
                  { icon: '🌊', title: '赶海拾贝节', desc: '在渤海湾畔体验赶海乐趣，捡拾贝壳海鲜' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={600} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：以上数据为2024-2025年最新统计值。垦利区将继续推进高质量发展，打造现代化生态新城。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default KenliDistrict;