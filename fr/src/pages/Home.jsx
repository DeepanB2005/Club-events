import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Activities from "../components/activities";  
function Home() {
    return (
        <div className="text-white font-ft bg-white dark:bg-blue-950 ">
            <Navbar/>
            <Hero/>
            <Activities/>
        </div>
    );
}
export default Home;