import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Activities from "../components/activities";  
function Home() {
    return (
        <div className="text-white font-ft bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-r dark:from-black dark:via-yellow-900 dark:to-black">
            <Navbar/>
            <div className=" absolute top-72 left-10 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-float opacity-60"></div>
            <div class="floating-circle circle-1 absolute top-40 opacity-50 shadow-md shadow-gray-400 bg-red-300 w-20 h-20 rounded-full animate-float duration-150"></div>
            <div class="floating-circle circle-1 absolute bottom-60 right-10 opacity-50 shadow-md shadow-gray-400 bg-blue-300 w-20 h-20 rounded-full animate-float"></div>
            <div class="floating-circle circle-1 absolute top-96 opacity-50 shadow-md shadow-gray-400 bg-green-300 w-20 h-20 rounded-full animate-spin transition-colors "></div>
            <Hero/>
            <Activities/>
        </div>
    );
}
export default Home;