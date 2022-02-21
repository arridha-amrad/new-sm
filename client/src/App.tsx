import { useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import EmailConfirmation from "./features/user/EmailConfirmation";
import { getLoginUserAPI } from "./features/user/userApi";
import { setLoginUser } from "./features/user/userSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isMounted, setIsMounted] = useState(true);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated && JSON.parse(isAuthenticated)) {
      getLoginUserAPI().then(({ data }) => {
        if (isMounted) {
          dispatch(setLoginUser(data.user));
        }
      });
    }
    return () => setIsMounted(false);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-confirmation" element={<EmailConfirmation />} />
    </Routes>
  );
};

export default App;
