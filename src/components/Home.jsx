import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main.jsx";
import TodoItem from "./TodoItem.jsx";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/newTask`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prevState) => !prevState);
    } catch (e) {
      toast.success(e.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/task/myTask`, { withCredentials: true })
      .then((res) => setTasks(res.data.task))
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  const handleToggle = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success("Task updated successfully");
      setRefresh((prevState) => !prevState);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success("Task deleted successfully");
      setRefresh((prevState) => !prevState);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  if (!isAuthenticated) return <Navigate to={`/login`} />;
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add New Task
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter task title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Description
              </label>
              <textarea
                id="description"
                placeholder="Enter task description"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-lg focus:outline-none"
              disabled={loading}
            >
              Add Task
            </button>
          </form>
        </div>
        <section className={`w-full`}>
          {tasks.map((item) => (
            <TodoItem
              title={item.title}
              description={item.description}
              isCompleted={item.isCompleted}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              id={item._id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
