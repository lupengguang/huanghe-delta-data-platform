import React from 'react';

function ResearchAndNews() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">科研平台与合作机构</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">中国科学院黄河三角洲滨海湿地生态试验站</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">2009年由中国科学院烟台海岸带研究所和东营市人民政府共同筹建，属中国科学院院级野外站，纳入CERN管理</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">主要研究方向：陆-海相互作用下湿地物质运移机制、滨海湿地生态系统演变、退化湿地生态修复、湿地保护与合理利用对策</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">科研团队：现有科研人员41人，其中研究员9人、副研究员16人</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-300">科研成果：发表论文336篇（SCI收录225篇），出版专著28部，授权发明专利19项</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">其他科研平台</h3>
              <div className="mb-6">
                <h4 className="font-medium text-white mb-2">国家生态质量综合监测站——山东黄河三角洲站（湿地）</h4>
                <p className="text-gray-400 mb-2">由山东省东营生态环境监测中心与中国科学院地理科学与资源研究所、中国科学院烟台海岸带研究所、北京师范大学等9家单位联合共建</p>
                <p className="text-gray-400">采取"一站多点"建设模式，开展生态样地质量监测与生态遥感地面验证</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-white mb-2">黄河三角洲生态监测中心</h4>
                <p className="text-gray-400">2021年成立，建立"天空地海"一体化监测网络，接入气象、水文、土壤、海洋等监测数据，实现全域15.3万公顷栖息地智慧监测</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">合作科研机构</h4>
                <p className="text-gray-400">与中国科学院等30余家国家级科研机构合作，成立11家野外监测和科研教学平台</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">数据资源与服务</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">数据资源总量</h3>
              <p className="text-gray-400">整合气象、水文、土壤、海洋、生物多样性等多源监测数据</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">数据共享服务</h3>
              <p className="text-gray-400">提供生态环境监测数据查询、湿地动态遥感影像、生物多样性观测记录</p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">平台系统</h3>
              <p className="text-gray-400">基于WEBGIS的黄河三角洲大数据示范应用平台；黄河三角洲生态环境与生物多样性信息系统V1.0</p>
            </div>
          </div>
          
          <div className="mt-8 glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">数据产品类型</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">湿地分类与动态变化数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">生态补水遥感监测评估数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">鸟类种群时空分布数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">土壤盐分与植被覆盖度数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">水质与水生态监测数据</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">新闻动态与成果展示</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card overflow-hidden card-hover">
              <div className="h-48 flex items-center justify-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Eco%20water%20supplement%20project%2C%20wetland%20restoration%2C%20environmental%20protection&image_size=landscape_4_3" 
                  alt="生态补水完成" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">生态补水完成公告</h3>
                <p className="text-gray-400 text-sm mb-4">2025年度生态补水任务顺利完成，累计补水1.7亿立方米</p>
                <a href="#" className="text-blue-400 text-sm font-medium hover:underline">查看详情</a>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden card-hover">
              <div className="h-48 flex items-center justify-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Bird%20watching%20event%2C%20Yellow%20River%20Delta%2C%20tourists%20with%20binoculars&image_size=landscape_4_3" 
                  alt="观鸟季活动" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">观鸟季活动报道</h3>
                <p className="text-gray-400 text-sm mb-4">第三届"沿着黄河遇见海"黄河口国际观鸟季活动，全网点击量超10亿</p>
                <a href="#" className="text-blue-400 text-sm font-medium hover:underline">查看详情</a>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden card-hover">
              <div className="h-48 flex items-center justify-center">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=National%20park%20construction%20progress%2C%20Yellow%20River%20Delta%2C%20infrastructure&image_size=landscape_4_3" 
                  alt="国家公园建设" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">国家公园建设进展</h3>
                <p className="text-gray-400 text-sm mb-4">黄河口国家公园创建任务基本完成，设立报批工作走在前列</p>
                <a href="#" className="text-blue-400 text-sm font-medium hover:underline">查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResearchAndNews;