import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

function Events({ user, clubs = [], clubsLoading = false }) {
  const isLeader = clubs.some(
    (club) => club.leader && club.leader._id === user?._id
  );
  const leaderClubs = clubs.filter(
    (club) => club.leader && club.leader._id === user?._id
  );

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    price: "",
    profilePhoto: "",
    club: leaderClubs[0]?._id || "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, profilePhoto: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (!form.title || !form.date || !form.club) {
      setError("Event name, date, and club are required.");
      setSaving(false);
      return;
    }

    try {
      const eventBody = {
  title: form.title,
  description: form.description,
  date: form.date + (form.time ? "T" + form.time : ""),
  time: form.time, // <-- send time separately
  price: form.price,
  profilePhoto: form.profilePhoto,
  club: form.club,
};
console.log("Sending eventBody:", eventBody);
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventBody),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");
      setSuccess("Event created successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        price: "",
        profilePhoto: "",
        club: leaderClubs[0]?._id || "",
      });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        Events
      </h1>
      <p className="text-lg text-gray-600 mb-4">No events available at the moment.</p>
      {isLeader && (
        <div className="mb-8 flex flex-col items-center">
          <button
            className="flex items-center gap-2 px-6 py-3 mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:from-blue-400 hover:to-green-500 transition-all"
            onClick={() => setShowForm(true)}
          >
            <PlusCircle className="h-6 w-6" />
            Create Event for Your Club
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <form
                className="bg-gradient-to-r from-blue-300 to-green-300 rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative border-4 border-blue-200 flex flex-col md:flex-row gap-8"
                onSubmit={handleSubmit}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Create Event</h2>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Club</label>
                    <select
                      name="club"
                      value={form.club}
                      onChange={handleInput}
                      className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                      required
                    >
                      {leaderClubs.map((club) => (
                        <option key={club._id} value={club._id}>
                          {club.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Event Name</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleInput}
                      className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleInput}
                        className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleInput}
                        className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInput}
                      className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                      rows={3}
                    />
                  </div>
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleInput}
                        className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
                        min="0"
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <label className="block font-semibold mb-1">Profile Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                        className="w-full"
                      />
                      {form.profilePhoto && (
                        <img
                          src={form.profilePhoto}
                          alt="Event"
                          className="w-28 h-28 object-cover rounded-full mt-2 border-4 border-blue-200"
                        />
                      )}
                    </div>
                  </div>
                  {error && <div className="text-red-500 mb-2">{error}</div>}
                  {success && <div className="text-green-600 mb-2">{success}</div>}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:from-blue-400 hover:to-green-500 transition-all"
                    disabled={saving}
                  >
                    {saving ? "Creating..." : "Create Event"}
                  </button>
                </div>
                <button
                  type="button"
                  className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-3xl font-bold"
                  onClick={() => setShowForm(false)}
                  aria-label="Close"
                >
                  <X />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Events;