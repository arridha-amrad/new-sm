import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAction, selectUserState } from "./userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectUserState);
  const navigate = useNavigate();

  const onLogout = async () => {
    const result = await dispatch(logoutAction());
    if (result.meta.requestStatus === "fulfilled") {
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
  };
  return (
    <button disabled={isLoading} onClick={onLogout} className="btn btn-primary">
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default Logout;
