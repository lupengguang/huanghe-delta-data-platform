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

function StatCard({ icon, label, value, description, color = 'blue', animated = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  
  useEffect(() => {
    if (animated && value) {
      const num = parseInt(value.replace(/[^\d]/g, ''));
      if (!isNaN(num)) {
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            const suffix = value.replace(/[\d]/g, '');
            setDisplayValue(Math.floor(current) + suffix);
          }
        }, duration / steps);
        return () => clearInterval(timer);
      }
    }
    setDisplayValue(value);
  }, [value, animated]);

  const colorClasses = {
    blue: {
      bg: 'from-blue-600/20 to-blue-800/20',
      border: 'border-blue-500/30',
      shadow: 'hover:shadow-blue-500/20',
      text: 'text-blue-400',
      iconBg: 'from-blue-600/30 to-blue-800/30',
    },
    green: {
      bg: 'from-green-600/20 to-green-800/20',
      border: 'border-green-500/30',
      shadow: 'hover:shadow-green-500/20',
      text: 'text-green-400',
      iconBg: 'from-green-600/30 to-green-800/30',
    },
    purple: {
      bg: 'from-purple-600/20 to-purple-800/20',
      border: 'border-purple-500/30',
      shadow: 'hover:shadow-purple-500/20',
      text: 'text-purple-400',
      iconBg: 'from-purple-600/30 to-purple-800/30',
    },
    orange: {
      bg: 'from-orange-600/20 to-orange-800/20',
      border: 'border-orange-500/30',
      shadow: 'hover:shadow-orange-500/20',
      text: 'text-orange-400',
      iconBg: 'from-orange-600/30 to-orange-800/30',
    },
    cyan: {
      bg: 'from-cyan-600/20 to-cyan-800/20',
      border: 'border-cyan-500/30',
      shadow: 'hover:shadow-cyan-500/20',
      text: 'text-cyan-400',
      iconBg: 'from-cyan-600/30 to-cyan-800/30',
    },
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} ${colorClasses[color].shadow} ${
        isHovered ? 'scale-105 shadow-xl' : ''
      }`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${
          isHovered ? 'from-blue-600 to-purple-600' : colorClasses[color].iconBg
        } transition-all duration-500`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className={`text-3xl font-bold ${colorClasses[color].text} mb-1`}>{displayValue}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
}

function MonitorCard({ icon, title, description, stats, color = 'blue' }) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: 'border-blue-500/30 hover:shadow-blue-500/20',
    green: 'border-green-500/30 hover:shadow-green-500/20',
    purple: 'border-purple-500/30 hover:shadow-purple-500/20',
    orange: 'border-orange-500/30 hover:shadow-orange-500/20',
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-6 border transition-all duration-500 ${colorClasses[color]} ${
        isHovered ? 'scale-102 shadow-xl' : ''
      }`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
            isHovered ? 'from-blue-600 to-purple-600' : 'from-white/10 to-white/5'
          } transition-all duration-500`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="text-xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DataFlowVisualization() {
  const [activeFlow, setActiveFlow] = useState(0);
  
  const flows = [
    { name: '陆域监测', value: 91, color: '#3b82f6' },
    { name: '水文监测', value: 30, color: '#06b6d4' },
    { name: '气象监测', value: 4, color: '#8b5cf6' },
    { name: '视频监控', value: 300, color: '#ec4899' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % flows.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [flows.length]);

  return (
    <div className="relative h-48 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
              <span className="text-2xl">📡</span>
            </div>
          </div>
        </div>
      </div>
      
      {flows.map((flow, index) => {
        const angle = (index / flows.length) * 360 - 90;
        const radius = 140;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        
        return (
          <div
            key={index}
            className="absolute"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transition: 'all 0.5s ease-out',
            }}
            onMouseEnter={() => setActiveFlow(index)}
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
              activeFlow === index 
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 scale-110 shadow-lg shadow-blue-500/50' 
                : 'bg-white/10'
            }`}>
              <span className="text-xl">{index === 0 ? '🌍' : index === 1 ? '💧' : index === 2 ? '🌤️' : '📹'}</span>
            </div>
            <div className="text-center mt-2">
              <div className={`text-lg font-bold ${activeFlow === index ? 'text-blue-400' : 'text-gray-400'}`}>
                {flow.value}
              </div>
              <div className="text-xs text-gray-500">{flow.name}</div>
            </div>
          </div>
        );
      })}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {flows.map((flow, index) => {
          const angle = (index / flows.length) * 360 - 90;
          const radius = 140;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={activeFlow === index ? flow.color : 'rgba(255,255,255,0.1)'}
              strokeWidth={activeFlow === index ? '2' : '1'}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
    </div>
  );
}

function BirdMonitoringCard({ birdName, population, description }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-5 transition-all duration-500 ${
        isHovered ? 'translate-y-[-8px] shadow-xl shadow-blue-500/20' : ''
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
            <span className="text-xl">🦅</span>
          </div>
          <div>
            <h4 className="text-white font-semibold">{birdName}</h4>
            <div className="text-blue-400 text-sm">{population}</div>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        <div className="mt-3 flex items-center text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          <span>查看详细数据</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ value, max, label, color = '#3b82f6' }) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <svg className="w-28 h-28 -rotate-90">
        <circle
          cx="56"
          cy="56"
          r="45"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="56"
          cy="56"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="text-2xl font-bold text-white mt-2">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    gold: 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function MonitoringData() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: '监测网络' },
    { id: 'environment', label: '环境要素' },
    { id: 'biodiversity', label: '生物多样性' },
    { id: 'integration', label: '一体化平台' },
  ];

  const monitoringStats = [
    { icon: '📶', label: '5G网络基站', value: '35处', description: '覆盖保护区全域', color: 'blue', animated: true },
    { icon: '🌍', label: '湿地生态监测站', value: '91处', description: '定位监测网络', color: 'green', animated: true },
    { icon: '💧', label: '水文自动监测站', value: '30处', description: '实时水文监测', color: 'cyan', animated: true },
    { icon: '🌤️', label: '气象观测站', value: '4处', description: '气象要素采集', color: 'orange', animated: true },
    { icon: '😷', label: '空气质量观测站', value: '1处', description: '大气质量监测', color: 'purple', animated: true },
    { icon: '📹', label: '视频监控', value: '300+处', description: 'AI智能识别', color: 'blue', animated: true },
  ];

  const environmentMonitors = [
    { 
      icon: '💧', 
      title: '水文监测', 
      description: '通过30处水文自动监测站，实时监测水位、流量、水质等关键水文参数',
      stats: [
        { value: '30处', label: '监测站' },
        { value: '24/7', label: '全天候' },
      ],
      color: 'cyan',
    },
    { 
      icon: '🌤️', 
      title: '气象监测', 
      description: '4处气象观测站实时采集温度、降水、风速、太阳辐射等气象要素',
      stats: [
        { value: '4处', label: '观测站' },
        { value: '6要素', label: '监测项' },
      ],
      color: 'orange',
    },
    { 
      icon: '😷', 
      title: '空气质量', 
      description: '1处空气质量观测站监测PM2.5、PM10、SO2、NO2等大气污染物',
      stats: [
        { value: '1处', label: '观测站' },
        { value: '8项', label: '污染物' },
      ],
      color: 'purple',
    },
    { 
      icon: '🌱', 
      title: '湿地生态定位观测', 
      description: '9处湿地生态系统定位观测站点，监测湿地植被、土壤、生物群落动态',
      stats: [
        { value: '9处', label: '观测站' },
        { value: '12项', label: '核心指标' },
      ],
      color: 'green',
    },
  ];

  const birdSpecies = [
    { name: '东方白鹳', population: '2,000+只', description: '全球最大的繁殖种群，保护区被誉为"中国东方白鹳之乡"' },
    { name: '黑嘴鸥', population: '10,000+只', description: '全球第二大黑嘴鸥繁殖地，占全球总量的30%以上' },
    { name: '丹顶鹤', population: '300+只', description: '重要的越冬栖息地，每年冬季有数百只丹顶鹤在此越冬' },
    { name: '白鹤', population: '1,000+只', description: '世界濒危物种，迁徙途中重要的停歇地' },
  ];

  const techApplications = [
    { icon: '🤖', title: 'AI鸟脸识别', description: '18处视频监控搭载AI算法，可进行精准的鸟类个体识别' },
    { icon: '🏷️', title: '鸟类环志', description: '通过环志技术追踪鸟类迁徙路线和种群动态' },
    { icon: '🛰️', title: '卫星遥测', description: '利用卫星追踪旗舰物种的活动范围和迁徙行为' },
    { icon: '📊', title: '数据分析平台', description: '实时分析鸟类监测数据，支持科学研究和保护决策' },
  ];

  const integrationFeatures = [
    { icon: '👁️', title: '监测预警', description: '实时监测数据异常，及时发出预警信息' },
    { icon: '🧠', title: '分析研判', description: '利用AI算法分析监测数据，提供科学研判依据' },
    { icon: '🎯', title: '联动指挥', description: '建立跨部门联动机制，实现快速响应和协同指挥' },
  ];

  const coreElements = [
    '土地利用', '湿地生态', '水资源', '气象环境', '土壤环境', 
    '生物多样性', '海洋环境', '生态质量', '植被覆盖', '水文要素',
    '空气质量', '野生动物',
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>

        <AnimatedSection className="mb-12">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-cyan-900/60"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}></div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/20">
                    <img
                      src={withBase('/images/黄河三角洲生态监测中心.png')}
                      alt="监测数据平台"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <Badge variant="cyan" className="mb-4">实时监测</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    监测数据：动态感知网络
                  </h1>
                  <p className="text-gray-300 max-w-2xl leading-relaxed">
                    通过布设在地面、海上和空中的传感器网络，实现实时、多维的全域动态监测，构建"天空地海"一体化监测体系。
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
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">📶</span>
                陆域监测站网：密集感知网络
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      在保护区内，已建成 <span className="text-cyan-400 font-semibold">35处5G网络基站</span> 和 
                      <span className="text-green-400 font-semibold">91处湿地生态环境定位监测站</span>，
                      形成了密集的感知网络，实现对保护区全域的实时动态监测。
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-4xl font-bold text-cyan-400 mb-2">35</div>
                        <div className="text-gray-400 text-sm">5G网络基站</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <div className="text-4xl font-bold text-green-400 mb-2">91</div>
                        <div className="text-gray-400 text-sm">生态定位监测站</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <DataFlowVisualization />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {monitoringStats.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                    color={stat.color}
                    animated={stat.animated}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>🔗</span>
                  监测网络连接示意
                </h3>
                <div className="relative h-24">
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    {['地面传感器', '5G基站', '监测站', '视频监控', '云端平台'].map((node, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          index === 4 
                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50' 
                            : 'bg-white/10'
                        }`}>
                          <span className="text-sm">
                            {index === 0 ? '🌍' : index === 1 ? '📶' : index === 2 ? '🏢' : index === 3 ? '📹' : '☁️'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{node}</span>
                      </div>
                    ))}
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <g key={i}>
                        <line
                          x1={`${(i + 1) * 20 + 5}%`}
                          y1="50%"
                          x2={`${(i + 2) * 20 - 5}%`}
                          y2="50%"
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <circle
                          cx={`${(i + 1.5) * 20}%`}
                          cy="50%"
                          r="4"
                          fill="#3b82f6"
                          className="animate-pulse"
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'environment' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🌡️</span>
                环境要素监测：实时感知
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-gray-400 mb-8 max-w-3xl">
                通过水文自动监测站、气象观测站、空气质量观测站，以及湿地生态系统定位观测站点，实现对水文、土壤、气象等关键环境要素的实时监测。
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {environmentMonitors.map((monitor, index) => (
                  <MonitorCard
                    key={index}
                    icon={monitor.icon}
                    title={monitor.title}
                    description={monitor.description}
                    stats={monitor.stats}
                    color={monitor.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📊</span>
                  实时监测数据概览
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: '水温', value: '25.3°C', unit: '', trend: '↑', color: '#ef4444' },
                    { label: 'pH值', value: '7.8', unit: '', trend: '→', color: '#22c55e' },
                    { label: '溶解氧', value: '8.2', unit: 'mg/L', trend: '↑', color: '#3b82f6' },
                    { label: '湿度', value: '65', unit: '%', trend: '↓', color: '#8b5cf6' },
                  ].map((data, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-gray-400 text-sm mb-2">{data.label}</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-white">{data.value}</span>
                        <span className="text-gray-500 text-sm">{data.unit}</span>
                      </div>
                      <div className={`text-xs mt-1 ${
                        data.trend === '↑' ? 'text-green-400' : 
                        data.trend === '↓' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {data.trend === '↑' ? '上升' : data.trend === '↓' ? '下降' : '稳定'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲平均土壤湿度.png')}
                  alt="环境监测"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">湿地生态系统定位观测</h3>
                    <p className="text-gray-300 text-sm">9处定位观测站点，实现对湿地生态系统的长期连续监测</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'biodiversity' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🦅</span>
                生物多样性监测：鸟类监测
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  鸟类监测是保护区最具特色的监测项目。保护区的鸟类监测数据已获 <span className="text-yellow-400 font-semibold">国家公共数据资源登记</span>，
                  数据涵盖鸟类名录、鹤类观察、鸻鹬类种群动态、重要迁徙水鸟同步调查及旗舰物种繁殖生态等专项数据集。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: '376种', label: '鸟类物种', icon: '🐦' },
                    { value: '26种', label: '国家一级保护', icon: '🏆' },
                    { value: '66种', label: '国家二级保护', icon: '🥈' },
                    { value: '38种', label: '种群达全球1%', icon: '🌍' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <span className="text-3xl block mb-2">{stat.icon}</span>
                      <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>⭐</span>
                旗舰物种监测
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {birdSpecies.map((bird, index) => (
                  <BirdMonitoringCard
                    key={index}
                    birdName={bird.name}
                    population={bird.population}
                    description={bird.description}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🤖</span>
                技术应用
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techApplications.map((tech, index) => (
                  <div
                    key={index}
                    className="glass-card p-5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      index === 0 ? 'bg-gradient-to-br from-cyan-600/30 to-blue-600/30' :
                      index === 1 ? 'bg-gradient-to-br from-green-600/30 to-cyan-600/30' :
                      index === 2 ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30' :
                      'bg-gradient-to-br from-orange-600/30 to-yellow-600/30'
                    } group-hover:scale-110`}>
                      <span className="text-2xl">{tech.icon}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{tech.title}</h4>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={700} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📹</span>
                  AI智能监控覆盖
                </h3>
                <div className="flex justify-center gap-8">
                  <ProgressRing value={18} max={300} label="AI监控数量" color="#06b6d4" />
                  <ProgressRing value={300} max={300} label="视频监控总量" color="#3b82f6" />
                  <ProgressRing value={376} max={500} label="鸟类监测物种" color="#8b5cf6" />
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'integration' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🌐</span>
                "天空地海"一体化监测平台
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  上述所有监测数据最终汇入 <span className="text-cyan-400 font-semibold">"天空地海"一体化监测平台</span>，
                  形成"监测预警—分析研判—联动指挥"的闭环，监测范围覆盖土地、湿地、水资源等8大类12个核心要素。
                </p>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-xl"></div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {integrationFeatures.map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${
                          index === 0 ? 'from-blue-600/30 to-cyan-600/30' :
                          index === 1 ? 'from-purple-600/30 to-blue-600/30' :
                          'from-cyan-600/30 to-green-600/30'
                        } shadow-lg`}>
                          <span className="text-3xl">{feature.icon}</span>
                        </div>
                        <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="33%" y1="50%" x2="66%" y2="50%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
                    <circle cx="50%" cy="50%" r="4" fill="#3b82f6" className="animate-pulse" />
                  </svg>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📋</span>
                核心监测要素（8大类12个核心要素）
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {coreElements.map((element, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/5 rounded-lg text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                    >
                      <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br transition-all duration-300 ${
                        index < 4 ? 'from-blue-600/20 to-cyan-600/20' :
                        index < 8 ? 'from-purple-600/20 to-blue-600/20' :
                        'from-green-600/20 to-cyan-600/20'
                      } group-hover:scale-110`}>
                        <span className="text-lg">
                          {index === 0 ? '🏔️' : index === 1 ? '🌿' : index === 2 ? '💧' : index === 3 ? '🌤️' :
                           index === 4 ? '🏜️' : index === 5 ? '🦅' : index === 6 ? '🌊' : index === 7 ? '📊' :
                           index === 8 ? '🌱' : index === 9 ? '🚰' : index === 10 ? '🌬️' : '🐾'}
                        </span>
                      </div>
                      <div className="text-white text-sm font-medium">{element}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    <span>📈</span>
                    数据接入规模
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: '监测站点总数', value: 161, max: 200, color: '#3b82f6' },
                      { label: '视频监控覆盖率', value: 95, max: 100, color: '#06b6d4' },
                      { label: '数据采集频率', value: 100, max: 100, color: '#8b5cf6' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400 text-sm">{item.label}</span>
                          <span className="text-white text-sm">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${(item.value / item.max) * 100}%`,
                              backgroundColor: item.color,
                              boxShadow: `0 0 10px ${item.color}`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    <span>🏆</span>
                    数据资源登记
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-600/10 rounded-lg border border-yellow-500/20">
                      <div className="w-8 h-8 rounded-full bg-yellow-600/30 flex items-center justify-center">
                        <span>📋</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">国家公共数据资源登记</div>
                        <div className="text-gray-400 text-xs">鸟类监测数据已获国家级登记</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-600/10 rounded-lg border border-green-500/20">
                      <div className="w-8 h-8 rounded-full bg-green-600/30 flex items-center justify-center">
                        <span>🔬</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">科研数据共享</div>
                        <div className="text-gray-400 text-xs">支持科研合作与数据共享</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                        <span>🌐</span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">开放数据服务</div>
                        <div className="text-gray-400 text-xs">面向公众提供数据查询服务</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲NDVI.png')}
                  alt="一体化监测"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">天空地海一体化监测体系</h3>
                    <p className="text-gray-300 text-sm">实现全域15.3万公顷栖息地智慧监测，构建完整的生态保护闭环</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={500} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：监测数据实时更新中，以上数据为最新统计值。监测网络持续扩展，以提升保护区生态环境监测能力。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default MonitoringData;