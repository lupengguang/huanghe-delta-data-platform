import React from 'react';

function MonitoringIndicators() {
  const indicators = [
    {
      title: '湿地生态指标',
      items: ['湿地面积', '水体连通性', '潮沟分布', '湿地植被覆盖度']
    },
    {
      title: '水文水资源指标',
      items: ['黄河来水来沙量', '生态补水总量', '地下水位', '水质参数（pH、溶解氧、总氮、总磷等）']
    },
    {
      title: '气象气候指标',
      items: ['温度', '降水', '蒸发', '风速风向', '太阳辐射']
    },
    {
      title: '土壤环境指标',
      items: ['土壤盐分', '有机质含量', 'pH', '含水量']
    },
    {
      title: '生物多样性指标',
      items: ['鸟类种群数量', '珍稀物种分布', '植被类型', '底栖生物群落结构']
    },
    {
      title: '遥感监测指标',
      items: ['土地利用/覆被变化', '植被指数（NDVI）', '水体面积动态', '生态质量遥感指数（RSEI）']
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">生态环境监测核心指标</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((category, index) => (
            <div key={index} className="glass-card p-6 card-hover">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MonitoringIndicators;