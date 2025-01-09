import React, { useContext } from "react";
import { Context } from "../main.jsx";

const Profile = () => {
  const { tasks, user } = useContext(Context);
  const completedTaskCount = tasks.filter((task) => task.isCompleted).length;
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{user.name}</h1>

          <p className="text-sm text-gray-600">{user.email}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Task Summary
          </h2>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="text-lg">Tasks Completed</span>
              <span className="text-2xl font-bold">{completedTaskCount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg">Total Tasks</span>
              <span className="text-2xl font-bold">{tasks.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
