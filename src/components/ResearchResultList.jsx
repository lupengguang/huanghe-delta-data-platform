import React, { useState } from 'react';
import { mockResearchResults } from '../data/mockData';

function ResearchResultList() {
  const [results] = useState(mockResearchResults);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 font-bold">最新研究成果</div>
      </div>
      
      <div className="space-y-4">
        {results.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="border-b border-white/10 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-white/5 transition-colors p-2 -m-2 rounded"
            onClick={() => handleResultClick(item)}
          >
            <p className="text-white font-medium mb-1">{item.project_name}</p>
            <div className="text-sm text-gray-400 space-y-1">
              {item.journal && <p>期刊：{item.journal}</p>}
              {item.volume && <p>卷期：{item.volume}</p>}
              {item.doi && <p>DOI：{item.doi}</p>}
              {item.official_link && (
                <p>
                  官方链接：
                  <a 
                    href={item.official_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline ml-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    点击访问
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedResult && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="glass-card max-w-lg w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{selectedResult.project_name}</h3>
              <button
                className="text-gray-400 hover:text-white text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="space-y-2 text-gray-300">
              {selectedResult.journal && <p><strong>期刊：</strong>{selectedResult.journal}</p>}
              {selectedResult.volume && <p><strong>卷期：</strong>{selectedResult.volume}</p>}
              {selectedResult.doi && <p><strong>DOI：</strong>{selectedResult.doi}</p>}
              {selectedResult.official_link && (
                <p>
                  <strong>官方链接：</strong>
                  <a 
                    href={selectedResult.official_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {selectedResult.official_link}
                  </a>
                </p>
              )}
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              {selectedResult.create_time && new Date(selectedResult.create_time).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResearchResultList;