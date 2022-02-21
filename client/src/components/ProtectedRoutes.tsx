import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserState } from "../features/user/userSlice";

const ProtectedRoute = () => {
  const { isLoading, loginUser } = useAppSelector(selectUserState);

  return !isLoading && loginUser ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
