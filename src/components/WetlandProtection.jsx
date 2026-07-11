import React from 'react';

function WetlandProtection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">湿地保护修复核心内容</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="glass-card rounded-lg overflow-hidden">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wetland%20restoration%20in%20Yellow%20River%20Delta%2C%20ecological%20restoration%2C%20beautiful%20wetland%20scenery&image_size=landscape_4_3" 
              alt="湿地保护修复" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">修复模式</h3>
              <p className="text-gray-400 mb-4">
                创新探索"陆海统筹、系统修复、综合治理"的黄河口湿地修复模式
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">修复项目与成果</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">总投资15.6亿元实施18个湿地保护修复项目</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">疏通潮沟76公里，连通水系241公里</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">新增淡水沼泽湿地7.4万亩，总面积超30万亩</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">治理维护互花米草13.1万亩，恢复盐地碱蓬5.2万亩</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">构建牡蛎礁、贝藻礁2.6万亩</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">生态补水体系</h3>
              <p className="text-gray-400 mb-4">
                建成科学生态补水体系，累计生态补水超8.6亿立方米，年度补水1.7亿立方米
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">植物封育保护</h3>
              <p className="text-gray-400">
                划定野大豆保育区7.46万亩、陆海全梯度植物保育区6万亩、原生植物保育区2万亩
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WetlandProtection;