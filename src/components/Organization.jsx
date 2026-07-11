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

function OrgCard({ icon, title, subtitle, description, color = 'blue' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-500/30 hover:shadow-blue-500/20',
    green: 'from-green-600/20 to-green-800/20 border-green-500/30 hover:shadow-green-500/20',
    purple: 'from-purple-600/20 to-purple-800/20 border-purple-500/30 hover:shadow-purple-500/20',
    orange: 'from-orange-600/20 to-orange-800/20 border-orange-500/30 hover:shadow-orange-500/20',
    cyan: 'from-cyan-600/20 to-cyan-800/20 border-cyan-500/30 hover:shadow-cyan-500/20',
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
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${
          isHovered ? 'from-blue-600 to-purple-600' : 'from-white/10 to-white/5'
        } transition-all duration-500`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        {subtitle && <div className="text-sm text-blue-400 mb-3">{subtitle}</div>}
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function DataTable({ data, highlightColumn }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full glass-card rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600/30 to-purple-600/30">
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
                <td key={cellIndex} className={`px-4 py-3 text-sm ${
                  highlightColumn === cellIndex ? 'text-blue-400 font-medium' : 'text-gray-300'
                }`}>
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

function LeadershipCard({ name, position, avatar }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card p-5 text-center transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-xl shadow-blue-500/20' : ''
      }`}>
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-blue-500/50">
          <div className="w-full h-full bg-gradient-to-br from-blue-600/50 to-purple-600/50 flex items-center justify-center">
            <span className="text-3xl">{avatar}</span>
          </div>
        </div>
        <h4 className="text-lg font-semibold text-white mb-1">{name}</h4>
        <p className="text-blue-400 text-sm">{position}</p>
      </div>
    </div>
  );
}

function TreeNode({ label, children, level = 0, isOpen = true }) {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const hasChildren = children && children.length > 0;

  return (
    <div className="relative">
      <div 
        className={`flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-colors ${
          isExpanded ? 'bg-blue-600/20 text-blue-300' : 'hover:bg-white/5 text-gray-300'
        }`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
        {!hasChildren && <div className="w-5"></div>}
        <div style={{ paddingLeft: `${level * 16}px` }}>
          <span className="font-medium">{label}</span>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l border-white/10 pl-4 mt-1">
          {children.map((child, index) => (
            <TreeNode key={index} {...child} level={level + 1} />
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
    orange: 'bg-orange-600/30 text-orange-300 border border-orange-500/30',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function Organization() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('structure');
  
  const tabs = [
    { id: 'structure', label: '管理架构' },
    { id: 'departments', label: '内设机构' },
    { id: 'leadership', label: '领导班子' },
    { id: 'network', label: '协作网络' },
  ];

  const departmentsData = {
    headers: ['序号', '机构名称', '备注'],
    rows: [
      ['1', '党政办公室（组织人事科）', '负责机关日常协调、文电、会务、党建、人事、机构编制等工作。'],
      ['2', '机关党委', '负责机关及所属单位的党群工作。'],
      ['3', '财政局', '负责编制财政预决算、资金管理、财务监督及国有资产管理等工作。'],
      ['4', '资源管理科', '负责自然资源的保护和培育、生态环境综合治理、病虫害防治等。'],
      ['5', '法制与安全管理科', '负责安全法制、安全生产、森林防火及平安建设等工作。'],
      ['6', '旅游管理科（规划建设科）', '负责生态旅游的规划、管理，以及旅游基础设施的建设与维护。'],
      ['7', '科研中心', '负责制定科研计划、组织实施科研课题、开展科学实验与合作等。'],
      ['8', '生态旅游中心', '可能具体负责生态旅游区的运营、游客服务及市场推广等工作。'],
      ['9', '生态监测中心', '负责对保护区的气象、水文、土壤、生物多样性等进行全域动态监测。'],
    ],
  };

  const leadershipTeam = [
    { name: '陈云龙', position: '管理委员会主任', avatar: '👨‍💼' },
    { name: '邵红双', position: '中共山东黄河三角洲国家级自然保护区委员会书记', avatar: '👨‍💼' },
    { name: '刘静', position: '副主任', avatar: '👩‍💼' },
    { name: '胡金岩', position: '副主任', avatar: '👨‍💼' },
  ];

  const orgTree = {
    label: '山东黄河三角洲国家级自然保护区管理委员会',
    children: [
      {
        label: '内设职能机构（9个）',
        children: [
          { label: '党政办公室（组织人事科）' },
          { label: '机关党委' },
          { label: '财政局' },
          { label: '资源管理科' },
          { label: '法制与安全管理科' },
          { label: '旅游管理科（规划建设科）' },
          { label: '科研中心' },
          { label: '生态旅游中心' },
          { label: '生态监测中心' },
        ],
      },
      {
        label: '下属单位',
        children: [
          { label: '综合执法支队' },
          { label: '科研中心（挂宣传教育中心牌子）' },
        ],
      },
      {
        label: '基层管理站',
        children: [
          { 
            label: '一千二管理站',
            children: [
              { label: '办公室' },
              { label: '应急办公室' },
              { label: '财务办公室' },
              { label: '资源管护科' },
              { label: '巡护监测科' },
            ],
          },
        ],
      },
    ],
  };

  const collaborationNetwork = [
    { icon: '🏛️', title: '市级协调委员会', description: '由东营市常务副市长担任主任，成员包括各相关部门领导，是高层次的议事协调机构。', color: 'purple' },
    { icon: '🔬', title: '中国科学院', description: '与中国科学院等30余家国家级科研机构合作，开展湿地生态系统研究。', color: 'blue' },
    { icon: '📊', title: '野外监测平台', description: '成立了黄河口湿地野外科学观测研究站等11家野外监测和科研教学平台。', color: 'green' },
    { icon: '🌍', title: '国际合作', description: '作为国际重要湿地和世界自然遗产，与国际组织开展交流合作。', color: 'orange' },
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-cyan-900/50"></div>
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
                      src={withBase('/images/黄河三角洲行政区划边界.png')}
                      alt="黄河三角洲管理机构"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <Badge variant="gold" className="mb-4">组织机构</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    山东黄河三角洲国家级自然保护区
                  </h1>
                  <p className="text-gray-300 max-w-2xl leading-relaxed">
                    以管理委员会为核心，下设多个职能科室、执法与科研单位及基层管理站的三级管理体系，构建了内外协同的管理与科研网络。
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

        {activeTab === 'structure' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🏛️</span>
                核心管理机构：管理委员会
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <OrgCard
                  icon="🏢"
                  title="机构性质"
                  subtitle="东营市政府派出机构"
                  description="行政级别为处级，是保护区的主管机构，统一管理自然保护区与生态旅游区。"
                  color="blue"
                />
                <OrgCard
                  icon="📋"
                  title="主要职能"
                  subtitle="统筹管理与保护"
                  description="贯彻执行相关法律法规、编制并实施发展规划、组织科研与科普教育、管理生态旅游、负责安全生产监督及行使部分行政处罚权等。"
                  color="green"
                />
                <OrgCard
                  icon="🔄"
                  title="机构演变"
                  subtitle="管理局 → 管理委员会"
                  description="早期为管理局时期，曾设有社会事务局、规划建设局等10个部门。现调整为管理委员会架构，内设9个职能机构。"
                  color="purple"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6 mb-8">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>📊</span>
                  组织架构图
                </h3>
                <div className="border-l-2 border-blue-500/30 pl-6">
                  <TreeNode {...orgTree} />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '9', label: '内设职能机构', icon: '🏢' },
                  { value: '2', label: '下属单位', icon: '📦' },
                  { value: '30+', label: '科研合作机构', icon: '🔬' },
                  { value: '11', label: '野外监测平台', icon: '📡' },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="glass-card p-5 text-center hover:scale-105 transition-transform duration-300 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center mb-3 group-hover:from-blue-600/50 group-hover:to-purple-600/50 transition-all">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'departments' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🗂️</span>
                内设机构（9个职能机构）
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="glass-card p-6 mb-8">
                <p className="text-gray-400 text-sm mb-6">
                  以下表格基于当前"管理委员会"的架构整理。请注意，由于机构改革，不同时期的内设机构名称和数量有所不同。
                </p>
                <DataTable data={departmentsData} highlightColumn={1} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: '✍️', title: '党政办公室', description: '负责机关日常协调、文电、会务、党建、人事、机构编制等工作。', color: 'blue' },
                  { icon: '💰', title: '财政局', description: '负责编制财政预决算、资金管理、财务监督及国有资产管理等工作。', color: 'green' },
                  { icon: '🌿', title: '资源管理科', description: '负责自然资源的保护和培育、生态环境综合治理、病虫害防治等。', color: 'cyan' },
                  { icon: '🛡️', title: '法制与安全管理科', description: '负责安全法制、安全生产、森林防火及平安建设等工作。', color: 'orange' },
                  { icon: '🏖️', title: '旅游管理科', description: '负责生态旅游的规划、管理，以及旅游基础设施的建设与维护。', color: 'purple' },
                  { icon: '🔬', title: '科研中心', description: '负责制定科研计划、组织实施科研课题、开展科学实验与合作等。', color: 'blue' },
                ].map((dept, index) => (
                  <OrgCard
                    key={index}
                    icon={dept.icon}
                    title={dept.title}
                    description={dept.description}
                    color={dept.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <span>👥</span>
                  下属单位与基层管理站
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-3">下属单位</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        综合执法支队
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        科研中心（挂宣传教育中心牌子）
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-3">基层管理站</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        一千二管理站（内设9个部门）
                      </li>
                      <li className="text-gray-400 text-sm mt-2">
                        负责具体的资源管护和巡护监测工作
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'leadership' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">👤</span>
                主要领导班子
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {leadershipTeam.map((leader, index) => (
                  <LeadershipCard
                    key={index}
                    name={leader.name}
                    position={leader.position}
                    avatar={leader.avatar}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>🤝</span>
                  协调机制：管理委员会
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-medium mb-3">协调委员会职责</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      为协调处理保护和管理中的重大问题，东营市成立了自然保护区管理委员会，这是一个高层次的议事协调机构。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">组成人员</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-300">
                        <Badge variant="gold">主任</Badge>
                        <span>东营市常务副市长</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Badge variant="blue">成员</Badge>
                        <span>各相关部门领导</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {activeTab === 'network' && (
          <>
            <AnimatedSection delay={100}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🔬</span>
                科研合作平台
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {collaborationNetwork.map((item, index) => (
                  <OrgCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <span>💎</span>
                  总结
                </h3>
                <div className="p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                  <p className="text-gray-300 leading-relaxed">
                    黄河三角洲保护区的组织结构已形成一个以 <span className="text-blue-400 font-semibold">管理委员会</span> 为核心，下设 
                    <span className="text-green-400 font-semibold">多个职能科室</span>、
                    <span className="text-purple-400 font-semibold">执法与科研单位</span> 及 
                    <span className="text-cyan-400 font-semibold">基层管理站</span> 的三级管理体系。
                    同时，通过 <span className="text-yellow-400 font-semibold">市级协调委员会</span> 和广泛的 
                    <span className="text-orange-400 font-semibold">科研合作平台</span>，构建了内外协同的管理与科研网络。
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="mt-8">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={withBase('/images/黄河三角洲生态监测中心.png')}
                  alt="科研合作"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">黄河口湿地野外科学观测研究站</h3>
                    <p className="text-gray-300 text-sm">与中国科学院等30余家国家级科研机构合作，开展湿地生态系统研究</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection delay={500} className="mt-12">
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 text-sm">
              注：由于机构改革，不同时期的内设机构名称和数量有所不同。以上信息基于当前公开资料整理。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default Organization;