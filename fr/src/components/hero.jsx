function Hero() {
  return (
    <div class="h-screen flex bg-gradient-to-t from-blue-50 to-blue-100 dark:bg-gradient-to-t dark:from-[#0f051022] dark:to-[#7b0acb]  ">       
    <div className="hero ml-[200px] mt-60 max-md:ml-20 max-sm:ml-0 w-[600px]">
      <h1
        className="text-[3rem] font-extrabold leading-[1.2] mb-6 bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent"
       >
        Manage Your Clubs With Efficiency
      </h1>
      <p class="text-[17px] text-gray-500">ClubWeb is a comprehensive solution for managing memberships, events, finances, and communications - all in one powerful platform.</p>
        <button className="shadow-md  shadow-gray-600 mt-8 px-6 py-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] text-white rounded-full hover:text-green-400 hover:bg-gradient-to-l from-blue-600 hover:to-pink-500 hover:shadow-purple-900 hover:shadow-lg  transition duration-300">
          Get Started
          </button>
          <a className=" px-6 py-2  text-gray-400 rounded-full hover:text-green-300 ">
          Learn More
          </a>
    </div>
    <div className="mt-[180px] ml-[100px] h-[450px] w-[450px] rounded-3xl p-8 shadow-lg shadow-gray-300 flex-row" >
      <div className="flex">
        <div className=" shadow w-[170px] h-[170px] rounded-lg p-4"><h1>vanakkam</h1></div>
      <div className="ml-10 shadow w-[170px] h-[170px] rounded-lg "></div>
      </div>
      <div className="flex mt-10">
        <div className=" shadow w-[170px] h-[170px] rounded-lg "></div>
      <div className="ml-10 shadow w-[170px] h-[170px] rounded-lg "></div>
      </div>
    </div>
    <div className="w-5 h-10 bg-gradient-to-t from-red-400 to-purple-300 absolute bottom-8 ml-[700px] animate-bounce rounded-3xl px-2 py-2"><p className="bg-lime-500 text-transparent">|</p></div>
    </div>

  );
}
export default Hero;