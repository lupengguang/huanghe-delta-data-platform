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

function StatCard({ label, value, description }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-6 text-center transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-xl shadow-blue-500/20' : ''
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        <div className="relative z-10">
          <div className="text-sm text-gray-400 mb-2">{label}</div>
          <div className="text-3xl font-bold text-blue-400 mb-1">{value}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full glass-card rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600/20">
            {data.headers.map((header, index) => (
              <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-blue-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="border-t border-white/5 hover:bg-white/5 transition-colors duration-300"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-5 transition-all duration-500 ${
        isHovered ? 'translate-y-[-8px]' : ''
      }`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 ${
          isHovered ? 'bg-blue-600 shadow-lg shadow-blue-500/50' : 'bg-white/10'
        }`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-blue-600/30 text-blue-300 border border-blue-500/30',
    gold: 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30',
    green: 'bg-green-600/30 text-green-300 border border-green-500/30',
    purple: 'bg-purple-600/30 text-purple-300 border border-purple-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function ProtectedArea() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: '基本概况' },
    { id: 'ecosystem', label: '生态系统' },
    { id: 'biodiversity', label: '生物多样性' },
    { id: 'protection', label: '保护修复' },
    { id: 'honors', label: '地位荣誉' },
  ];

  const biodiversityData = {
    headers: ['类别', '数据', '备注'],
    rows: [
      ['野生动物总数', '1635种', ''],
      ['鸟类', '376种', '从建区时的187种增加而来'],
      ['国家一级保护鸟类', '26种', '如丹顶鹤、东方白鹳、黑鹳、金雕等'],
      ['国家二级保护鸟类', '66种', '如灰鹤、大天鹅、鸳鸯等'],
      ['植物', '685种', '代表植物有芦苇、野大豆（国家二级保护）、盐地碱蓬、柽柳等'],
      ['鱼类', '197种', ''],
      ['哺乳动物', '26种', ''],
    ],
  };

  const protectionFeatures = [
    { icon: '🌿', title: '治理外来入侵物种', description: '针对互花米草，采用"刈割+围淹+翻耕"等方式，已治理13.1万亩，有效遏制其蔓延。' },
    { icon: '🌱', title: '修复原生植被', description: '修复盐地碱蓬5.2万亩，为珍稀鸟类提供了重要栖息地。' },
    { icon: '💧', title: '实施生态补水', description: '自2003年起，利用黄河调水调沙进行生态补水，并建成了科学的补水体系。' },
    { icon: '🏠', title: '加强栖息地管理', description: '为东方白鹳、黑嘴鸥等鸟类打造繁殖岛、人工招引巢；胜利油田退出核心区和缓冲区。' },
    { icon: '📡', title: '建立监测体系', description: '建设了黄河口国家公园物联网监测系统，布设了91处气象、水质和土壤环境监测站。' },
  ];

  const honors = [
    { title: '国际重要湿地', description: '2013年被列入《国际重要湿地名录》', variant: 'purple' },
    { title: '世界自然遗产', description: '2024年，作为"中国黄（渤）海候鸟栖息地（第二期）"的重要组成部分，被列入《世界遗产名录》', variant: 'gold' },
    { title: '国家地质公园', description: '国家级地质公园称号', variant: 'green' },
    { title: '国家5A级旅游景区', description: '国家级5A级旅游景区', variant: 'gold' },
    { title: '国家生态文明教育基地', description: '国家级生态文明教育基地', variant: 'green' },
    { title: '中国东方白鹳之乡', description: '被授予"中国东方白鹳之乡"称号', variant: 'blue' },
    { title: '中国黑嘴鸥之乡', description: '被授予"中国黑嘴鸥之乡"称号', variant: 'blue' },
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-blue-900/50"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}></div>
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/20">
                    <img
                      src={withBase('/images/黄河三角洲土地利用数据.png')}
                      alt="黄河三角洲自然保护区"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <Badge variant="gold" className="mb-4">国家级自然保护区</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    山东黄河三角洲国家级自然保护区
                  </h1>
                  <p className="text-gray-300 max-w-2xl leading-relaxed">
                    中国暖温带保存最完整、最广阔、最年轻的湿地生态系统，是以保护黄河口新生湿地生态系统和珍稀濒危鸟类为主体的湿地类型自然保护区。
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
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
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
                <span className="text-3xl">🌍</span>
                基本概况与地理位置
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="总面积" value="15.3万公顷" description="约1530平方公里" />
                <StatCard label="建立时间" value="1992年10月" description="国务院批准建立" />
                <StatCard label="南部区域" value="10.45万公顷" description="现行黄河入海口" />
                <StatCard label="北部区域" value="4.85万公顷" description="1976年故道入海口" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">📍 地理坐标</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">纬度范围</span>
                    <span className="text-white font-mono">北纬 37°35′ - 38°12′</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">经度范围</span>
                    <span className="text-white font-mono">东经 118°33′ - 119°20′</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-400">地理位置</span>
                    <span className="text-white">山东省东营市东北部</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">📋 功能分区</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">核心区</span>
                    <span className="text-red-400 font-mono">59,419 公顷</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">缓冲区</span>
                    <span className="text-yellow-400 font-mono">11,233 公顷</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-400">实验区</span>
                    <span className="text-green-400 font-mono">82,348 公顷</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'ecosystem' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🌿</span>
                生态系统与湿地类型
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  黄河三角洲属于退海之地，土壤含盐量高、淡水资源匮乏，生态环境十分脆弱。同时，黄河每年携带大量泥沙在此淤积，造就了世界土地面积增长最快的自然保护区之一。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: '近海与海岸湿地', description: '如浅海水域、淤泥质海滩', icon: '🌊' },
                    { title: '河流湿地', description: '如永久性河流', icon: '🏞️' },
                    { title: '沼泽湿地', description: '如潮间盐水沼泽、草本沼泽', icon: '🪴' },
                    { title: '人工湿地', description: '如库塘、水产养殖场', icon: '🏭' },
                  ].map((wetland, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      <span className="text-2xl">{wetland.icon}</span>
                      <div>
                        <h4 className="text-white font-medium mb-1">{wetland.title}</h4>
                        <p className="text-gray-400 text-sm">{wetland.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲植被类型数据.png')}
                  alt="黄河三角洲湿地"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">湿地生态系统全景</h3>
                    <p className="text-gray-300 text-sm">世界上土地面积增长最快的自然保护区之一</p>
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
                生物多样性宝库
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  保护区是东北亚内陆和环西太平洋鸟类迁徙重要的"中转站"、越冬栖息地和繁殖地，被誉为 <span className="text-blue-400 font-semibold">"鸟类的国际机场"</span>。
                </p>
                <DataTable data={biodiversityData} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🐦', value: '376种', label: '鸟类物种', color: 'text-blue-400' },
                  { icon: '🌸', value: '685种', label: '植物物种', color: 'text-green-400' },
                  { icon: '🐟', value: '197种', label: '鱼类物种', color: 'text-cyan-400' },
                  { icon: '🦌', value: '26种', label: '哺乳动物', color: 'text-purple-400' },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="glass-card p-5 text-center hover:scale-105 transition-transform duration-300"
                  >
                    <span className="text-4xl block mb-2">{stat.icon}</span>
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲NDVI.png')}
                  alt="鸟类栖息地"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">鸟类的国际机场</h3>
                    <p className="text-gray-300 text-sm">每年迁徙越冬数量达数百万只，有38种水鸟的种群数量达到全球总量的1%</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'protection' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                保护管理与生态修复
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {protectionFeatures.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 生态修复数据统计</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '治理互花米草', value: '13.1万亩', icon: '🔨' },
                    { label: '修复盐地碱蓬', value: '5.2万亩', icon: '🌱' },
                    { label: '生态补水总量', value: '8.6亿立方米', icon: '💧' },
                    { label: '监测站点', value: '91处', icon: '📡' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                      <span className="text-2xl block mb-2">{stat.icon}</span>
                      <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'honors' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                地位与荣誉
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {honors.map((honor, index) => (
                  <div
                    key={index}
                    className="glass-card p-5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{honor.title}</h4>
                      <Badge variant={honor.variant}>荣誉称号</Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{honor.description}</p>
                    <div className="mt-3 flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>了解更多</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">💡 科研与生态旅游</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">🔬 科研价值</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      作为中国暖温带最完整的湿地生态系统，是研究河口湿地生态、生物多样性、全球气候变化等领域的天然实验室。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">🏖️ 生态旅游</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      保护区因其"奇、特、旷、野、新"的美学特征，被评为中国"最美的六大湿地"之一。最佳游览时间为4月至11月。
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲土壤保持.png')}
                  alt="生态旅游"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">中国最美的六大湿地之一</h3>
                    <p className="text-gray-300 text-sm">最佳游览时间：4月至11月</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={500} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：不同资料来源的统计时间与口径略有差异，以上数据综合自多个权威信源。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default ProtectedArea;