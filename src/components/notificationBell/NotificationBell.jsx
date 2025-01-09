import React, { useState, useEffect } from 'react';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadNotifications = () => {
      const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      setNotifications(savedNotifications);
    };

    loadNotifications();

    const intervalId = setInterval(() => {
      loadNotifications();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true;
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const sortedNotifications = notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="relative">
      <button
        className="relative bg-gray-700 text-white p-2 rounded-full"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-gray-900 text-white shadow-lg rounded-lg w-64">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
            <h4 className="text-gray-200 font-bold">Notifications</h4>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={markAllAsRead}
            >
              Marquer tout comme lu
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {sortedNotifications.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">Aucune notification</li>
            ) : (
              sortedNotifications.map((notification, index) => (
                <li
                  key={index}
                  onClick={() => markAsRead(index)}
                  className={`px-4 py-2 cursor-pointer ${notification.read ? 'bg-gray-800' : 'bg-blue-900'}`}
                >
                  {notification.message} <br />
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;