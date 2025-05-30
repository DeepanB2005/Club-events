import i1 from '../assets/react.svg';
function Navbar()
{
    return (
        <div class="flex p-4 bg-gradient-to-t from-[#95dcec] to-[#337aec] dark:bg-gradient-to-t dark:from-[#130acb] dark:to-[#1c0969] ">
            <div class="flex font-semibold bg-gradient-to-t from-[#6119f2] to-[#9744f1] dark:from-[#ed8ab5] dark:to-[#f21818] text-transparent bg-clip-text w-60 ml-40 max-md:ml-20 max-sm:ml-0">
                <img src={i1} alt="React Logo" class="mr-2"></img>
                <h1 class="text-3xl mt-1">CLUB-WEB</h1>
            </div>
            <div class="flex ml-80 mr-40 max-md:mr-20 max-sm:mr-0 font-semibold text-white text-lg hover:text-gray-300 transition duration-200">
                <a href='#' class="ml-6 mt-2 relative ml-6 mt- before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full">Features</a>
                <a href="#" class="ml-[50px] mt-2 ">Clubs</a>
                <a href="#" class="ml-[50px] mt-2">Events</a>
                <a href="#" class="ml-[50px] mt-2">About us</a>
                <button class="ml-[70px] px-4 py-1 bg-gradient-to-r from-[#7314f8] to-[#a60886] dark:from-[#ff006e] dark:to-[#8338ec] text-white rounded-lg hover:bg-gradient-to-t transition duration-300">
                Login</button>
            </div>
        </div>
    )
}
export default Navbar;