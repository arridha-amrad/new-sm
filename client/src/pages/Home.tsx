import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/AppBar";
import { selectUserState } from "../features/user/userSlice";
import Login from "./Login";

const Home = () => {
  const { loginUser } = useAppSelector(selectUserState);
  const checkIsAuth = localStorage.getItem("isAuthenticated");
  const [isLogin, setIsLogin] = useState(false);
  const [isMounted, setMounted] = useState(true);

  useEffect(() => {
    if (checkIsAuth) {
      const isAuthenticated = JSON.parse(checkIsAuth);
      if (isMounted && isAuthenticated) {
        setIsLogin(true);
      }
    }
    return () => setMounted(false);
  }, [isLogin]);

  if (!isLogin) {
    return <Login />;
  } else {
    return <Navbar />;
  }
};

export default Home;
