import React from 'react';

function NationalPark() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">黄河口国家公园建设进展</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">创建背景</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">2020年1月，习近平总书记指出"加快黄河三角洲自然保护地优化整合，推进建设黄河口国家公园"</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">2021年10月，习近平总书记亲临保护区考察，再次强调"要抓紧谋划创建黄河口国家公园，科学论证、扎实推进"</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">创建进展</h3>
              <p className="text-gray-400 mb-4">
                国家公园创建任务基本完成，设立报批工作走在第二批国家公园前列
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">矛盾冲突处置</h3>
              <p className="text-gray-400 mb-4">
                累计退出油气水井510口，确权海域、盐田和养殖坑塘192宗、50万亩
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">入选荣誉</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">2024年，山东东营黄河口湾区成功入选生态环境部美丽海湾</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">黄河口国家公园智慧管理平台入选"全国林草信息化领域50个重点典型案例集"</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yellow%20River%20Delta%20National%20Park%2C%20aerial%20view%2C%20beautiful%20landscape%2C%20wetland%20area&image_size=landscape_4_3" 
              alt="黄河口国家公园" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NationalPark;