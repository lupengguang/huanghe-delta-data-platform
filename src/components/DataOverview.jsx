import React from 'react';

function DataOverview() {
  const coreData = [
    { label: '保护区总面积', value: '15.3万公顷', description: '1530平方公里' },
    { label: '鸟类物种数', value: '406种', description: '比1990年增加219种' },
    { label: '年度生态补水', value: '1.7亿立方米', description: '累计超8.6亿立方米' },
    { label: '治理互花米草', value: '13.1万亩', description: '恢复盐地碱蓬5.2万亩' },
    { label: '自然植被覆盖率', value: '55.1%', description: '持续提升中' }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">平台概况</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {coreData.map((item, index) => (
            <div key={index} className="glass-card p-4 text-center card-hover">
              <p className="text-sm text-gray-400 mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-blue-400 mb-1">{item.value}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">平台定位</h3>
            <p className="text-gray-400 mb-6">
              黄河三角洲资源环境科学数据平台致力于整合、管理和共享黄河三角洲地区的生态环境监测数据，为科研人员、决策者和公众提供全面、准确的环境数据服务。
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">核心功能</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-300">多源数据整合与管理</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-300">实时生态环境监测</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-300">数据可视化与分析</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-300">科研成果共享与转化</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-300">公众科普与教育</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/001.jpg" 
              alt="数据平台" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataOverview;