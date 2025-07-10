import React, { useState, useEffect, useMemo } from "react";
import { Edit3, Users, Crown, Save, X, Upload, UserMinus, CalendarDays, Trash2 } from "lucide-react";

const Leadership = ({ user, clubs = [], clubsLoading = false }) => {
  const [editClub, setEditClub] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  // Events management state
  const [clubEvents, setClubEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [editEventId, setEditEventId] = useState(null);
  const [eventForm, setEventForm] = useState({});
  const [eventSaving, setEventSaving] = useState(false);

  // Only show clubs where user is leader
  const leaderClubs = useMemo(
    () => (clubs || []).filter(
      club => club.leader && club.leader._id === user?._id
    ),
    [clubs, user?._id]
  );

  // Fetch all events for leader's clubs
  useEffect(() => {
    const fetchEvents = async () => {
      setEventsLoading(true);
      try {
        console.log("Fetching events for clubs:", leaderClubs.map(c => c._id));
        const allEvents = [];
        for (const club of leaderClubs) {
          const res = await fetch(`http://localhost:5000/api/events/club/${club._id}`);
          if (res.ok) {
            const data = await res.json();
            allEvents.push(...data);
          }
        }
        setClubEvents(allEvents);
      } catch {
        setClubEvents([]);
      }
      setEventsLoading(false);
    };
    if (leaderClubs.length > 0) fetchEvents();
    else setClubEvents([]);
  }, [leaderClubs]);

  const handleInputChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, profilePhoto: reader.result }));
    reader.readAsDataURL(file);
  };
  const startEdit = club => { setEditClub(club._id); setForm({ name: club.name, description: club.description, profilePhoto: club.profilePhoto }); setError(null); };
  const cancelEdit = () => { setEditClub(null); setForm({}); setError(null); };
  const saveClub = async clubId => {
    setSaving(true); setError(null);
    try {
      console.log(`Saving club ${clubId} with data:`, form);
      const res = await fetch(`http://localhost:5000/api/clubs/${clubId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setClubs(prev => prev.map(c => (c._id === clubId ? data.club : c)));
      setEditClub(null); setForm({});
    } catch (err) { setError(err.message); }
    setSaving(false);
  };
  const deleteMember = async (clubId, memberId) => {
    setDeletingMember(memberId);
    try {
      console.log(`Deleting member ${memberId} from club ${clubId}`);
      const res = await fetch(`http://localhost:5000/api/clubs/${clubId}/members/${memberId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setClubs(prev => prev.map(c => c._id === clubId ? { ...c, members: c.members.filter(m => m._id !== memberId) } : c));
    } catch (err) { setError(err.message); }
    setDeletingMember(null);
  };

  // --- Manage Events Section ---
  const startEditEvent = (event) => {
    setEditEventId(event._id);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : "",
      time: event.date ? new Date(event.date).toISOString().slice(11, 16) : "",
      price: event.price || "",
      profilePhoto: event.profilePhoto || "",
    });
  };
  const cancelEditEvent = () => {
    setEditEventId(null);
    setEventForm({});
  };
  const handleEventInput = e => setEventForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEventPhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setEventForm(f => ({ ...f, profilePhoto: reader.result }));
    reader.readAsDataURL(file);
  };
  const saveEvent = async (eventId, clubId) => {
    setEventSaving(true);
    try {
      let eventDateTime = eventForm.date;
      if (eventForm.time) {
        eventDateTime = `${eventForm.date}T${eventForm.time}:00`;
      }
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventForm.title,
          description: eventForm.description,
          date: eventDateTime,
          price: eventForm.price,
          profilePhoto: eventForm.profilePhoto,
          club: clubId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setClubEvents(prev => prev.map(ev => (ev._id === eventId ? data.event : ev)));
      setEditEventId(null);
      setEventForm({});
    } catch (err) {
      setError(err.message);
    }
    setEventSaving(false);
  };
  const deleteEvent = async (eventId) => {
    setEventSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setClubEvents(prev => prev.filter(ev => ev._id !== eventId));
    } catch (err) {
      setError(err.message);
    }
    setEventSaving(false);
  };

  // --- End Manage Events Section ---

  if (clubsLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="text-xl font-semibold text-gray-700">Loading your clubs...</span>
        </div>
      </div>
    );

  if (leaderClubs.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <Crown className="h-16 w-16 mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Leadership Roles</h2>
          <p className="text-gray-500">You are not currently leading any clubs.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen  py-6">
      <div className="max-w-7xl mx-auto px-32">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-10 w-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Leadership Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your clubs and members with ease</p>
        </div>
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <X className="h-5 w-5 text-red-500" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
        <div className="space-y-8">
          {leaderClubs.map(club => (
            <div key={club._id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* ...existing club management code... */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white font-ft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {club.profilePhoto ? (
                      <img src={club.profilePhoto} alt={club.name}
                        className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg" />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 text-3xl font-bold border-4 border-white">
                        {club.name?.charAt(0) || "?"}
                      </div>
                    )}
                    <div>
                      <h2 className="text-3xl bg-gradient-to-b from-yellow-300  to-green-200 text-transparent bg-clip-text font-bold mb-2">{club.name}</h2>
                      <p className="text-purple-100 text-lg">{club.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Crown className="h-4 w-4" />
                        <span className="text-sm">Led by {club.leader?.username || club.leader?.email}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-colors"
                    onClick={() => startEdit(club)}>
                    <Edit3 className="h-4 w-4" />Edit Club
                  </button>
                </div>
              </div>
              {/* ...members management code... */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Manage Members</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {club.members?.length || 0} members
                  </span>
                </div>
                {/* ...members list code... */}
              </div>
              {/* --- Manage Events Section --- */}
              <div className="px-8 pb-8">
                <div className="flex items-center gap-3 mb-6 mt-8">
                  <CalendarDays className="h-6 w-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Manage Events</h3>
                </div>
                {eventsLoading ? (
                  <div className="text-lg text-gray-500">Loading events...</div>
                ) : (
                  <div className="grid gap-6">
                    {clubEvents.filter(ev => ev.club?._id === club._id).length === 0 ? (
                      <div className="text-gray-400 italic">No events for this club.</div>
                    ) : (
                      clubEvents.filter(ev => ev.club?._id === club._id).map(event => (
                        <div key={event._id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow flex flex-col md:flex-row items-center gap-6 p-6 border border-green-200">
                          {editEventId === event._id ? (
                            <form className="flex-1 flex flex-col md:flex-row gap-6 items-center" onSubmit={e => { e.preventDefault(); saveEvent(event._id, club._id); }}>
                              <div className="flex flex-col items-center">
                                <input type="file" accept="image/*" onChange={handleEventPhoto} className="mb-2" />
                                {eventForm.profilePhoto ? (
                                  <img src={eventForm.profilePhoto} alt="Event" className="w-20 h-20 object-cover rounded-full border-4 border-green-200" />
                                ) : (
                                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-green-200 text-2xl text-white font-bold border-4 border-green-200">
                                    {eventForm.title?.charAt(0) || "?"}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="title" value={eventForm.title || ""} onChange={handleEventInput} placeholder="Event Name" className="px-3 py-2 rounded-lg border border-blue-200" required />
                                <input type="date" name="date" value={eventForm.date || ""} onChange={handleEventInput} className="px-3 py-2 rounded-lg border border-blue-200" required />
                                <input type="time" name="time" value={eventForm.time || ""} onChange={handleEventInput} className="px-3 py-2 rounded-lg border border-blue-200" />
                                <input type="number" name="price" value={eventForm.price || ""} onChange={handleEventInput} placeholder="Price" className="px-3 py-2 rounded-lg border border-blue-200" min="0" />
                                <textarea name="description" value={eventForm.description || ""} onChange={handleEventInput} placeholder="Description" className="px-3 py-2 rounded-lg border border-blue-200 col-span-2" rows={2} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600" disabled={eventSaving}>
                                  {eventSaving ? "Saving..." : "Save"}
                                </button>
                                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500" onClick={cancelEditEvent} disabled={eventSaving}>
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
                              {event.profilePhoto ? (
                                <img src={event.profilePhoto} alt={event.title} className="w-20 h-20 object-cover rounded-full border-4 border-green-200" />
                              ) : (
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-green-200 text-2xl text-white font-bold border-4 border-green-200">
                                  {event.title?.charAt(0) || "?"}
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-green-700">{event.title}</h4>
                                <div className="text-gray-600 mb-1">{event.description}</div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  <span>
                                    <span className="font-semibold text-blue-600">Date:</span>{" "}
                                    {event.date ? new Date(event.date).toLocaleString() : "N/A"}
                                  </span>
                                  {event.price && (
                                    <span>
                                      <span className="font-semibold text-yellow-600">Price:</span> ₹{event.price}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600" onClick={() => startEditEvent(event)}>
                                  Edit
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center gap-1" onClick={() => deleteEvent(event._id)} disabled={eventSaving}>
                                  <Trash2 className="h-4 w-4" /> Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {/* --- End Manage Events Section --- */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;