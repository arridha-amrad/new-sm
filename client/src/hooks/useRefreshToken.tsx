import axios from "../api/axios";
import { store } from "../app/store";
import { setToken } from "../features/user/userSlice";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh-token", {
      withCredentials: true,
    });
    console.log("useRefreshToken result : ", response.data);

    store.dispatch(setToken(response.data.token));
    return response.data.token as string;
  };
  return refresh;
};

export default useRefreshToken;
