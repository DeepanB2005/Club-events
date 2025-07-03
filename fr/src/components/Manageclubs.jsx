import React, { useState, useEffect } from 'react';

function ManageClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  // const handleDeleteClub = async (clubName) => {
  //   if (!window.confirm('Are you sure you want to delete this club? This action cannot be undone.')) return;

  //   setDeleting(true);
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/clubs/name/${encodeURIComponent(clubName)}`, {
  //       method: 'DELETE',
  //     });

  //     const contentType = res.headers.get('content-type');
  //     let data;
  //     if (contentType && contentType.includes('application/json')) {
  //       data = await res.json();
  //     } else {
  //       const text = await res.text();
  //       throw new Error(text || 'Server returned non-JSON response.');
  //     }

  //     if (!res.ok) {
  //       throw new Error(data.error || 'Failed to delete club');
  //     }

  //     setClubs(prev => prev.filter(club => club.name !== clubName));
  //     setSelectedClub(null);
  //     alert('Club deleted successfully!');
  //   } catch (err) {
  //     alert('Error deleting club: ' + err.message);
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

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
            <button
              key={club._id}
              className="bg-gradient-to-r from-green-200 to-blue-100 rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-transform focus:outline-none"
              onClick={() => setSelectedClub(club)}
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
                <p className="text-sm text-gray-500 mb-1">
                  Leader: <span className="font-medium">
                    {club.leader.username || club.leader.email || club.leader._id}
                  </span>
                </p>
              )}
              <p className="text-xs text-gray-400">Members: {club.members?.length || 0}</p>
            </button>
          ))}
        </div>
      )}

      {selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setSelectedClub(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              {selectedClub.profilePhoto ? (
                <img
                  src={selectedClub.profilePhoto}
                  alt={selectedClub.name}
                  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-200 mb-4 text-4xl text-white font-bold">
                  {selectedClub.name?.charAt(0) || "?"}
                </div>
              )}
              <h2 className="text-2xl font-bold text-blue-700 mb-2">{selectedClub.name}</h2>
              <p className="text-gray-700 text-justify mb-4">{selectedClub.description}</p>
              <p className="text-md text-gray-600 mb-2">
                <span className="font-semibold">Leader:</span> {selectedClub.leader?.username || selectedClub.leader?.email || selectedClub.leader?._id}
              </p>
              <p className="text-md text-gray-600 mb-2">
                <span className="font-semibold">Members:</span> {selectedClub.members?.length || 0}
              </p>
              {selectedClub.members && selectedClub.members.length > 0 && (
                <div className="w-full mt-2">
                  <span className="font-semibold text-gray-700">Member List:</span>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedClub.members.map(member =>
                      <li key={member._id || member}>{member.username || member.email || member._id}</li>
                    )}
                  </ul>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-4">Created: {new Date(selectedClub.createdAt).toLocaleString()}</p>
              
              {/* Delete Button */}
              <div className="mt-6 flex gap-3">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setSelectedClub(null)}
                >
                  Close
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDeleteClub(selectedClub.name)}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Club'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageClubs;