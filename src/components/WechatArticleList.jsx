import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockWechatArticles } from '../data/mockData';

function WechatArticleList() {
  const [articles] = useState(mockWechatArticles.official);

  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '......';
  };

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 font-bold">
          最新研究成果
        </div>
        <Link to="/other-results/wechat" className="text-blue-400 hover:text-blue-300 text-sm">
          更多>>
        </Link>
      </div>
      
      <ul className="space-y-2">
        {articles.slice(0, 8).map((article) => (
          <li key={article.id} className="flex items-center gap-2">
            <span className="text-blue-400">◆</span>
            <Link 
              to={`/other-results/wechat/detail?id=${article.id}&type=official`}
              className="text-gray-300 hover:text-blue-400 hover:underline truncate flex-1 text-sm"
              title={article.title}
            >
              {truncateTitle(article.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WechatArticleList;