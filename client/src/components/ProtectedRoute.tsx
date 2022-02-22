import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserState } from "../features/user/userSlice";
import AppBar from "./AppBar";

const ProtectedRoute = () => {
  const { loginUser } = useAppSelector(selectUserState);
  return loginUser ? (
    <>
      <AppBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
