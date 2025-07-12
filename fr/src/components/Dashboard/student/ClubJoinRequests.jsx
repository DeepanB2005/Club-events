import React, { useEffect, useState } from 'react';

function ClubJoinRequests({ clubId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/join-requests/club/${clubId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch join requests');
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (clubId) fetchRequests();
  }, [clubId]);

  if (loading) return <div>Loading join requests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Join Requests for Club</h1>
      {requests.length === 0 && <div>No join requests found.</div>}
      {requests.length > 0 && (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req._id} className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{req.user?.username || req.user?.email}</h2>
                  <p className="text-sm text-gray-600">Roll No: {req.user?.rollNo}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === 'pending' ? 'bg-yellow-200 text-yellow-800'
                  : req.status === 'approved' ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
                }`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Join Requests</h2>
      {requests.length === 0 ? (
        <div>No join requests.</div>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req._id} className="p-4 bg-gray-100 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold">{req.user?.username || req.user?.email}</span>
                <span className="ml-2 text-gray-600">({req.user?.rollNo})</span>
                <span className="ml-2 text-sm text-blue-500">{req.user?.email}</span>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === 'pending' ? 'bg-yellow-200 text-yellow-800'
                  : req.status === 'approved' ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
                }`}>
                  {req.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClubJoinRequests;