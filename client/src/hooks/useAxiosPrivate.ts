import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "../app/hooks";
import { selectUserState } from "../features/user/userSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { token } = useAppSelector(selectUserState);

  useEffect(() => {
    console.log("token : ", token);

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!["Authorization"]) {
          config.headers!["Authorization"] = token!;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = newToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
