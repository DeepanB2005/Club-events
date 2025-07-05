import React, { useState } from "react";

function Manageusers({ users = [], clubs = [], loading = true, error = null, onDeleteUser }) {
  const [selectedUser, setSelectedUser] = useState(null);


  const getUserClubs = (userId) => {
    return clubs.filter(club => club.members && club.members.some(member => member._id === userId));
  };

  const getLeadershipClubs = (userId) => {
    return clubs.filter(club => club.leader && club.leader._id === userId);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      if (onDeleteUser) {
        onDeleteUser(userId);
      }
      setSelectedUser(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-ft p-6 bg-gray-50">
      <h1 className="text-4xl font-bold bg-gradient-to-t from-yellow-500 to-red-500 bg-clip-text text-transparent mb-2">
        Manage Users
      </h1>
      <div className="shadow-2xl w-[900px] h-[600px] dark:text-white max-md:h-[9000px] max-md:w-80 max-md:ml-0 mt-5 pt-10 p-12 rounded-2xl bg-gradient-to-r from-blue-200 to-violet-200 dark:bg-gradient-to-t dark:from-gray-600 dark:to-yellow-800 justify-center items-center">
        <p className="text-green-500 dark:text-green-400 text-2xl ml-5">
          Manage all users in the system
        </p>
        <div className="mt-5 overflow-auto h-[550px] w-[500px] rounded-2xl">
          {loading ? (
            <div className="text-gray-500">Loading users...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full ml bg-gradient-to-r from-red-200 to-yellow-200 dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${selectedUser && selectedUser._id === user._id ? "bg-yellow-100 dark:bg-yellow-900" : ""}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 dark:text-blue-400 hover:underline">{user.email}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* User Details Card */}
        {selectedUser && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-[400px] relative">
              <button
                className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-500"
                onClick={() => setSelectedUser(null)}
                title="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
              <div className="mb-2"><span className="font-semibold">Username:</span> {selectedUser.username}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {selectedUser.email}</div>
              <div className="mb-2"><span className="font-semibold">Role:</span> {selectedUser.role || "N/A"}</div>
              <div className="mb-2"><span className="font-semibold">Clubs:</span>
                <ul className="list-disc ml-6">
                  {getUserClubs(selectedUser._id).length > 0 ? (
                    getUserClubs(selectedUser._id).map(club => (
                      <li key={club._id}>{club.name}</li>
                    ))
                  ) : (
                    <li>No clubs</li>
                  )}
                </ul>
              </div>
              <div className="mb-2"><span className="font-semibold">Leadership:</span>
                <ul className="list-disc ml-6">
                  {getLeadershipClubs(selectedUser._id).length > 0 ? (
                    getLeadershipClubs(selectedUser._id).map(club => (
                      <li key={club._id}>{club.name}</li>
                    ))
                  ) : (
                    <li>Not a leader of any club</li>
                  )}
                </ul>
              </div>
              <button
                className="mt-4 w-40 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(selectedUser._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manageusers;