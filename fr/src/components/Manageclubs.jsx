import React, { useState, useEffect } from 'react';

function ManageClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/clubs')
      .then(res => {
        console.log("get clubs from server");
        console.log(res);
        if (!res.ok) throw new Error('Failed to fetch clubs');
        return res.json();
      })
      .then(data => {
        setClubs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center font-ft p-6 bg-gray-50">
      <h1 className="text-3xl font-bold bg-gradient-to-t from-yellow-500 to-red-500 bg-clip-text text-transparent mb-8">
        Manage Clubs
      </h1>
      {loading ? (
        <div className="text-lg text-gray-600">Loading clubs...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clubs.map(club => (
            <div
              key={club._id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-transform"
            >
              {club.profilePhoto ? (
                <img
                  src={club.profilePhoto}
                  alt={club.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-200 mb-4 text-3xl text-white font-bold">
                  {club.name?.charAt(0) || "?"}
                </div>
              )}
              <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">{club.name}</h2>
              <p className="text-gray-600 text-center mb-2 line-clamp-3">{club.description}</p>
              {club.leader && (
                <p className="text-sm text-gray-500 mb-1">Leader: <span className="font-medium">{club.leader}</span></p>
              )}
              <p className="text-xs text-gray-400">Members: {club.members?.length || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageClubs;