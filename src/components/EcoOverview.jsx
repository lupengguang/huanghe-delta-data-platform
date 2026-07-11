import React from 'react';

function EcoOverview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">生态概况与价值定位</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 左侧内容 */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">保护区简介</h3>
            <p className="text-gray-400 mb-6">
              山东黄河三角洲国家级自然保护区于1992年经国务院批准建立，是以保护黄河口新生湿地生态系统和珍稀濒危鸟类为主体的湿地类型自然保护区。
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">核心价值</h3>
            <p className="text-gray-400 mb-6">
              "鸟类的国际机场"——黄河口候鸟栖息地于2024年列入《世界遗产名录》，成为山东省首个世界自然遗产。
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">生态系统地位</h3>
            <p className="text-gray-400">
              中国暖温带保存最完整、最广阔、最年轻的湿地生态系统，是中国沿海最大的新生湿地自然植被区。
            </p>
          </div>
          
          {/* 右侧图片 */}
          <div className="glass-card rounded-lg overflow-hidden">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yellow%20River%20Delta%20wetland%20ecosystem%2C%20birds%20in%20wetland%2C%20beautiful%20natural%20scenery&image_size=landscape_4_3" 
              alt="黄河三角洲生态系统" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcoOverview;