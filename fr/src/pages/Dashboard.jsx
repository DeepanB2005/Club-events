import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/search.jsx';
import Sidebar from '../components/sidebar.jsx'; // Import Sidebar
// import {
//   Menu, Search, Bell, Users, BarChart3, MessageSquare, Calendar, TrendingUp, Activity, DollarSign, ShoppingCart, User
// } from 'lucide-react';



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-r dark:from-black dark:to-yellow-950">
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
              <button
                onClick={toggleSidebar}
                className="h-10 w-10 lg:hidden text-white p-2 rounded-lg bg-gray-800 dark:hover:bg-gray-700"
              >S
              </button>
              

      </div>
      
  );
};

export default Dashboard;