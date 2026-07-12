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

function GlowParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            backgroundColor: i % 4 === 0 ? '#3b82f6' : i % 4 === 1 ? '#06b6d4' : i % 4 === 2 ? '#8b5cf6' : '#10b981',
            animation: `glowFloat ${4 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.4 + Math.random() * 0.4,
          }}
        />
      ))}
      <style>{`
        @keyframes glowFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          25% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
          50% { transform: translateY(-15px) scale(1); opacity: 0.6; }
          75% { transform: translateY(-40px) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function RadarAnimation() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 rounded-full border border-cyan-500/20"></div>
      <div className="absolute inset-4 rounded-full border border-cyan-500/30"></div>
      <div className="absolute inset-8 rounded-full border border-cyan-500/40"></div>
      <div className="absolute inset-12 rounded-full border border-cyan-500/50"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse"></div>
      </div>
      
      <div 
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.3) 60deg, transparent 60deg)',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.03s linear',
        }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center">
          <span className="text-3xl">🏞️</span>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
      </div>
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
    blue: { bg: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30', shadow: 'hover:shadow-blue-500/20', text: 'text-blue-400', glow: 'shadow-blue-500/50' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-800/20', border: 'border-cyan-500/30', shadow: 'hover:shadow-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    green: { bg: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30', shadow: 'hover:shadow-green-500/20', text: 'text-green-400', glow: 'shadow-green-500/50' },
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30', shadow: 'hover:shadow-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/50' },
    orange: { bg: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/30', shadow: 'hover:shadow-orange-500/20', text: 'text-orange-400', glow: 'shadow-orange-500/50' },
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} ${colorClasses[color].shadow} ${isHovered ? 'scale-105 shadow-xl ' + colorClasses[color].glow : ''}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${isHovered ? 'from-cyan-600 to-blue-600' : 'from-white/10 to-white/5'} transition-all duration-500`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className={`text-3xl font-bold ${colorClasses[color].text} mb-1`}>{displayValue}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
}

function DataCard({ icon, title, description, stats, highlight = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-6 border transition-all duration-500 ${
        highlight ? 'border-cyan-500/50 bg-cyan-600/10' : 'border-white/10 hover:border-cyan-500/30'
      } ${isHovered ? 'scale-102 shadow-xl shadow-cyan-500/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
          highlight ? 'from-cyan-600/40 to-blue-600/40' : 'from-white/10 to-white/5'
        }`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
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

function TimelineSlider() {
  const [activeYear, setActiveYear] = useState(2024);
  
  const milestones = [
    { year: 2020, event: '总书记指示加快黄河三角洲自然保护地优化整合' },
    { year: 2021, event: '总书记亲临考察，强调创建黄河口国家公园' },
    { year: 2022, event: '国家公园创建任务基本完成' },
    { year: 2023, event: '智慧管理平台上线运行' },
    { year: 2024, event: '入选全国林草信息化重点典型案例' },
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-400 text-sm">建设历程时间线</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-center">
          {milestones.map((item, index) => (
            <div 
              key={item.year}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveYear(item.year)}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeYear === item.year 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50 scale-150' 
                  : 'bg-gray-600 group-hover:bg-gray-500'
              }`}></div>
              <span className={`text-sm mt-2 transition-colors ${
                activeYear === item.year ? 'text-cyan-400 font-semibold' : 'text-gray-500'
              }`}>
                {item.year}
              </span>
            </div>
          ))}
        </div>
        
        <div 
          className="absolute top-2 h-0.5 bg-cyan-500 transition-all duration-300"
          style={{
            left: `${(milestones.findIndex(m => m.year === activeYear) / (milestones.length - 1)) * 100}%`,
            width: '16px',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
          }}
        />
      </div>
      
      <div className="mt-8 p-4 bg-white/5 rounded-lg border border-cyan-500/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <div className="text-cyan-400 font-semibold text-lg">{activeYear}年</div>
            <div className="text-gray-400 text-sm mt-1">{milestones.find(m => m.year === activeYear)?.event}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BirdCard({ name, icon, description, population }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-5 border transition-all duration-500 ${
        isHovered ? 'border-green-500/50 shadow-xl shadow-green-500/20 translate-y-[-8px]' : 'border-white/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <div className="text-green-400 text-sm">{population}</div>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    gold: 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
    cyan: 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30',
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function NationalParkDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('planning');
  
  const tabs = [
    { id: 'planning', label: '顶层科研规划' },
    { id: 'smart', label: '智慧管理平台' },
    { id: 'birds', label: '鸟类监测专项' },
  ];

  const stats = [
    { icon: '🏞️', label: '保护区面积', value: '3518', description: '平方公里全覆盖', color: 'cyan', animated: true },
    { icon: '🔥', label: '火情响应', value: '30', description: '分钟内快速响应', color: 'orange', animated: true },
    { icon: '🦅', label: '鸟类识别', value: '90%', description: 'AI识别精度', color: 'green', animated: true },
    { icon: '📊', label: '数据资源登记', value: '1项', description: '国家级数据认证', color: 'purple', animated: false },
  ];

  const planningSystems = [
    { 
      icon: '🔬', 
      title: '黄河三角洲生物多样性调查评价分析系统', 
      description: '围绕国家公园建设需求，已上线运行，为国土空间规划和生态修复提供科学依据',
      stats: [{ value: '2022', label: '上线年份' }, { value: '国家级', label: '级别' }],
      highlight: true,
    },
    { 
      icon: '🗺️', 
      title: '国土空间规划支撑系统', 
      description: '整合多源空间数据，支撑国家公园空间布局优化和功能区划',
      stats: [{ value: '8大类', label: '数据类型' }, { value: '全覆盖', label: '范围' }],
      highlight: false,
    },
    { 
      icon: '🌿', 
      title: '生态修复决策支持系统', 
      description: '基于科学评估，为退化湿地生态修复提供技术方案和效果评估',
      stats: [{ value: '12项', label: '修复指标' }, { value: 'AI优化', label: '方案' }],
      highlight: false,
    },
  ];

  const smartFeatures = [
    { icon: '🤖', title: 'AI智能识别', description: '运用AI技术实现鸟类自动识别，识别精度超90%' },
    { icon: '📶', title: '5G全覆盖', description: '3518平方公里保护区5G网络全覆盖，保障数据实时传输' },
    { icon: '🚨', title: '智能火情监测', description: 'AI火情识别系统，响应时间缩至30分钟内' },
    { icon: '📊', title: '大数据分析', description: '整合多源数据，提供科学决策支持' },
  ];

  const birdSpecies = [
    { name: '东方白鹳', icon: '🦢', population: '2000+只', description: '全球最大的繁殖种群，保护区被誉为"中国东方白鹳之乡"' },
    { name: '黑嘴鸥', icon: '🐦', population: '10000+只', description: '全球第二大黑嘴鸥繁殖地，占全球总量的30%以上' },
    { name: '丹顶鹤', icon: '🦅', population: '300+只', description: '重要的越冬栖息地，每年冬季有数百只丹顶鹤在此越冬' },
    { name: '鹤类', icon: '🕊️', population: '多种', description: '多种鹤类在此栖息繁殖，是重要的鹤类保护地' },
  ];

  const birdDataSets = [
    { name: '鸟类名录', description: '完整记录保护区376种鸟类的基本信息' },
    { name: '鹤类观察', description: '长期监测记录鹤类种群动态和行为习性' },
    { name: '鸻鹬类种群', description: '迁徙水鸟同步调查数据，记录种群数量变化' },
    { name: '重要迁徙水鸟', description: '重点监测迁徙水鸟的数量和分布动态' },
    { name: '东方白鹳繁殖生态', description: '专项监测东方白鹳的繁殖行为和繁殖成功率' },
    { name: '黑嘴鸥繁殖生态', description: '黑嘴鸥繁殖习性和巢址选择研究数据' },
    { name: '丹顶鹤繁殖生态', description: '丹顶鹤越冬行为和栖息地利用研究' },
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
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.4) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}></div>
            </div>
            <GlowParticles />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <RadarAnimation />
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge variant="cyan">国家公园</Badge>
                    <Badge variant="gold">智慧管理</Badge>
                    <Badge variant="green">数据底座</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    国家公园建设：顶层设计的数据底座
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    为支撑黄河口国家公园的高质量创建，相关数据资源侧重于顶层规划与智慧化管理，构建"天空地海"一体化的智慧管理体系。
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
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

        {activeTab === 'planning' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">顶层科研规划数据</h2>
                  <p className="text-gray-400 text-sm">围绕国家公园建设需求，提供科学依据</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  围绕国家公园建设需求，已上线 <span className="text-cyan-400 font-semibold">"黄河三角洲生物多样性调查评价分析系统"</span>，
                  并开展专项研究，为国土空间规划和生态修复提供科学依据。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {planningSystems.map((system, index) => (
                    <DataCard
                      key={index}
                      icon={system.icon}
                      title={system.title}
                      description={system.description}
                      stats={system.stats}
                      highlight={system.highlight}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📊</span>
                专项研究方向
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '🌿', title: '生物多样性评估', desc: '系统评估保护区生物多样性现状与变化趋势' },
                  { icon: '🏞️', title: '生态系统健康', desc: '评估生态系统健康状况，识别退化区域' },
                  { icon: '🗺️', title: '国土空间优化', desc: '优化国家公园空间布局与功能区划' },
                  { icon: '🔄', title: '生态修复技术', desc: '研发退化湿地生态修复技术与方案' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br transition-all duration-300 ${
                      index < 2 ? 'from-cyan-600/20 to-blue-600/20' : 'from-green-600/20 to-cyan-600/20'
                    } group-hover:scale-110`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-medium mb-1">{item.title}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <TimelineSlider />
            </AnimatedSection>
          </>
        )}

        {activeTab === 'smart' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">智慧管理平台数据</h2>
                  <p className="text-gray-400 text-sm">黄河口国家公园智慧管理平台</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  核心是 <span className="text-green-400 font-semibold">"黄河口国家公园智慧管理平台"</span>。
                  它整合了多源数据，运用AI与5G技术，覆盖 <span className="text-cyan-400 font-semibold">3518平方公里</span> 保护区，
                  能将火情响应时间缩至 <span className="text-orange-400 font-semibold">30分钟内</span>，
                  鸟类识别精度超 <span className="text-green-400 font-semibold">90%</span>，
                  实现了从"人巡"到"技防"的跨越。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>🌟</span>
                核心功能
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {smartFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="glass-card p-5 border border-white/10 hover:border-green-500/30 transition-all duration-500 group hover:scale-105"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-500 ${
                      index === 0 ? 'from-cyan-600/30 to-blue-600/30' :
                      index === 1 ? 'from-green-600/30 to-cyan-600/30' :
                      index === 2 ? 'from-orange-600/30 to-yellow-600/30' :
                      'from-purple-600/30 to-pink-600/30'
                    } group-hover:scale-110`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📈</span>
                技术指标
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="glass-card p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: '保护区覆盖面积', value: 3518, max: 4000, color: '#06b6d4', unit: 'km²', desc: '3518平方公里全覆盖' },
                    { label: '火情响应时间', value: 30, max: 120, color: '#f97316', unit: '分钟', desc: '从发现到响应' },
                    { label: '鸟类识别精度', value: 90, max: 100, color: '#22c55e', unit: '%', desc: 'AI智能识别准确率' },
                  ].map((item, index) => (
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
                            strokeDashoffset={2 * Math.PI * 56 - (item.value / item.max) * 2 * Math.PI * 56}
                            className="transition-all duration-1500"
                            style={{ filter: `drop-shadow(0 0 8px ${item.color})` }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-white">{item.value}</span>
                          <span className="text-xs text-gray-500">{item.unit}</span>
                        </div>
                      </div>
                      <div className="text-white font-medium mb-1">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>🎯</span>
                平台优势
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: '多源数据整合', desc: '整合遥感、监测站、视频监控等多源数据，实现数据融合共享', icon: '🔄', color: 'from-blue-600/20 to-purple-600/20' },
                  { title: 'AI智能分析', desc: '运用人工智能技术，实现鸟类识别、火情监测、生态评估等智能化分析', icon: '🤖', color: 'from-purple-600/20 to-pink-600/20' },
                  { title: '5G实时传输', desc: '5G网络全覆盖，保障监测数据实时传输，支持远程指挥调度', icon: '📶', color: 'from-green-600/20 to-cyan-600/20' },
                  { title: '可视化展示', desc: '提供直观的数据可视化展示，支持决策分析和指挥调度', icon: '📊', color: 'from-cyan-600/20 to-blue-600/20' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.color}`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'birds' && (
          <>
            <AnimatedSection delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">🦅</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">鸟类监测专项数据</h2>
                  <p className="text-gray-400 text-sm">国家公共数据资源登记认证</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  保护区鸟类监测数据已获 <span className="text-yellow-400 font-semibold">国家公共数据资源登记</span>。
                  数据集涵盖鸟类名录、鹤类观察、鸻鹬类种群、迁徙水鸟及东方白鹳、黑嘴鸥、丹顶鹤繁殖生态等，
                  实现了鸟类数据的"持证上岗"。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="gold">国家公共数据资源登记</Badge>
                  <Badge variant="green">376种鸟类</Badge>
                  <Badge variant="cyan">26种一级保护</Badge>
                  <Badge variant="blue">66种二级保护</Badge>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                <span>⭐</span>
                旗舰物种监测
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {birdSpecies.map((bird, index) => (
                  <BirdCard
                    key={index}
                    name={bird.name}
                    icon={bird.icon}
                    population={bird.population}
                    description={bird.description}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>📋</span>
                专项数据集
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={700}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {birdDataSets.map((data, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600/20 to-cyan-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span>📊</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{data.name}</div>
                        <div className="text-gray-500 text-xs">{data.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={800}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>🏆</span>
                数据认证与荣誉
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={900}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 p-4 bg-yellow-600/10 rounded-lg border border-yellow-500/20">
                    <div className="w-12 h-12 rounded-xl bg-yellow-600/30 flex items-center justify-center">
                      <span className="text-2xl">🏅</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">国家公共数据资源登记</div>
                      <div className="text-gray-400 text-sm">鸟类监测数据已获国家级数据资源登记认证</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-4 p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                    <div className="w-12 h-12 rounded-xl bg-green-600/30 flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">《黄河三角洲鸟类图鉴》</div>
                      <div className="text-gray-400 text-sm">收录376种鸟类，提供完整的物种信息</div>
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
              注：国家公园建设数据持续更新中，以上数据为最新统计值。智慧管理平台将持续升级，提升国家公园管理的智能化水平。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default NationalParkDetail;