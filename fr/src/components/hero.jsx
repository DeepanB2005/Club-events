function Hero() {
  return (
    <div class="mt-auto flex bg-gradient-to-t from-[#95dcec] to-[#337aec] dark:bg-gradient-to-t dark:from-[#130acb] dark:to-[#1c0969] ">       
    <div className="hero ml-[200px] mt-40 max-md:ml-20 max-sm:ml-0 w-[600px]">
      <h1
        className="text-[3rem] font-extrabold leading-[1.2] mb-6 bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent"
      >
        Manage Your Clubs With Efficiency
      </h1>
      <p class="text-[19px] text-gray-400">ClubHub is a comprehensive solution for managing memberships, events, finances, and communications - all in one powerful platform.</p>
        <button className="mt-8 px-6 py-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] text-white rounded-full hover:text-green-400 bg-gradient-to-t transition duration-300">
          Get Started
          </button>
          <button className="ml-4 px-6 py-2  text-gray-400 rounded-full hover:text-green-300 ">
          Learn More
            </button>
    </div>
    <div className="mt-20 w-100 h-100 bg-red-900">
    </div>
    </div>

  );
}
export default Hero;