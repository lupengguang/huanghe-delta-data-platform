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

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}

function DataFlowAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const partners = [
    { name: '中科院', icon: '🔬', color: '#3b82f6' },
    { name: '北师大', icon: '📚', color: '#8b5cf6' },
    { name: '复旦大学', icon: '🏛️', color: '#06b6d4' },
    { name: '30余家机构', icon: '🤝', color: '#22c55e' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <div className="relative h-40 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border-2 border-blue-500/30">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
            <span className="text-3xl">🧬</span>
          </div>
        </div>
      </div>

      {partners.map((partner, index) => {
        const angle = (index / partners.length) * 360 - 90;
        const radius = 130;
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
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              activeIndex === index 
                ? 'scale-110 shadow-lg' 
                : 'bg-white/10'
            }`}
            style={{
              backgroundColor: activeIndex === index ? partner.color + '40' : 'rgba(255,255,255,0.1)',
              boxShadow: activeIndex === index ? `0 0 20px ${partner.color}60` : 'none',
            }}>
              <span className="text-xl">{partner.icon}</span>
            </div>
            <div className="text-center mt-2">
              <div className={`text-sm font-medium transition-colors ${
                activeIndex === index ? 'text-white' : 'text-gray-400'
              }`}>
                {partner.name}
              </div>
            </div>
          </div>
        );
      })}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {partners.map((partner, index) => {
          const angle = (index / partners.length) * 360 - 90;
          const radius = 130;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={activeIndex === index ? partner.color : 'rgba(255,255,255,0.1)'}
              strokeWidth={activeIndex === index ? '2' : '1'}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
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
    blue: { bg: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-500/30', shadow: 'hover:shadow-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/30', shadow: 'hover:shadow-purple-500/20', text: 'text-purple-400' },
    green: { bg: 'from-green-600/20 to-green-800/20', border: 'border-green-500/30', shadow: 'hover:shadow-green-500/20', text: 'text-green-400' },
    orange: { bg: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/30', shadow: 'hover:shadow-orange-500/20', text: 'text-orange-400' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-800/20', border: 'border-cyan-500/30', shadow: 'hover:shadow-cyan-500/20', text: 'text-cyan-400' },
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`glass-card p-6 border bg-gradient-to-br transition-all duration-500 ${colorClasses[color].bg} ${colorClasses[color].border} ${colorClasses[color].shadow} ${isHovered ? 'scale-105 shadow-xl' : ''}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${isHovered ? 'from-blue-600 to-purple-600' : 'from-white/10 to-white/5'} transition-all duration-500`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-400 mb-2">{label}</div>
        <div className={`text-3xl font-bold ${colorClasses[color].text} mb-1`}>{displayValue}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
}

function PartnerCard({ name, type, description, highlight = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-5 border transition-all duration-500 ${
        highlight ? 'border-purple-500/50 bg-purple-600/10' : 'border-white/10 hover:border-purple-500/30'
      } ${isHovered ? 'scale-102 shadow-xl shadow-purple-500/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
            highlight ? 'bg-purple-600/30 text-purple-300' : 'bg-blue-600/20 text-blue-400'
          }`}>
            {type}
          </span>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          highlight ? 'bg-purple-600/30' : 'bg-white/10'
        }`}>
          <span className="text-lg">🏛️</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ProjectCard({ title, type, year, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className="glass-card p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
          type === '国家级' ? 'from-yellow-600/30 to-orange-600/30' : 'from-blue-600/30 to-purple-600/30'
        }`}>
          <span className="text-xl">📋</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-white font-semibold">{title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              type === '国家级' ? 'bg-yellow-600/30 text-yellow-300' : 'bg-blue-600/30 text-blue-300'
            }`}>
              {type}
            </span>
            <span className="text-xs text-gray-500">{year}</span>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-gray-500">项目类型</div>
              <div className="text-white font-medium">{type}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-gray-500">执行年份</div>
              <div className="text-white font-medium">{year}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PublicationCard({ type, title, count, icon, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-6 h-full transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
          isHovered ? 'scale-110' : ''
        }`} style={{ backgroundColor: color + '30' }}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-400 mb-1">{type}</div>
        <div className="text-4xl font-bold mb-2" style={{ color: color }}>{count}</div>
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`} style={{ backgroundColor: color }}></div>
      </div>
    </div>
  );
}

function ResearchTopicCard({ icon, title, description, stats }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card p-5 border transition-all duration-500 ${
        isHovered ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/20 translate-y-[-4px]' : 'border-white/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-500 ${
        isHovered ? 'from-cyan-600 to-blue-600' : 'from-cyan-600/20 to-blue-600/20'
      }`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, index) => (
            <span key={index} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              {stat}
            </span>
          ))}
        </div>
      )}
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
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function ResearchResults() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('platform');
  
  const tabs = [
    { id: 'platform', label: '科研平台' },
    { id: 'projects', label: '重大课题' },
    { id: 'publications', label: '学术产出' },
    { id: 'topics', label: '研究主题' },
  ];

  const stats = [
    { icon: '🏛️', label: '合作机构', value: '30+家', description: '中科院、北师大、复旦等', color: 'blue', animated: true },
    { icon: '🔬', label: '科研基地', value: '11家', description: '生态监测与教学基地', color: 'purple', animated: true },
    { icon: '📋', label: '国家级课题', value: '30+项', description: '近五年联合攻关', color: 'cyan', animated: true },
    { icon: '📝', label: '学术论文', value: '100+篇', description: '核心期刊发表', color: 'green', animated: true },
    { icon: '🏆', label: '发明专利', value: '13项', description: '国家级专利授权', color: 'orange', animated: true },
    { icon: '📚', label: '专著出版', value: '多部', description: '《鸟类图鉴》等', color: 'blue', animated: false },
  ];

  const partners = [
    { name: '中国科学院', type: '国家级科研机构', description: '与中科院多个研究所开展深度合作，共同开展湿地生态研究', highlight: true },
    { name: '北京师范大学', type: '高校合作', description: '在生态环境监测、遥感应用等领域开展联合研究', highlight: false },
    { name: '复旦大学', type: '高校合作', description: '在生物多样性保护、生态系统评估等方面开展合作', highlight: false },
    { name: '山东师范大学', type: '地方高校', description: '在区域生态研究、湿地保护等领域开展合作', highlight: false },
    { name: '黄委信息中心', type: '行业机构', description: '在水文监测、遥感数据处理等方面开展合作', highlight: false },
    { name: '国家生态质量综合监测站', type: '国家级监测站', description: '山东黄河三角洲站（湿地），国家级生态监测平台', highlight: true },
  ];

  const researchBases = [
    { name: '国家生态质量综合监测站——山东黄河三角洲站（湿地）', type: '国家级', icon: '🏆' },
    { name: '黄河三角洲湿地生态系统国家野外科学观测研究站', type: '国家级', icon: '🔬' },
    { name: '山东黄河三角洲国家级自然保护区科研中心', type: '省级', icon: '📊' },
    { name: '山东黄河三角洲国家级自然保护区教学实习基地', type: '高校合作', icon: '📚' },
    { name: '中国科学院地理科学与资源研究所研究基地', type: '科研合作', icon: '🔍' },
    { name: '北京师范大学生态学研究基地', type: '高校合作', icon: '🎓' },
  ];

  const projects = [
    { title: '基于"3S"的黄河三角洲湿地变化与生态调度关系研究', type: '国家级', year: '2020-2023', description: '利用RS、GIS、GPS技术研究湿地动态变化与生态调度的耦合关系' },
    { title: '北斗星动能科技示范工程', type: '国家级', year: '2021-2024', description: '基于北斗卫星技术的生态监测与保护示范项目' },
    { title: '黄河三角洲湿地生态系统健康评估与修复技术研究', type: '国家级', year: '2019-2022', description: '开展湿地生态系统健康评估方法研究与修复技术示范' },
    { title: '滨海湿地碳汇功能评估与增汇技术研究', type: '国家级', year: '2022-2025', description: '评估滨海湿地碳汇潜力，研发增汇技术' },
    { title: '候鸟迁徙通道保护与恢复技术研究', type: '省部级', year: '2020-2023', description: '研究候鸟迁徙通道保护与栖息地恢复技术' },
    { title: '黄河三角洲生物多样性监测与保护体系建设', type: '省部级', year: '2021-2024', description: '构建完善的生物多样性监测与保护体系' },
  ];

  const publications = [
    { type: '学术论文', title: '核心期刊发表', count: '100+', icon: '📝', color: '#3b82f6' },
    { type: '发明专利', title: '国家级授权', count: '13', icon: '🏆', color: '#f59e0b' },
    { type: '专著出版', title: '系列专著', count: '多部', icon: '📚', color: '#8b5cf6' },
    { type: '技术标准', title: '行业规范', count: '5', icon: '📋', color: '#22c55e' },
  ];

  const researchTopics = [
    { icon: '📊', title: '生态环境质量评估', description: '建立保护区生态环境质量综合评估体系，开展年度评估与趋势分析', stats: ['年度评估', '趋势分析', '预警模型'] },
    { icon: '🌿', title: '湿地植物群落分类', description: '研究湿地植物群落结构与演替规律，建立湿地植被分类系统', stats: ['群落结构', '演替规律', '植被制图'] },
    { icon: '🦅', title: '关键物种保护', description: '开展东方白鹳、黑嘴鸥、丹顶鹤等旗舰物种的保护生物学研究', stats: ['繁殖生态', '栖息地保护', '种群动态'] },
    { icon: '💧', title: '水文生态模拟', description: '建立水文过程与生态响应耦合模型，模拟不同水文情景下的生态响应', stats: ['水文模型', '生态响应', '情景模拟'] },
    { icon: '🗺️', title: '土地利用/覆盖变化', description: '基于遥感数据研究土地利用变化过程、驱动机制与生态效应', stats: ['遥感监测', '变化检测', '驱动力分析'] },
    { icon: '🌍', title: '气候变化影响', description: '评估气候变化对保护区生态系统的影响，制定适应策略', stats: ['气候响应', '风险评估', '适应对策'] },
    { icon: '🤖', title: 'AI监测技术应用', description: '开发基于人工智能的生态监测与分析技术，提升监测智能化水平', stats: ['AI识别', '智能监测', '数据分析'] },
    { icon: '🔬', title: '生态修复技术', description: '研发退化湿地生态修复技术，开展修复示范与效果评估', stats: ['修复技术', '示范工程', '效果评估'] },
  ];

  const books = [
    { title: '黄河三角洲鸟类图鉴', author: '保护区管理局', year: '2020', description: '收录保护区376种鸟类的精美图片与详细介绍' },
    { title: '黄河三角洲湿地生态系统研究', author: '中科院地理所', year: '2021', description: '系统阐述黄河三角洲湿地生态系统的结构、功能与保护' },
    { title: '黄河三角洲国家级自然保护区科学考察报告', author: '综合考察队', year: '2019', description: '全面总结保护区自然资源与生态状况的科学考察成果' },
    { title: '湿地生态监测技术与方法', author: '科研团队', year: '2022', description: '介绍湿地生态监测的技术方法与实践经验' },
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
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-cyan-900/60"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}></div>
            </div>
            <ParticleBackground />
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-xl shadow-purple-500/20">
                    <img
                      src={withBase('/images/黄河三角洲湿地.png')}
                      alt="科研成果"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-xl">🏆</span>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                    <Badge variant="purple">科研合作</Badge>
                    <Badge variant="gold">国家级课题</Badge>
                    <Badge variant="cyan">学术产出</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    科研成果：数据驱动的知识产出
                  </h1>
                  <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
                    基于丰富的数据资源，保护区与中科院、北京师范大学、复旦大学等30余家机构合作，取得了大量科研成果，为湿地保护与生态研究提供有力支撑。
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
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'platform' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">科研平台与合作机构</h2>
                  <p className="text-gray-400 text-sm">11家生态监测、科研与教学基地</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  保护区建有 <span className="text-purple-400 font-semibold">11家</span> 生态监测、科研与教学基地，
                  其中包括 <span className="text-cyan-400 font-semibold">"国家生态质量综合监测站——山东黄河三角洲站（湿地）"</span>，
                  为开展长期定位监测和科学研究提供了坚实的平台支撑。
                </p>
                <div className="relative">
                  <DataFlowAnimation />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>🤝</span>
                主要合作机构
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {partners.map((partner, index) => (
                  <PartnerCard
                    key={index}
                    name={partner.name}
                    type={partner.type}
                    description={partner.description}
                    highlight={partner.highlight}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>🔬</span>
                科研与监测基地
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {researchBases.map((base, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        base.type === '国家级' ? 'bg-yellow-600/30' : 'bg-white/10'
                      } group-hover:scale-110 transition-transform`}>
                        <span className="text-lg">{base.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{base.name}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                          base.type === '国家级' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-blue-600/20 text-blue-400'
                        }`}>
                          {base.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'projects' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">重大课题研究</h2>
                  <p className="text-gray-400 text-sm">近五年联合攻关30余项国家级课题</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  近五年来，保护区联合多家科研机构攻关 <span className="text-cyan-400 font-semibold">30余项</span> 国家级课题，
                  包括 <span className="text-blue-400 font-semibold">"基于'3S'的黄河三角洲湿地变化与生态调度关系研究"</span>、
                  <span className="text-purple-400 font-semibold">"北斗星动能"科技示范工程</span> 等重大项目。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: '30+', label: '国家级课题', icon: '🏆' },
                    { value: '5年', label: '攻关周期', icon: '📅' },
                    { value: '30+', label: '合作机构', icon: '🤝' },
                    { value: '100+', label: '研究人员', icon: '👥' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                      <span className="text-3xl block mb-2">{stat.icon}</span>
                      <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                <span>⭐</span>
                重点课题列表
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    type={project.type}
                    year={project.year}
                    description={project.description}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📊</span>
                  课题类型分布
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: '国家级课题', value: 22, max: 30, color: '#f59e0b', percentage: '73%' },
                    { label: '省部级课题', value: 8, max: 30, color: '#3b82f6', percentage: '27%' },
                    { label: '横向合作项目', value: 5, max: 30, color: '#8b5cf6', percentage: '17%' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}项 ({item.percentage})</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
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
            </AnimatedSection>
          </>
        )}

        {activeTab === 'publications' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-cyan-600/30 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">学术产出</h2>
                  <p className="text-gray-400 text-sm">论文100余篇、专利13项、专著多部</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  保护区科研团队已发表学术论文 <span className="text-green-400 font-semibold">100余篇</span>，
                  斩获 <span className="text-yellow-400 font-semibold">13项</span> 国家发明专利，
                  编制出版 <span className="text-purple-400 font-semibold">《鸟类图鉴》</span> 等系列专著，
                  形成了丰硕的学术成果。
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {publications.map((pub, index) => (
                  <PublicationCard
                    key={index}
                    type={pub.type}
                    title={pub.title}
                    count={pub.count}
                    icon={pub.icon}
                    color={pub.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                <span>📚</span>
                系列专著
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="glass-card p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <span className="text-5xl">📖</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{book.title}</h4>
                    <div className="text-gray-400 text-sm mb-1">作者：{book.author}</div>
                    <div className="text-gray-500 text-xs mb-3">出版年份：{book.year}</div>
                    <p className="text-gray-500 text-xs line-clamp-2">{book.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>🏆</span>
                  专利与奖励
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: '一种湿地生态修复方法', type: '发明专利', year: '2022' },
                    { name: '鸟类智能识别系统', type: '发明专利', year: '2021' },
                    { name: '遥感影像分类方法', type: '发明专利', year: '2023' },
                    { name: '湿地水文监测装置', type: '实用新型', year: '2022' },
                    { name: '生态监测数据处理系统', type: '发明专利', year: '2021' },
                    { name: '黄河三角洲湿地保护技术', type: '发明专利', year: '2023' },
                  ].map((patent, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                        <span>🔑</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{patent.name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400">{patent.type}</span>
                          <span>{patent.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'topics' && (
          <>
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">研究主题</h2>
                  <p className="text-gray-400 text-sm">涵盖生态环境评估、湿地植物分类、物种保护等多个方向</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  保护区的科研工作涵盖 <span className="text-blue-400 font-semibold">生态环境质量评估</span>、
                  <span className="text-green-400 font-semibold">湿地植物群落分类</span>、
                  <span className="text-cyan-400 font-semibold">关键物种保护</span>、
                  <span className="text-purple-400 font-semibold">水文生态模拟</span> 等多个研究方向，
                  形成了多学科交叉的研究体系。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['生态环境评估', '湿地植物分类', '物种保护', '水文模拟', '土地利用变化', '气候变化影响', 'AI监测技术', '生态修复'].map((topic, index) => (
                    <span key={index} className="px-4 py-2 rounded-full bg-white/5 text-gray-300 text-sm border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {researchTopics.map((topic, index) => (
                  <ResearchTopicCard
                    key={index}
                    icon={topic.icon}
                    title={topic.title}
                    description={topic.description}
                    stats={topic.stats}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📊</span>
                  研究主题分布
                </h3>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {[
                      { label: '生态评估', value: 25, x: 80, y: 100, color: '#3b82f6' },
                      { label: '植物研究', value: 20, x: 160, y: 60, color: '#22c55e' },
                      { label: '物种保护', value: 25, x: 240, y: 60, color: '#06b6d4' },
                      { label: '水文模拟', value: 15, x: 320, y: 100, color: '#8b5cf6' },
                      { label: '遥感应用', value: 15, x: 200, y: 140, color: '#f59e0b' },
                    ].map((item, index) => (
                      <g key={index}>
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r={item.value}
                          fill={item.color + '30'}
                          stroke={item.color}
                          strokeWidth="2"
                          className="transition-all duration-500 hover:opacity-80"
                        />
                        <text
                          x={item.x}
                          y={item.y - item.value - 10}
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="12"
                        >
                          {item.label}
                        </text>
                        <text
                          x={item.x}
                          y={item.y + 5}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {item.value}%
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  未来研究方向
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: '🌍', title: '全球变化响应', desc: '研究全球气候变化对湿地生态系统的长期影响' },
                    { icon: '🤖', title: '智能监测升级', desc: '深化AI技术在生态监测中的应用' },
                    { icon: '🔄', title: '生态系统恢复', desc: '研发退化湿地生态系统恢复技术' },
                    { icon: '📊', title: '大数据分析', desc: '构建生态大数据分析与决策支持系统' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <span className="text-3xl block mb-3">{item.icon}</span>
                      <div className="text-white font-medium mb-1">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
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
              注：科研成果持续更新中，以上数据为最新统计值。保护区将继续深化科研合作，提升生态保护的科学支撑能力。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default ResearchResults;