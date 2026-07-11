import React, { useState } from 'react';
import { mockProjectProgress } from '../data/mockData';
import { withBase } from '../utils/pathUtils';

function ProjectProgressList() {
  const [progressList] = useState(mockProjectProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProgressClick = (progress) => {
    setSelectedProgress(progress);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgress(null);
  };

  const goToPrevious = () => {
    if (progressList.length > 0) {
      setCurrentIndex((prev) => (prev === 0 ? progressList.length - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (progressList.length > 0) {
      setCurrentIndex((prev) => (prev === progressList.length - 1 ? 0 : prev + 1));
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (progressList.length === 0) {
    return <div className="text-center text-gray-400 py-4">暂无项目进展</div>;
  }

  const currentItem = progressList[currentIndex];

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:bg-white/5 transition-colors p-3 rounded-lg"
        onClick={() => handleProgressClick(currentItem)}
      >
        <p className="text-gray-300 text-sm leading-relaxed">• {currentItem.title}</p>
        {currentItem.image_url && (
          <img 
            src={withBase(currentItem.image_url)} 
            alt={currentItem.title}
            className="w-full h-32 object-cover rounded mt-2"
          />
        )}
        {currentItem.content && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-3">{currentItem.content}</p>
        )}
      </div>

      <div className="flex items-center justify-center mt-4 gap-2">
        <button
          onClick={goToPrevious}
          className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="上一页"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {progressList.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`跳转到第 ${index + 1} 项`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="下一页"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {showModal && selectedProgress && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="glass-card max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{selectedProgress.title}</h3>
              <button
                className="text-gray-400 hover:text-white text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            {selectedProgress.image_url && (
              <img 
                src={withBase(selectedProgress.image_url)} 
                alt={selectedProgress.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedProgress.content || '暂无详细内容'}
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              {selectedProgress.create_time && new Date(selectedProgress.create_time).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectProgressList;