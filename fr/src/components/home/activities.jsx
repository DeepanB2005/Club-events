// Enhanced Activities Component with Modern Attractive Design
function Activities() {
  const features = [
    {
      icon: "👥",
      title: "Member Management",
      description: "Effortlessly manage member profiles, track attendance, and handle membership renewals with automated notifications.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📅",
      title: "Event Planning",
      description: "Create, schedule, and manage events with RSVP tracking, automated reminders, and seamless communication tools.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "💰",
      title: "Financial Tracking",
      description: "Monitor club finances, track dues, manage expenses, and generate detailed financial reports with ease.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "📊",
      title: "Analytics & Reports",
      description: "Get actionable insights with detailed analytics on membership trends, event success, and financial performance.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "💬",
      title: "Communication Hub",
      description: "Send targeted messages, newsletters, and announcements to specific member groups or your entire club.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with data encryption, regular backups, and 99.9% uptime guarantee for peace of mind.",
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">✨</span>
            </div>
          </div>
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to run a successful club, beautifully designed and incredibly simple to use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {feature.description}
              </p>
              
              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </div>
  );
}

export default Activities;