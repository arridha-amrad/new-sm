import axiosInstance from "../../utils/axiosInterceptor";
import { LoginDTO, RegisterDTO } from "./interface";

export const registerAPI = async (data: RegisterDTO) => {
  return axiosInstance.post<{ message: string }>("/api/auth/register", data);
};

export const loginAPI = async (data: LoginDTO) => {
  return axiosInstance.post("/api/auth/login", data);
};

export const refreshTokenAPI = async () => {
  return axiosInstance.get("/api/auth/refresh-token");
};

export const logoutAPI = async () => {
  return axiosInstance.post("/api/auth/logout");
};
