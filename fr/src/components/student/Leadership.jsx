import React, { useState } from "react";
import { Edit3, Users, Crown, Save, X, Upload, UserMinus } from "lucide-react";

const Leadership = ({ user, clubs = [], clubsLoading = false }) => {
  const [editClub, setEditClub] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  // Only show clubs where user is leader
  const leaderClubs = (clubs || []).filter(
    club => club.leader && club.leader._id === user?._id
  );

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
      const res = await fetch(`http://localhost:5000/api/clubs/${clubId}/members/${memberId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setClubs(prev => prev.map(c => c._id === clubId ? { ...c, members: c.members.filter(m => m._id !== memberId) } : c));
    } catch (err) { setError(err.message); }
    setDeletingMember(null);
  };

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
              {editClub === club._id ? (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Edit3 className="h-6 w-6 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Edit Club</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Club Name</label>
                        <input type="text" name="name" value={form.name || ""} onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
                        <div className="flex items-center gap-4">
                          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id={`photo-${club._id}`} />
                          <label htmlFor={`photo-${club._id}`} className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors">
                            <Upload className="h-4 w-4" /> Choose Photo
                          </label>
                          {form.profilePhoto && (
                            <img src={form.profilePhoto} alt="Club" className="w-16 h-16 rounded-full object-cover border-4 border-purple-200" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea name="description" value={form.description || ""} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors" rows={4} required />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => saveClub(club._id)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
                        disabled={saving}>
                        <Save className="h-4 w-4" />{saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button type="button" className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                        onClick={cancelEdit} disabled={saving}>
                        <X className="h-4 w-4" />Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
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
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Users className="h-6 w-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-800">Manage Members</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {club.members?.length || 0} members
                      </span>
                    </div>
                    {club.members && club.members.length > 0 ? (
                      <div className="grid gap-4">
                        {club.members.map(member => (
                          <div key={member._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {(member.username || member.email)?.charAt(0)?.toUpperCase() || "?"}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{member.username || "Unknown User"}</h4>
                                <p className="text-gray-600 text-sm">{member.email}</p>
                              </div>
                            </div>
                            <button onClick={() => deleteMember(club._id, member._id)}
                              disabled={deletingMember === member._id}
                              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50">
                              {deletingMember === member._id
                                ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                : <UserMinus className="h-4 w-4" />}
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h4 className="text-xl font-semibold text-gray-500 mb-2">No Members Yet</h4>
                        <p className="text-gray-400">Your club is waiting for its first members to join!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;