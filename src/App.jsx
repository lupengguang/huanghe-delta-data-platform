import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';
import HeroSection from './components/HeroSection';
import DataOverview from './components/DataOverview';
import MonitoringIndicators from './components/MonitoringIndicators';
import Biodiversity from './components/Biodiversity';
import WetlandProtection from './components/WetlandProtection';
import NationalPark from './components/NationalPark';
import ResearchAndNews from './components/ResearchAndNews';
import ImageCarousel from './components/ImageCarousel';
import NotificationList from './components/NotificationList';
import ProtectedArea from './components/ProtectedArea';
import Organization from './components/Organization';
import MonitoringData from './components/MonitoringData';
import RemoteSensing from './components/RemoteSensing';
import ResearchResults from './components/ResearchResults';
import NationalParkDetail from './components/NationalParkDetail';
import WetlandRestoration from './components/WetlandRestoration';
import EcoEnvironmentMonitoring from './components/EcoEnvironmentMonitoring';
import KenliDistrict from './components/KenliDistrict';
import AdminDashboard from './components/AdminDashboard';
import ProjectProgressList from './components/ProjectProgressList';
import ResearchResultList from './components/ResearchResultList';
import { mockWechatArticles, mockProjects, mockLiteratures, mockCatalogTree, getCatalogContent } from './data/mockData';

function Home() {
  return (
    <>
      <HeroSection />
      <DataOverview />
      <MonitoringIndicators />
      <ResearchAndNews />
      <Biodiversity />
      <WetlandProtection />
      <NationalPark />
    </>
  );
}

function OtherResults() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">其他成果</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">GPS定位拍照APP</h2>
            <p className="text-gray-400 mb-4">
              GPS定位拍照APP是为了便利工作人员在野外进行定位和获取数据而特别设计的APP，具备智能手机定位、野外拍照记录、GPS坐标获取及处理、数据管理等功能，是一款非常实用的野外工作助手。
            </p>
            <div className="flex justify-center">
              <Link to="/other-results/gps-app" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                查看详情
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">关于我们</h2>
            <p className="text-gray-400 mb-4">
              了解平台的发展历程、团队成员、研究方向以及联系方式等信息。
            </p>
            <div className="flex justify-center">
              <Link to="/other-results/about" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                查看详情
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">公众号</h2>
            <p className="text-gray-400 mb-4">
              关注我们的官方微信公众号，获取最新的平台动态、研究成果、数据资源以及技术分享等内容。
            </p>
            <div className="flex justify-center">
              <Link to="/other-results/wechat" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                查看详情
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">项目成果</h2>
            <p className="text-gray-400 mb-4">
              展示平台团队承担的各类科研项目及其取得的成果，包括国家级、省部级项目等。
            </p>
            <div className="flex justify-center">
              <Link to="/other-results/projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                查看详情
              </Link>
            </div>
          </div>
          
          <div className="glass-card p-6 card-hover">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">相关文献</h2>
            <p className="text-gray-400 mb-4">
              汇集与黄河三角洲资源环境科学研究相关的学术论文、专著、报告等文献资料，方便用户查阅和引用。
            </p>
            <div className="flex justify-center">
              <Link to="/other-results/literature" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                查看详情
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function WechatArticleDetail() {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');
  const wechatType = params.get('type') || 'official';
  
  const articles = mockWechatArticles[wechatType] || [];
  const article = articles.find(a => a.id === parseInt(articleId)) || null;
  
  const handleBack = () => {
    window.location.href = '/other-results/wechat';
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 glass-card hover:bg-white/20 transition-all flex items-center gap-2 text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回列表
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-8">公众号文章详情</h1>
        
        <div className="glass-card p-8">
          {article ? (
            <div>
              {article.image_url && (
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full max-h-80 object-contain bg-slate-900/50 rounded-lg mb-6"
                />
              )}
              <h2 className="text-2xl font-bold text-white mb-4">{article.title}</h2>
              {article.summary && (
                <p className="text-gray-400 text-lg mb-6 italic">{article.summary}</p>
              )}
              {article.content && (
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}
              <div className="mt-8 text-gray-500 text-sm">
                <p>发布时间：{article.create_time}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>文章不存在</p>
            </div>
          )}
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function Wechat() {
  const [activeTab, setActiveTab] = React.useState('official');
  
  const articles = activeTab !== 'home' 
    ? mockWechatArticles[activeTab === 'official' ? 'official' : 'carbon'] || []
    : [];
  
  const handleGoBack = () => {
    window.history.back();
  };
  
  const handleArticleClick = (article) => {
    const wechatType = activeTab === 'official' ? 'official' : 'carbon';
    window.location.href = `/other-results/wechat/detail?id=${article.id}&type=${wechatType}`;
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">公众号</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-3">
            <button
              onClick={() => setActiveTab('official')}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'official'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              官方公众号
            </button>
            <button
              onClick={handleGoBack}
              className="w-full px-6 py-3 rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700"
            >
              返回上一级
            </button>
            <button
              onClick={() => setActiveTab('carbon')}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'carbon'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              碳基智能公众号
            </button>
          </div>
          
          <div className="lg:w-3/4 glass-card p-8 min-h-[400px]">
            {activeTab === 'home' ? (
              <div className="text-center text-gray-400">
                <p>点击"官方公众号"或"碳基智能公众号"查看相关内容</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-gray-400">
                <p>暂无文章内容</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    className="border border-white/10 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-blue-400/50"
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.image_url && (
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-full h-40 object-contain bg-slate-900/50 rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-medium text-white mb-2">{article.title}</h3>
                    {article.summary && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.summary}</p>
                    )}
                    <span className="text-blue-400 text-sm flex items-center gap-1">
                      查看详情
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projects = mockProjects;

  const getProjectTypeLabel = (type) => {
    const typeMap = {
      'national': '国家级项目',
      'provincial': '省部级项目',
      'horizontal': '横向合作项目'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">项目成果</h1>
        
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-6">科研项目列表</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>暂无项目成果</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="border border-white/10 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-medium text-white mb-2">
                    {getProjectTypeLabel(project.project_type)}：{project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {project.project_code && `项目编号：${project.project_code} | `}
                    {project.funding && `资助金额：${project.funding} | `}
                    {project.start_date && `起止时间：${project.start_date}`}
                    {project.end_date && ` - ${project.end_date}`}
                  </p>
                  {project.summary && (
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{project.summary}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function Literature() {
  const literatures = mockLiteratures;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">相关文献</h1>
        
        <div className="glass-card p-8">
          {literatures.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>暂无文献</p>
            </div>
          ) : (
            <div className="space-y-4">
              {literatures.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-white/10 rounded-lg p-4 hover:shadow-md transition-all bg-white/5"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  {item.journal && <p className="text-gray-400 text-sm">期刊: {item.journal}</p>}
                  {item.volume && <p className="text-gray-400 text-sm">卷期: {item.volume}</p>}
                  {item.doi && <p className="text-gray-400 text-sm">DOI: {item.doi}</p>}
                  {item.authors && <p className="text-gray-400 text-sm">作者: {item.authors}</p>}
                  {item.publish_time && <p className="text-gray-400 text-sm">发表时间: {item.publish_time}</p>}
                  {item.official_link && (
                    <p className="text-sm mt-1">
                      <span className="text-gray-400">官方链接:</span>
                      <a href={item.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-1 break-all">
                        {item.official_link}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function HelpCenter() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">帮助中心</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <div className="glass-card p-4">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">网站数据下载说明</h2>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-blue-600/20 text-blue-300 rounded-lg font-medium">
                  关于我们
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">关于网站数据下载：</h2>
              
              <ol className="list-decimal pl-5 space-y-3 text-gray-400 mb-6">
                <li>免费注册为本网站会员就可以下载数据，注册后每天可免费下载3条数据；</li>
                <li>VIP会员没有下载限制，可以下载网站上所有在线数据。不能下载的数据（没有下载链接）是收费的，需要单独联系客服获取。想加入VIP会员请联系客服办理。</li>
              </ol>
              
              <p className="text-gray-400 mb-4">
                本网站目前没有专门的运行经费，所以获取数据会收一定的费用，我们会不断完善和提高数据质量，尽量为大家提供更好的数据服务。
              </p>
              
              <p className="text-gray-400 mb-6">
                数据下载注意：网站不支持迅雷等工具下载，由于部分浏览器内置了加速工具，往往导致下载的数据压缩包只有几K，无法解压等问题，建议使用Google Chrome通过浏览器下载。如有问题请联系我们：
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <p className="text-gray-400 mb-2">单位：中国科学院地理科学与资源研究所</p>
                  <p className="text-gray-400 mb-2">地址：北京朝阳区安外大屯路甲11号</p>
                  <p className="text-gray-400 mb-2">联系人：</p>
                  <p className="text-gray-400 mb-2">数据需求请微信联系：</p>
                  <p className="text-gray-400 mb-2">电话：010-64889071</p>
                  <p className="text-gray-400 mb-2">Email: xuxl@lreis.ac.cn</p>
                  <p className="text-gray-400 mb-2">网站技术支持（不能注册、收不到验证码、数据不能下载、数据无法解压等）请联系：</p>
                  <p className="text-gray-400">QQ:660685985</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20for%20contact%2C%20black%20and%20white%20QR%20code&image_size=square" 
                    alt="联系二维码" 
                    className="w-48 h-48 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function DatabaseCatalog() {
  const catalogs = mockCatalogTree;
  const [selectedContent, setSelectedContent] = React.useState(null);
  const [expandedCatalogs, setExpandedCatalogs] = React.useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const targetCatalogName = searchParams.get('catalog');

  React.useEffect(() => {
    if (targetCatalogName && catalogs.length > 0) {
      for (const catalog of catalogs) {
        if (catalog.children) {
          for (const child of catalog.children) {
            if (child.name === targetCatalogName) {
              setExpandedCatalogs({ [catalog.id]: true });
              handleCatalogClick(child.id, child.name);
              return;
            }
          }
        }
      }
    }
  }, [targetCatalogName]);

  const handleCatalogClick = (catalogId, catalogName) => {
    navigate(`/database-catalog?catalog=${encodeURIComponent(catalogName)}`);
    const catalogData = getCatalogContent(catalogId);
    setSelectedContent({
      ...catalogData,
      catalogName: catalogName
    });
  };

  const toggleCatalog = (catalogId) => {
    setExpandedCatalogs(prev => ({
      ...prev,
      [catalogId]: !prev[catalogId]
    }));
  };

  const renderCatalog = (catalog) => {
    const isExpanded = expandedCatalogs[catalog.id] || false;
    
    return (
      <div key={catalog.id} className="mb-4">
        <div 
          className="flex justify-between items-center p-2 bg-blue-600/20 rounded font-medium text-blue-300 cursor-pointer"
          onClick={() => toggleCatalog(catalog.id)}
        >
          <span>{catalog.name}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded && catalog.children && catalog.children.length > 0 && (
          <div className="pl-4 mt-2 space-y-1">
            {catalog.children.map(child => (
              <div 
                key={child.id} 
                className="p-1 hover:bg-white/10 rounded cursor-pointer text-gray-300"
                onClick={() => handleCatalogClick(child.id, child.name)}
              >
                {child.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">黄河三角洲数据平台</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <span>再绘终端</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 glass-card p-4">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">数据库目录</h2>
            
            {catalogs.map(catalog => renderCatalog(catalog))}
          </div>
          
          <div className="lg:w-3/4">
            {selectedContent ? (
              <div className="glass-card p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">{selectedContent.catalogName}</h3>
                <div className="mb-4 p-3 bg-white/5 rounded">
                  {selectedContent.year && (
                    <div className="text-sm mb-1">
                      <span className="font-medium text-gray-300">数据年份：</span>
                      <span className="text-gray-400">{selectedContent.year}</span>
                    </div>
                  )}
                  {selectedContent.source && (
                    <div className="text-sm mb-1">
                      <span className="font-medium text-gray-300">数据来源：</span>
                      <span className="text-gray-400">{selectedContent.source}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-medium text-gray-300">时间序列：</span>
                    <span className="text-gray-400">{selectedContent.isTimeSeries ? '是' : '否'}</span>
                    <span className="text-gray-500 ml-2 text-xs">(时间序列数据是按时间顺序采集的连续数据，如气温变化、降水量等)</span>
                  </div>
                </div>
                <div className="prose max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
              </div>
            ) : (
              <div className="glass-card p-4 mb-6">
                <ImageCarousel />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="glass-card p-4">
                <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-blue-500/50 pb-2">通知新闻</h3>
                <NotificationList />
              </div>
              
              <div className="glass-card p-4">
                <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-blue-500/50 pb-2">项目进展</h3>
                <ProjectProgressList />
              </div>
            </div>
            
            <ResearchResultList />
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function GpsApp() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">GPS定位拍照APP</h1>
        
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">APP介绍</h2>
              <p className="text-gray-400 mb-4">
                野外调查工作是科学研究工作中非常重要的环节，GPS定位拍照APP是为了便利工作人员在野外进行定位和获取数据而特别设计的APP，具备智能手机定位、野外拍照记录、GPS坐标获取及处理、数据管理等功能，是一款非常实用的野外工作助手。此外，为了方便数据的入库管理，通过相应的开发系统能将数据转换为标准入库要求的方式提交。
              </p>
              <p className="text-gray-400 mb-4">
                GPS定位拍照APP主要包含四个功能模块，分别为地图定位模块、记录拍照模块、位置导航模块和用户管理模块。
              </p>
              
              <h3 className="text-lg font-semibold text-blue-400 mt-6 mb-3">1. 实地拍照模块</h3>
              <p className="text-gray-400 mb-4">
                进入APP后自动加载地图信息，定位你所在的位置和当前拍照角度，屏幕中有模拟的定位不准指示，可点击图1-4中标注为"对准"的按钮调整GPS的位置到地图上；图1-1中标注为"开始拍摄"的按钮点击以后可以进入拍照界面。在进入拍照界面以后，坐标将会生化显示在拍照界面，同时可以点击图1-4中标注为"创建新地点"按钮，搜索或自定义创建新的标记点，即为下方为上一个地点拍摄的两张标注好坐标的照片，经纬度自动读取初始传入（可修改），图1-4中标注的中心调整键可以控制地图的放大缩小。
              </p>
              
              <h3 className="text-lg font-semibold text-blue-400 mt-6 mb-3">2. 记录拍照模块</h3>
              <p className="text-gray-400 mb-4">
                记录拍照模块如图1-5所示，图1-5中标注为"对准"的按钮点击后会在黑底的方框中重新定位当前坐标，图1-5中标注为中心的调整键可以控制地图的放大缩小。
              </p>
              
              <h3 className="text-lg font-semibold text-blue-400 mt-6 mb-3">3. 位置导航模块</h3>
              <p className="text-gray-400 mb-4">
                位置导航模块如图1-6所示，图1-6中标注为"对准"的按钮点击后会在黑底的方框中重新定位当前坐标。
              </p>
              
              <h3 className="text-lg font-semibold text-blue-400 mt-6 mb-3">4. 用户管理模块</h3>
              <p className="text-gray-400 mb-4">
                用户可根据图1-7中的分为"管理员"、"用户"和"访客"三种不同的用户权限级别，具有不同的功能权限，图1-8中的分为"本地数据"和"数据管理"部分，图1-9中的分为"数据管理"部分。
              </p>
              
              <p className="text-gray-400 mt-6">
                该APP目前在Android平台运行，支持Android 4.0及以上版本。
              </p>
            </div>
            
            <div className="md:w-1/3 space-y-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=GPS%20app%20interface%2C%20map%20location%2C%20mobile%20app%20design&image_size=square" 
                  alt="APP界面" 
                  className="w-full h-auto rounded mb-2"
                />
                <p className="text-sm text-gray-400">APP主界面</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=GPS%20app%20camera%20interface%2C%20taking%20photo%2C%20mobile%20app%20design&image_size=square" 
                  alt="拍照界面" 
                  className="w-full h-auto rounded mb-2"
                />
                <p className="text-sm text-gray-400">拍照界面</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20for%20app%20download%2C%20black%20and%20white%20QR%20code&image_size=square" 
                  alt="下载二维码" 
                  className="w-full h-auto rounded mb-2"
                />
                <p className="text-sm text-gray-400">下载APP二维码</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  const [activeTab, setActiveTab] = React.useState('download');

  const renderContent = () => {
    switch (activeTab) {
      case 'download':
        return (
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">网站数据下载说明</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-white mb-2">关于网站数据下载：</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-400">
                <li>免费注册为本站会员就可以下载数据，注册后每天可免费下载3条数据；</li>
                <li>VIP会员没有下载限制，可以下载网站上所有在线数据。不能下载的数据（没有下载链接）是收费的，需要单独联系客服获取。想加入VIP会员请联系客服办理。</li>
              </ol>
            </div>
            
            <p className="text-gray-400 mb-6">
              本网站目前没有专门的运行经费，所以获取数据会收一定的费用，我们会不断完善和提高数据质量，尽量为大家提供更好的数据服务。
            </p>
            
            <p className="text-gray-400 mb-6">
              数据下载注意：网站不支持迅雷等工具下载，由于部分浏览器内置了加速工具，往往导致下载的数据压缩包只有几K，无法解压等问题，建议使用Google Chrome通过浏览器下载。如有问题请联系我们：
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-white mb-2">联系方式：</h3>
                <p className="text-gray-400 mb-1">单位：中国科学院地理科学与资源研究所</p>
                <p className="text-gray-400 mb-1">地址：北京朝阳区安外大屯路甲11号</p>
                <p className="text-gray-400 mb-1">联系人：</p>
                <p className="text-gray-400 mb-1">数据需求请微信联系：</p>
                <p className="text-gray-400 mb-1">电话：010-64889071</p>
                <p className="text-gray-400 mb-1">Email: xuxl@lreis.ac.cn</p>
                <p className="text-gray-400">网站技术支持（不能注册、收不到验证码、数据不能下载、数据无法解压等）请联系：</p>
                <p className="text-gray-400">QQ:660685985</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-white/5 p-4 rounded-lg text-center">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=QR%20code%20for%20contact%2C%20black%20and%20white%20QR%20code&image_size=square" 
                    alt="联系二维码" 
                    className="w-48 h-48 rounded"
                  />
                  <p className="text-sm text-gray-400 mt-2">扫描二维码联系我们</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">开发者团队</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden bg-white/10">
                  <img 
                    src="https://img.cdn1.vip/i/6a087b596a764_1778940761.webp" 
                    alt="陆鹏光" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-white mb-1">陆鹏光</h3>
                <p className="text-sm text-gray-400 mb-2">(UI/UX设计+网站前端开发)</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>UI模型开发工程师</p>
                  <p>大模型开发工程师</p>
                  <p>Prompt工程师</p>
                  <p>AI Coding Engineer</p>
                  <p>Cyber网络安全风险分析</p>
                  <p>Agent Engineer</p>
                  <p>Cyber Security Engineer</p>
                  <p>Data Engineer</p>
                  <p>Datawhale Fine-tuning Engineer</p>
                  <p>Datawhale AIPrompt Engineer</p>
                  <p>Forage品牌与设计</p>
                  <p>HarmonyOS应用开发者基础认证</p>
                  <p>Python程序员初级</p>
                  <p>电子商务运营师(中级)</p>
                  <p>短视频剪辑师初级</p>
                  <p>人工智能训练师(高级)</p>
                  <p>HUAWEI数通网络协议基础认证</p>
                  <p>平面设计师初级</p>
                  <p>智能体开发工程师</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden bg-white/10">
                  <img 
                    src="https://img.cdn1.vip/i/6a087b474c82c_1778940743.jpg" 
                    alt="张靖哲" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-white mb-1">张靖哲</h3>
                <p className="text-sm text-gray-400 mb-2">(网站后端开发)</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Unity、Renpy引擎开发工程师，拥有个人游戏作品集</p>
                  <p>获2025年第七届蓝桥杯程序设计大赛</p>
                  <p>职业院校赛道华北赛区省赛银奖</p>
                  <p>获2025年第七届蓝桥杯程序设计大赛</p>
                  <p>职业院校赛道国赛优秀奖</p>
                  <p>北京大学学生创新创业大赛高职赛通</p>
                  <p>项目名称:星航动力-电池驱动低空经济新赛道</p>
                  <p>2025年北京市职业院校技能大赛高职组</p>
                  <p>开发组(团体)赛项比赛中获得一等奖</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden bg-white/10">
                  <img 
                    src="https://img.cdn1.vip/i/6a087b335e6f7_1778940723.jpg" 
                    alt="王宇欣" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-white mb-1">王宇欣</h3>
                <p className="text-sm text-gray-400 mb-2">(UI/UX设计+网页设计)</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>平面设计师初级</p>
                  <p>计算机一级证书</p>
                  <p>Forage品牌与设计</p>
                  <p>AIGC设计师</p>
                  <p>初级前端开发</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">关于我们</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-3">
            <button
              onClick={() => setActiveTab('download')}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'download'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              网站数据下载说明
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'team'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              开发者团队
            </button>
          </div>
          
          <div className="lg:w-3/4 glass-card p-6">
            {renderContent()}
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>版权所有 © 黄河三角洲资源环境科学数据平台</p>
          <p>地址：山东省东营市垦利区</p>
          <p>电话：0546-xxxxxxx</p>
        </div>
      </div>
    </div>
  );
}

function RedirectHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const pathParam = searchParams.get('p');
    if (pathParam) {
      const cleanPath = pathParam.replace(/^\/huanghe-delta-data-platform/, '');
      navigate(cleanPath);
    }
  }, [searchParams, navigate]);
  
  return null;
}

function App() {
  return (
    <Router basename="/huanghe-delta-data-platform">
      <div className="min-h-screen flex flex-col relative">
        <TechBackground />
        <div className="relative z-10 flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <RedirectHandler />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/protected-area" element={<ProtectedArea />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/monitoring-data" element={<MonitoringData />} />
              <Route path="/remote-sensing" element={<RemoteSensing />} />
              <Route path="/research-results" element={<ResearchResults />} />
              <Route path="/national-park" element={<NationalParkDetail />} />
              <Route path="/wetland-restoration" element={<WetlandRestoration />} />
              <Route path="/eco-monitoring" element={<EcoEnvironmentMonitoring />} />
              <Route path="/kenli-district" element={<KenliDistrict />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/database-catalog" element={<DatabaseCatalog />} />
              <Route path="/other-results" element={<OtherResults />} />
              <Route path="/other-results/gps-app" element={<GpsApp />} />
              <Route path="/other-results/about" element={<AboutUs />} />
              <Route path="/other-results/wechat" element={<Wechat />} />
              <Route path="/other-results/wechat/detail" element={<WechatArticleDetail />} />
              <Route path="/other-results/projects" element={<Projects />} />
              <Route path="/other-results/literature" element={<Literature />} />
              <Route path="/help-center" element={<HelpCenter />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;