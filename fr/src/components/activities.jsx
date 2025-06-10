import React from 'react';

const activities = [
  {
    id: 1,
    title: "Sports Club",
    description: "Join our sports activities including football, basketball, and tennis.",
    icon: "🏃‍♂️",
    members: 45,
    upcoming: 3
  },
  {
    id: 2,
    title: "Music Band",
    description: "Express yourself through music with our talented band members.",
    icon: "🎸",
    members: 28,
    upcoming: 2
  },
  {
    id: 3,
    title: "Art Workshop",
    description: "Discover your artistic potential through various workshops.",
    icon: "🎨",
    members: 32,
    upcoming: 4
  },
  {
    id: 4,
    title: "Coding Club",
    description: "Learn programming and build exciting projects together.",
    icon: "💻",
    members: 38,
    upcoming: 2
  }
];

function Activities() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Club Activities
        </h1>
        <p className="text-gray-600 mt-4">Discover and join exciting activities in our community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6">
              <div className="text-4xl mb-4">{activity.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-2">👥</span>
                  {activity.members} members
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  {activity.upcoming} upcoming
                </span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                Join Activity
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-purple-600 hover:bg-purple-600 hover:text-white">
          View All Activities
        </button>
      </div>
    </div>
  );
}

export default Activities;