import { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logoutAction } from "./authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    const result = await dispatch(logoutAction());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
    setIsLoading(false);
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
