import { FaUserGraduate, FaChalkboardTeacher, FaTasks } from "react-icons/fa";

function Createclub()
{
  return (
    <div class="justify-center pt-20 flex ">
      <div class="shadow-2xl w-[800px] h-[600px]">
        <FaTasks className="text-4xl text-center mt-5 bg-red-600 rounded-lg" />
        <h1 class="text-3xl text-center mt-5">Create a club</h1>
        <form class="flex flex-col items-center mt-10">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubName">
              Club Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="clubName"
              type="text"
              placeholder="Enter club name"
            />
          </div>
          </form>
      </div>

    </div>
  )
}
export default Createclub;
