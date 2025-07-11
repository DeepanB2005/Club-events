import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar.jsx';
import Createclub from '../components/Dashboard/createclub.jsx';
import ManageClubs from '../components/Dashboard/Manageclubs.jsx'; 
import Manageusers from '../components/Dashboard/Manageusers.jsx';
import Leadership from '../components/Dashboard/student/Leadership.jsx';
import Clubs from '../components/Dashboard/student/clubs.jsx';
import Events from '../components/Dashboard/student/Events.jsx';
import ClubJoinRequests from '../components/Dashboard/student/ClubJoinRequests.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [clubsError, setClubsError] = useState(null);
  const [usersError, setUsersError] = useState(null);

  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch clubs
    setClubsLoading(true);
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

    setUsersLoading(true);
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
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'create-clubs':
        return <Createclub />;
      case 'events': {
        const storedUser = localStorage.getItem('user');
        let currentUser = null;
        if (storedUser) {
          try {
            currentUser = JSON.parse(storedUser);
          } catch (e) {
            currentUser = null;
          }
        }
        const userObj = users.find(u => u._id === (currentUser && currentUser._id));
        return (
          <Events
            user={userObj}
            clubs={clubs}
            clubsLoading={clubsLoading}
          />
        );
      }
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
      case 'leadership': {
        const storedUser = localStorage.getItem('user');
        let currentUser = null;
        if (storedUser) {
          try {
            currentUser = JSON.parse(storedUser);
          } catch (e) {
            currentUser = null;
          }
        }
        const userObj = users.find(u => u._id === (currentUser && currentUser._id));
        return (
          <Leadership
            user={userObj}
            clubs={clubs}
            clubsLoading={clubsLoading}
          />
        );
      }
      case 'clubs': {
        const storedUser = localStorage.getItem('user');
        let loggedInUser = null;
        if (storedUser) {
          try {
            loggedInUser = JSON.parse(storedUser);
          } catch (e) {
            loggedInUser = null;
          }
        }
        return (
          <Clubs
            user={loggedInUser}
            clubs={clubs}
            loading={clubsLoading}
            error={clubsError}
            setClubs={setClubs}
          />
        );
      }
      case 'join-requests': {
        const club = clubs[0];
        return club ? <ClubJoinRequests clubId={club._id} /> : null;
      }
      
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