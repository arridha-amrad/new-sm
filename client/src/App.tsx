import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ProtectedRoute from "./components/ProtectedRoutes";
import {
  setLoginUser,
  setNotifications,
} from "./features/authentication/authSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axiosInstance, { setToken } from "./utils/axiosInterceptor";
import { io } from "socket.io-client";
import { getSocket, setSocket } from "./mySocket";

const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const socket = getSocket();

  useEffect(() => {
    let isMounted = true;
    const socketIo = io("http://localhost:5000");

    console.log("socketIO : ", socketIo);

    setSocket(socketIo);
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/refresh-token");
        setToken(res.data.token);
        const { data } = await axiosInstance.get("/api/user/me");
        dispatch(setLoginUser(data.user));
        dispatch(setNotifications(data.notifications));
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
      socket?.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
