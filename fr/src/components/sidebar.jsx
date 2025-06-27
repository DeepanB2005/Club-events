import React, { useState, useEffect } from 'react';
import {
  X, Home, BarChart3, Users, Settings, Calendar, MessageSquare, ChevronRight,
  User, LogOut, Building2, PlusCircle, Edit, UserPlus, UserCog, Crown, Eye
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Fetch latest user data from backend using email
      fetch(`http://127.0.0.1:5000/api/users?email=${encodeURIComponent(parsedUser.email)}`)
        .then(res => res.json())
        .then(data => {
          // If backend returns an array, find the user by email
          let backendUser = Array.isArray(data)
            ? data.find(u => u.email === parsedUser.email)
            : data;
          if (backendUser) setUser(backendUser);
          else setUser(parsedUser);
        })
        .catch(() => setUser(parsedUser)); // fallback on error
    }
  }, []);

  // Get menu items based on user role
  const getMenuItems = () => {
    const userRole = user?.role || 'student'; // Default to student if no role found
    switch (userRole) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-500' },
          { id: 'manage-clubs', label: 'Manage Clubs', icon: Building2, color: 'text-green-500' },
          { id: 'manage-events', label: 'Manage Events', icon: Calendar, color: 'text-orange-500' },
          { id: 'create-clubs', label: 'Create Clubs', icon: PlusCircle, color: 'text-purple-500' },
          { id: 'manage-users', label: 'Manage Users', icon: Users, color: 'text-red-500' },
          { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-500' },
        ];
      case 'leader':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-500' },
          { id: 'my-clubs', label: 'My Clubs', icon: Building2, color: 'text-green-500' },
          { id: 'leadership', label: 'Leadership', icon: Crown, color: 'text-yellow-500' },
          { id: 'create-events', label: 'Create Events', icon: PlusCircle, color: 'text-purple-500' },
          { id: 'update-events', label: 'Update Events', icon: Edit, color: 'text-orange-500' },
          { id: 'join-requests', label: 'Join Requests', icon: UserPlus, color: 'text-indigo-500' },
          { id: 'manage-members', label: 'Manage Members', icon: UserCog, color: 'text-red-500' },
        ];
      case 'student':
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-500' },
          { id: 'clubs', label: 'Clubs', icon: Building2, color: 'text-green-500' },
          { id: 'events', label: 'Events', icon: Calendar, color: 'text-orange-500' },
          { id: 'all-clubs', label: 'All Clubs', icon: Eye, color: 'text-purple-500' },
          { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-500' },
        ];
    }
  };

  const menuItems = getMenuItems();

  // Get role display name and color
  const getRoleInfo = () => {
    const userRole = user?.role || 'student';
    switch (userRole) {
      case 'admin':
        return { name: 'Administrator', color: 'from-red-500 to-red-600', bgColor: 'bg-red-500' };
      case 'leader':
        return { name: 'Club Leader', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' };
      case 'student':
      default:
        return { name: 'Student', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' };
    }
  };

  const roleInfo = getRoleInfo();

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.clear(); // Clear all local storage
    navigate("/");
  };

  return (
    <>
      {/*for mobile  dimention*/}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gradient-to-t from-violet-200  dark:bg-gradient-to-b dark:from-black dark:to-yellow-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`shadow-sm shadow-gray-500 w-8 h-8 bg-gradient-to-r ${roleInfo.color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {user?.role === 'admin' ? 'A' : user?.role === 'leader' ? 'L' : 'S'}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">{roleInfo.name}</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeItem === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-purple-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`${activeItem === item.id ? item.color : 'text-gray-500 dark:text-gray-400'}`}
                />
                <span className={`font-medium ${
                  activeItem === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {item.label}
                </span>
                {activeItem === item.id && (
                  <ChevronRight size={16} className="ml-auto text-blue-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className={`w-10 h-10 bg-gradient-to-r ${roleInfo.color} rounded-full flex items-center justify-center`}>
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.username || user?.email || "User"}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`inline-block w-2 h-2 ${roleInfo.bgColor} rounded-full`}></span>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {roleInfo.name}
                </p>
              </div>
            </div>
            <button
              className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;