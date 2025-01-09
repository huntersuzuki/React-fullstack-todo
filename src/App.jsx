import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context, server } from "./main.jsx";
import axios from "axios";

function App() {
  const { setUser, setIsAuthenticates, setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticates(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticates(false);
        setLoading(false);
      });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/profile`} element={<Profile />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
