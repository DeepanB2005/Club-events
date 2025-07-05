import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import Createclub from '../components/createclub.jsx';
import ManageClubs from '../components/Manageclubs.jsx'; 
import Manageusers from '../components/Manageusers.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [clubsError, setClubsError] = useState(null);
  const [usersError, setUsersError] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch clubs
    fetch('http://localhost:5000/api/clubs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch clubs');
        return res.json();
      })
      .then(data => {
        setClubs(data);
        setClubsLoading(false);
      })
      .catch(err => {
        setClubsError(err.message);
        setClubsLoading(false);
      });

    // Fetch users
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setUsersLoading(false);
      })
      .catch(err => {
        setUsersError(err.message);
        setUsersLoading(false);
      });
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'create-clubs':
        return <Createclub />;
      case 'manage-clubs':
        return (
          <ManageClubs
            clubs={clubs}
            loading={clubsLoading}
            error={clubsError}
            setClubs={setClubs}
          />
        );
      case 'manage-users':
        return (
          <Manageusers
            users={users}
            clubs={clubs}
            loading={usersLoading || clubsLoading}
            error={usersError || clubsError}
          />
        );
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
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;