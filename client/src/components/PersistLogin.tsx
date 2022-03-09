import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUserState, setLoginUser } from "../features/user/userSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { token } = useAppSelector(selectUserState);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getLoginUser = async () => {
      try {
        const { data } = await axiosPrivate.get("/api/user/me");
        dispatch(setLoginUser(data.user));
      } catch (err) {
        console.log(err);
      }
    };
    getLoginUser();
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(token)}`);
    // eslint-disable-next-line
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
