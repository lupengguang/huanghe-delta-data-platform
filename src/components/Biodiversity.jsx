import React from 'react';

function Biodiversity() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">生物多样性核心数据</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">野生动物</h3>
              <p className="text-gray-400 mb-4">保护区共有野生动物1635种</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">植物资源</h3>
              <p className="text-gray-400 mb-4">共有植物685种，芦苇、野大豆、盐地碱蓬、柽柳和罗布麻广泛分布</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">旗舰物种保护成果</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">东方白鹳：2025年繁殖233巢、536只，创历年新高，累计繁殖4260只</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">黑嘴鸥：年繁殖种群数量稳定在1万余只</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">东营市获"中国东方白鹳之乡""中国黑嘴鸥之乡"称号</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">鸟类数据</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">鸟类由1990年建区时的187种增加到目前的406种</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">国家一级保护鸟类26种：丹顶鹤、白头鹤、白鹤、大鸨、东方白鹳、黑鹳、金雕、白尾海雕、中华秋沙鸭、遗鸥等</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">国家二级保护鸟类66种：灰鹤、大天鹅、鸳鸯等</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">每年迁徙越冬数量达数百万只，有38种水鸟的种群数量达到全球总量的1%</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card rounded-lg overflow-hidden">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Birds%20in%20Yellow%20River%20Delta%2C%20wetland%20birds%2C%20natural%20habitat&image_size=landscape_4_3" 
                alt="黄河三角洲鸟类" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Biodiversity;