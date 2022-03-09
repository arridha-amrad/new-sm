import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import PersistLogin from "./components/PersistLogin";
import ProtectedRoute from "./components/ProtectedRoutes";
import EmailConfirmation from "./features/user/EmailConfirmation";
import { getLoginUserAPI } from "./features/user/userApi";
import { setLoginUser } from "./features/user/userSlice";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const axiosPrivate = useAxiosPrivate();

  // const fetchUser = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axiosPrivate.get("/api/user/me");
  //     console.log("data : ", data);

  //     if (isMounted) {
  //       dispatch(setLoginUser(data.user));
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  //   return () => setIsMounted(false);
  //   // eslint-disable-next-line
  // }, []);

  // if (isLoading) {
  //   return <p>loading...</p>;
  // }

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-confirmation" element={<EmailConfirmation />} />
    </Routes>
  );
};

export default App;
