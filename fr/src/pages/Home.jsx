import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Activities from "../components/activities";  
function Home() {
    return (
        <div className="text-white font-ft bg-gradient-to-r from-blue-200 to-purple-100 dark:bg-gradient-to-t dark:from-[#0f051022] dark:to-[#7b0acb]   dark:bg-blue-950 ">
            <Navbar/>
            <Hero/>
            <Activities/>
        </div>
    );
}
export default Home;