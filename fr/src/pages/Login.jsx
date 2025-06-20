function Login()
{
  return (
    <div className=" p-10 px-40 bg-gradient-to-r from-pink-200 via-blue-300 to-pink-200 dark:bg-gradient-to-t dark:from-black dark:via-yellow-800 dark:to-black h-screen flex items-center justify-center">
      <div className="h-full w-full flex  bg-gradient-to-r from-pink-200 via-blue-300 to-pink-200 dark:bg-gradient-to-t dark:from-black dark:via-yellow-800 dark:to-black shadow-lg rounded-3xl p-5">
        <div className="flex items-center justify-center h-full w-[900px]">
                  <h1 class="text-3xl">Enroll in clubs for exiciting fun</h1>
          </div>
      <div className=" rounded-3xl h-full p-2 w-[500px] shadow-md shadow-gray-900  dark:bg-gray-900 justify-center flex ">
          <div class="toggle-container w-[150px] h-12 flex  p-2">
            <button class="text-2xl border-2 p-1 rounded-3xl bg-gradient-to-r from-purple-500 to-red-600 bg-clip-text text-transparent  toggle-btn active" onclick="showLogin()">Login</button>
            <button class="text-2xl bg-gradient-to-r from-purple-500 to-red-600 bg-clip-text text-transparent  toggle-btn" onclick="showRegister()">Register</button>
        </div>


      
      </div>
      </div>
      

    </div>
    
  );
}
export default Login;