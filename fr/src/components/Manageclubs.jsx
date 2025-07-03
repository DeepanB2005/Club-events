import React from 'react';
//Shows all the clubs
import { useState, useEffect } from 'react';
import { LucideAlertTriangle } from 'lucide-react';

function ManageClubs() {
  return (
    <div>
      <div className="flex items-center justify-center font-ft p-20 flex-col">
        <h1 className="text-3xl font-bold bg-gradient-to-t from-yellow-500 to-red-500 bg-clip-text text-transparent">Manage Clubs</h1>

        <div className="flex items-center justify-center  h-[500px] w-[500px] bg-blue-300 rounded-3xl">
        </div>
      </div>
    </div>
  );
}
export default ManageClubs;