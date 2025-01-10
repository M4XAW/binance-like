import React, { useState, useEffect } from 'react';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    setCurrentUser(userLogin?.username || "");

    const loadTransactionHistory = () => {
      const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      
      const relevantNotifications = transactionHistory.filter(
        (transaction) => transaction.sender === currentUser || transaction.receiver === currentUser
      );

      const notificationsWithReadStatus = relevantNotifications.map(notification => ({
        ...notification,
        read: notification.read || false,
      }));

      setNotifications(notificationsWithReadStatus);
    };

    loadTransactionHistory();

    const intervalId = setInterval(() => {
      loadTransactionHistory();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentUser]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem('transactionHistory', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true;
    setNotifications(updatedNotifications);
    
    localStorage.setItem('transactionHistory', JSON.stringify(updatedNotifications));
  };

  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
                  {notification.crypto} : {notification.amount} <br />
                  <span className="text-xs text-gray-500">
                    {notification.sender} → {notification.receiver}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    {notification.date}
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