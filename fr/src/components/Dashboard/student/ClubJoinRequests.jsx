import React, { useEffect, useState } from 'react';

function ClubJoinRequests({ user }) {
  const [clubs, setClubs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }
    
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:5000/api/clubs`);
        if (!response.ok) {
          throw new Error(`Failed to fetch clubs: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filter clubs where current user is the leader
        const leaderClubs = data.filter(club => {
          const leaderId = typeof club.leader === 'object' ? club.leader._id : club.leader;
          return leaderId === user._id;
        });
        
        setClubs(leaderClubs);
        console.log('Leader clubs found:', leaderClubs);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError(`Failed to fetch clubs: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [user]);

  // Fetch join requests for all leader clubs
  useEffect(() => {
    if (clubs.length === 0) {
      setRequests([]);
      return;
    }

    const fetchJoinRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch requests for each club
        const requestPromises = clubs.map(async (club) => {
          try {
            const response = await fetch(`http://localhost:5000/api/join-requests/club/${club._id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch requests for club ${club.name}`);
            }
            const data = await response.json();
            
            // Add club information to each request
            return data.map(req => ({
              ...req,
              clubName: club.name,
              clubId: club._id
            }));
          } catch (err) {
            console.error(`Error fetching requests for club ${club.name}:`, err);
            return []; // Return empty array if this club's requests fail
          }
        });

        const results = await Promise.all(requestPromises);
        const allRequests = results.flat();
        
        // Sort by creation date (newest first)
        allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setRequests(allRequests);
        console.log('Join requests fetched:', allRequests);
      } catch (err) {
        console.error('Error fetching join requests:', err);
        setError(`Failed to fetch join requests: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinRequests();
  }, [clubs]);

  const handleAction = async (requestId, status, clubId) => {
    // Set loading state for this specific request
    setActionLoading(prev => ({ ...prev, [requestId]: true }));
    
    try {
      const response = await fetch(`http://localhost:5000/api/join-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${status} request`);
      }

      const data = await response.json();
      console.log(`Request ${status}:`, data);

      // Update the request status in local state
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req._id === requestId ? { ...req, status } : req
        )
      );

      // Show success message (you can customize this)
      alert(`Request ${status} successfully!`);
      
    } catch (err) {
      console.error(`Error ${status}ing request:`, err);
      alert(`Failed to ${status} request: ${err.message}`);
    } finally {
      // Remove loading state for this request
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };

  // Show error if user is not logged in
  if (!user?._id) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-semibold">Access Denied</p>
        <p className="text-red-600">You must be logged in as a club leader to view join requests.</p>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading join requests...</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-semibold">Error</p>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Incoming Join Requests</h1>
        <p className="text-gray-600">Manage membership requests for your clubs</p>
      </div>

      {clubs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">You are not a leader of any clubs.</p>
          <p className="text-gray-500 text-sm mt-2">Create a club to start receiving join requests.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No join requests found.</p>
          <p className="text-gray-500 text-sm mt-2">
            Managing {clubs.length} club{clubs.length !== 1 ? 's' : ''}: {clubs.map(c => c.name).join(', ')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-4 text-sm text-gray-600">
            Found {requests.length} request{requests.length !== 1 ? 's' : ''} across {clubs.length} club{clubs.length !== 1 ? 's' : ''}
          </div>

          {requests.map(req => (
            <div key={req._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Request Information */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {req.user?.username || 'Unknown User'}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Roll No:</span> {req.user?.rollNo}</p>
                        <p><span className="font-medium">Email:</span> {req.user?.email}</p>
                        <p><span className="font-medium">Department:</span> {req.user?.department}</p>
                        <p><span className="font-medium">Year:</span> {req.user?.year}</p>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          Club: {req.clubName}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Requested: {new Date(req.createdAt).toLocaleDateString()} at {new Date(req.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    : req.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>

                  {/* Action Buttons */}
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors ${
                          actionLoading[req._id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleAction(req._id, 'approved', req.clubId)}
                        disabled={actionLoading[req._id]}
                      >
                        {actionLoading[req._id] ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors ${
                          actionLoading[req._id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleAction(req._id, 'rejected', req.clubId)}
                        disabled={actionLoading[req._id]}
                      >
                        {actionLoading[req._id] ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubJoinRequests;