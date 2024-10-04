import React, { useState, useEffect } from 'react';

// Base URL for the NASA DONKI Notifications API
const NASA_API_BASE_URL = 'https://api.nasa.gov/DONKI/notifications';

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('all');

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    // Default to 7 days prior to current date for startDate and current date for endDate
    const today = new Date();
    const defaultEndDate = today.toISOString().split('T')[0];
    const defaultStartDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];

    const start = startDate || defaultStartDate;
    const end = endDate || defaultEndDate;

    const url = `${NASA_API_BASE_URL}?startDate=${start}&endDate=${end}&type=${type}&api_key=DEMO_KEY`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Debug output to inspect the data structure
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [startDate, endDate, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
    if (name === 'type') setType(value);
  };

  const renderNotifications = () => {
    if (!notifications.length) {
      return <p className="text-center">No notifications available for the selected criteria.</p>;
    }

    return notifications.map((notification, index) => (
      <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
        <h3 className="text-xl font-semibold mb-2">{notification.messageType || 'No Type'}</h3>
        <p><strong>Date:</strong> {notification.messageIssueTime || 'No Date'}</p>
        <p><strong>Message ID:</strong> {notification.messageID || 'No ID'}</p>
        <p><strong>Message URL:</strong> <a href={notification.messageURL} target="_blank" rel="noopener noreferrer" className="text-blue-400">{notification.messageURL || 'No URL'}</a></p>
        <p><strong>Message Body:</strong> <span>{notification.messageBody || 'No Description'}</span></p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">NASA DONKI Notifications</h1>

      <div className="mb-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded"
          />
          <select
            name="type"
            value={type}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded"
          >
            <option value="all">All</option>
            <option value="FLR">FLR</option>
            <option value="SEP">SEP</option>
            <option value="CME">CME</option>
            <option value="IPS">IPS</option>
            <option value="MPC">MPC</option>
            <option value="GST">GST</option>
            <option value="RBE">RBE</option>
            <option value="report">Report</option>
          </select>
          <button
            type="button"
            onClick={fetchNotifications}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Fetch Notifications
          </button>
        </form>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center">{error}</p>}

      <div className="space-y-4">
        {renderNotifications()}
      </div>
    </div>
  );
};

export default NotificationsComponent;
