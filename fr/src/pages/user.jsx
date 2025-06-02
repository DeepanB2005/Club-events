import React from "react";

const sidebarLinks = [
  { name: "Dashboard", icon: "🏠" },
  { name: "Events", icon: "📅" },
  { name: "Members", icon: "👥" },
  { name: "Profile", icon: "🙍‍♂️" },
  { name: "Settings", icon: "⚙️" },
];

export default function UserDashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "linear-gradient(135deg, #4f8cff 60%, #3358e0 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "32px 0",
          boxShadow: "2px 0 16px rgba(79,140,255,0.1)",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 28, textAlign: "center", marginBottom: 40, letterSpacing: 1 }}>
          Club<span style={{ color: "#ffd700" }}>Events</span>
        </div>
        <nav style={{ flex: 1 }}>
          {sidebarLinks.map((link) => (
            <div
              key={link.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 32px",
                fontSize: 18,
                cursor: "pointer",
                borderRadius: 8,
                margin: "8px 16px",
                transition: "background 0.2s",
                userSelect: "none",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseOut={e => (e.currentTarget.style.background = "none")}
            >
              <span style={{ fontSize: 22, marginRight: 16 }}>{link.icon}</span>
              {link.name}
            </div>
          ))}
        </nav>
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 14, opacity: 0.7 }}>
          &copy; 2025 ClubEvents
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "48px 40px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 32px rgba(79,140,255,0.08)",
            padding: "40px 32px",
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#3358e0", marginBottom: 8 }}>
            Welcome back, User!
          </h1>
          <p style={{ fontSize: 18, color: "#555", marginBottom: 24 }}>
            Here’s what’s happening in your club today.
          </p>
          <div style={{ display: "flex", gap: 32, width: "100%" }}>
            {/* Example Stat Cards */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(120deg, #ffd700 60%, #fffbe6 100%)",
                borderRadius: 14,
                padding: 24,
                boxShadow: "0 2px 12px rgba(255,215,0,0.08)",
                color: "#333",
                fontWeight: 600,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 36, marginBottom: 8 }}>📅</span>
              3 Upcoming Events
            </div>
            <div
              style={{
                flex: 1,
                background: "linear-gradient(120deg, #4f8cff 60%, #e6f0ff 100%)",
                borderRadius: 14,
                padding: 24,
                boxShadow: "0 2px 12px rgba(79,140,255,0.08)",
                color: "#333",
                fontWeight: 600,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 36, marginBottom: 8 }}>👥</span>
              120 Members
            </div>
            <div
              style={{
                flex: 1,
                background: "linear-gradient(120deg, #ff7eb3 60%, #ffe6f0 100%)",
                borderRadius: 14,
                padding: 24,
                boxShadow: "0 2px 12px rgba(255,126,179,0.08)",
                color: "#333",
                fontWeight: 600,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 36, marginBottom: 8 }}>⭐</span>
              5 New Members
            </div>
          </div>
          {/* Add more dashboard widgets here */}
        </div>
      </main>
    </div>
  );
}