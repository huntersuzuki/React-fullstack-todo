import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createContext } from "react";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export const server = "https://nodejs-todoapp-staj.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get(`${server}/task/myTask`, { withCredentials: true })
      .then((res) => setTasks(res.data.task))
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticates,
        loading,
        setLoading,
        user,
        setUser,
        tasks,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
