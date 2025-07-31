import Navbar from "../components/home/navbar";
import Hero from "../components/home/hero";
import Activities from "../components/home/activities";  
import ClubsShowcase from "../components/home/clubs";
import EventsShowcase from "../components/home/events"
import Aniruth from "../components/bacAni"
function Home() {
  return (
         <div className="text-white font-ft bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-r dark:from-black dark:via-yellow-900 dark:to-black">
              <Aniruth />
              <Navbar />
      
      <div className="absolute top-72 left-10 w-3 h-3 bg-purple-400 dark:bg-purple-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-pulse opacity-30 shadow-lg"></div>
      <div className="absolute bottom-60 right-10 w-16 h-16 bg-gradient-to-r from-pink-300 to-red-300 rounded-full animate-bounce opacity-40 shadow-lg"></div>
      <div className="absolute top-96 left-1/4 w-12 h-12 bg-gradient-to-r from-green-300 to-blue-300 rounded-full animate-spin opacity-30"></div>
      
      <Hero />
      <Activities />
      <ClubsShowcase />
      <EventsShowcase />
      
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">ClubSync</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Empowering clubs worldwide with innovative management solutions. 
              Join the revolution of efficient club operations.
            </p>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">© 2024 ClubWeb. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

// function Home() {
//     return (
//         <div className="text-white font-ft bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-r dark:from-black dark:via-yellow-900 dark:to-black">
//             <Navbar/>
//             <div className=" absolute top-72 left-10 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-float opacity-60"></div>
//             <div class="floating-circle circle-1 absolute top-40 opacity-50 shadow-md shadow-gray-400 bg-red-300 w-20 h-20 rounded-full animate-float duration-150"></div>
//             <div class="floating-circle circle-1 absolute bottom-60 right-10 opacity-50 shadow-md shadow-gray-400 bg-blue-300 w-20 h-20 rounded-full animate-float"></div>
//             <div class="floating-circle circle-1 absolute top-96 opacity-50 shadow-md shadow-gray-400 bg-green-300 w-20 h-20 rounded-full animate-spin transition-colors "></div>
//             <Hero/>
//             <Activities/>
//         </div>
//     );
// }