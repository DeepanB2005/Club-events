import React, { useEffect, useState } from "react";

function Manageusers() {
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/users").then(res => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      }),
      fetch("http://localhost:5000/api/clubs").then(res => {
        if (!res.ok) throw new Error("Failed to fetch clubs");
        return res.json();
      })
    ])
      .then(([usersData, clubsData]) => {
        setUsers(usersData);
        setClubs(clubsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Helper to get club name if user is a leader
  const getLeadership = (userId) => {
    const club = clubs.find(club => club.leader && club.leader._id === userId);
    return club ? club.name : "-";
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-ft p-6 bg-gray-50">
      <h1 className="text-3xl font-bold bg-gradient-to-t from-yellow-500 to-red-500 bg-clip-text text-transparent mb-8">
        Manage Users
      </h1>
      <div className="shadow-2xl w-[700px] h-[500px] dark:text-white max-md:h-[9000px] max-md:w-80 max-md:ml-0 mt-5 pt-14 pl-4 rounded-2xl bg-gradient-to-r from-blue-200 to-violet-200 dark:bg-gradient-to-t dark:from-gray-600 dark:to-yellow-800 justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300 ml-5">
          Manage all users in the system
        </p>
        <div className="mt-5 overflow-auto h-[350px]">
          {loading ? (
            <div className="text-gray-500">Loading users...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leadership</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 dark:text-blue-400 hover:underline">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getLeadership(user._id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manageusers;