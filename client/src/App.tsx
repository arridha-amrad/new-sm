import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import ProtectedRoute from "./components/ProtectedRoutes";
import EmailConfirmation from "./features/authentication/EmailConfirmation";
import {
  setLoginUser,
  unsetLoading,
} from "./features/authentication/authSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axiosInstance, { setToken } from "./utils/axiosInterceptor";

const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/refresh-token");
        setToken(res.data.token);
        const { data } = await axiosInstance.get("/api/user/me");
        dispatch(setLoginUser(data.user));
        dispatch(unsetLoading());
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
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
      <Route path="/email-confirmation" element={<EmailConfirmation />} />
    </Routes>
  );
};

export default App;
