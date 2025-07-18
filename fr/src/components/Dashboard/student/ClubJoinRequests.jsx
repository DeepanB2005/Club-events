import React, { useEffect, useState } from 'react';

function ClubJoinRequests({ user }) {
  const [clubs, setClubs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch clubs where user is leader
  useEffect(() => {
    if (!user?._id) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/clubs`)
      .then(res => res.json())
      .then(data => {
        const leaderClubs = data.filter(club => club.leader?._id === user._id || club.leader === user._id);
        setClubs(leaderClubs);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch clubs');
        setLoading(false);
      });
  }, [user]);

  // Fetch join requests for all leader clubs
  useEffect(() => {
    if (clubs.length === 0) return;
    setLoading(true);
    Promise.all(
      clubs.map(club =>
        fetch(`http://localhost:5000/api/join-requests/club/${club._id}`)
          .then(res => res.json())
          .then(data => data.map(req => ({ ...req, clubName: club.name, clubId: club._id })))
      )
    )
      .then(results => setRequests(results.flat()))
      .catch(() => setError('Failed to fetch join requests'))
      .finally(() => setLoading(false));
  }, [clubs]);

  const handleAction = async (requestId, status) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/join-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update request');
      // Refresh requests
      setRequests(reqs => reqs.map(r => r._id === requestId ? { ...r, status } : r));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user?._id) return <div className="text-red-500">You must be logged in as a leader.</div>;
  if (loading) return <div>Loading join requests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Incoming Join Requests</h1>
      {requests.length === 0 ? (
        <div>No join requests found for your clubs.</div>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req._id} className="p-4 bg-white rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold">{req.user?.username || req.user?.email}</span>
                <span className="ml-2 text-gray-600">({req.user?.rollNo})</span>
                <span className="ml-2 text-sm text-blue-500">{req.user?.email}</span>
                <span className="ml-4 text-xs text-purple-700">Club: {req.clubName}</span>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  req.status === 'pending' ? 'bg-yellow-200 text-yellow-800'
                  : req.status === 'approved' ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
                }`}>
                  {req.status}
                </span>
                {req.status === 'pending' && (
                  <>
                    <button
                      className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleAction(req._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleAction(req._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClubJoinRequests;