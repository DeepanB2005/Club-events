import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import {
  MdGroups,
  MdEventAvailable,
  MdAnnouncement,
  MdWorkspacePremium,
  MdLeaderboard,
  MdEmojiEvents,
  MdAdminPanelSettings,
} from "react-icons/md";

function Createclub()
{
const [studentNames, setStudentNames] = useState([]);

useEffect(() => {
  fetch('/students/usernames')
    .then(res => res.json())
    .then(data => setStudentNames(data))
    .catch(() => setStudentNames([]));
}, []);

  return (
    <div class="flex justify-center items-center p-10 font-ft flex-col">
      <div class="flex flex-col items-center"> 
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#4361ee] to-[#f72585] rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
       </div>
          <h1 className="text-4xl ml-5 font-bold bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent mb-2">
             Create Your Club
          </h1>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-5">
            Build a community around your passion
          </p>


      <div class="shadow-2xl w-[700px] h-[500px] mt-5 pt-14 pl-4 rounded-2xl bg-gradient-to-r from-blue-200 to-violet-200 justify-center items-center ">
        
        <form class="flex flex-col pl-10">

          <div class="mb-4">
            <div class="w-[80px]">
            <label for="profilePhoto" class="cursor-pointer">
            <div class="w-24 h-24 rounded-full bg-gradient-to-r from-[#4361ee] to-[#f72585] p-1 shadow-lg ml-20">
            <input type="file"  id="profilePhoto" accept="image/*" class="hidden" />

              <div class="w-full h-full rounded-full bg-violet-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d
                    ="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            </label>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-20">Click to upload</p>
            
           
          

            <label class="block text-gray-700 text-lg font-bold mb-2 mt-5">
              Club Name
            </label>
            <input
              class="shadow appearance-none border w-60 rounded-2xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="clubName"
              type="text"
              placeholder="Enter club name"
            />
            <label class="block text-gray-700 text-lg font-bold mt-5 mb-2">
              Select Leader
            </label>
            <select class="shadow appearance-none border rounded-2xl h-9 w-60 p-1 text-gray-400 leading-tight shadow-md pl-3  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a student</option>
              {studentNames.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </select>
          </div>
          </form>
      </div>

    </div>
  )
}
export default Createclub;



