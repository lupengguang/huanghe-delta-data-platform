import React, { useState } from 'react';
import { mockNotifications } from '../data/mockData';

function NotificationList() {
  const [notifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  return (
    <div>
      {notifications.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className="py-2 border-b border-white/10 last:border-0 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => handleNotificationClick(item)}
        >
          <p className="text-gray-300 text-sm leading-relaxed">• {item.title}</p>
        </div>
      ))}

      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="glass-card max-w-lg w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{selectedNotification.title}</h3>
              <button
                className="text-gray-400 hover:text-white text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedNotification.content || '暂无详细内容'}
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              {selectedNotification.create_time && new Date(selectedNotification.create_time).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationList;