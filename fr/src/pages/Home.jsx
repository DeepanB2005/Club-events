import Navbar from "../components/navbar";
import Hero from "../components/hero";
function Home() {
    return (
        <div className="text-white font-ft bg-white dark:bg-blue-950 ">
            <Navbar/>
            <Hero/>
        </div>
    );
}
export default Home;