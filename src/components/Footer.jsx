import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="glass-footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li><Link to="/protected-area" className="text-gray-400 hover:text-blue-400 transition-colors">保护区简介</Link></li>
              <li><Link to="/organization" className="text-gray-400 hover:text-blue-400 transition-colors">组织结构</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">联系我们</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">数据资源</h3>
            <ul className="space-y-2">
              <li><Link to="/monitoring-data" className="text-gray-400 hover:text-blue-400 transition-colors">监测数据</Link></li>
              <li><Link to="/remote-sensing" className="text-gray-400 hover:text-blue-400 transition-colors">遥感影像</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">科研成果</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">国家公园建设</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">湿地保护修复</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">生态环境监测</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
            <p className="text-gray-400 mb-2">电话：0546-xxxxxxx</p>
            <p className="text-gray-400 mb-2">地址：山东省东营市垦利区</p>
            <p className="text-gray-400">邮箱：info@huanghe-delta.com</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">Copyright © 山东黄河三角洲国家级自然保护区</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">法律声明</a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">网站地图</a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-600 text-xs">
            <p>ICP备案号：鲁ICP备xxxxxxxx号-1 | 政府网站标识码：3705000000</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;