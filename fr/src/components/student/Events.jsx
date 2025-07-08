import { PlusCircle } from "lucide-react";

function Events({ user, clubs = [], clubsLoading = false }) {
  const isLeader = clubs.some(
    (club) => club.leader && club.leader._id === user?._id
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Events</h1>
      <p className="text-lg text-gray-600 mb-4">No events available at the moment.</p>
      {isLeader && (
        <button
          className="flex items-center gap-2 px-6 py-3 mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:from-blue-400 hover:to-green-500 transition-all"
        >
          <PlusCircle className="h-6 w-6" />
          Create Event for Your Club
        </button>
      )}
    </div>
  );
}
export default Events;