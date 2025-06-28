import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import Createclub from '../components/createclub.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard'); // Track active menu

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render the main content based on activeMenu
  const renderContent = () => {
    switch (activeMenu) {
      case 'create-clubs':
        return <Createclub />;
      // Add more cases for other menu items if needed
      default:
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-r dark:from-black dark:to-yellow-950">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <button
        onClick={toggleSidebar}
        className="h-10 w-10 lg:hidden text-white p-2 rounded-lg bg-gray-800 dark:hover:bg-gray-700"
      >|||</button>
      <div className="flex-1 flex flex-col">
        <div className="flex h-16 border-b border-gray-300 dark:border-yellow-900 items-center justify-between px-4"></div>
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;