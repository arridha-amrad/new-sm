import axiosInstance from "../../utils/axiosInterceptor";
import { LoginDTO, RegisterDTO } from "./interface";

const url = "/api/auth";

export const registerAPI = async (data: RegisterDTO) => {
  return axiosInstance.post<{ message: string }>(`${url}/register`, data);
};

export const loginAPI = async (data: LoginDTO) => {
  return axiosInstance.post(`${url}/login`, data);
};

export const refreshTokenAPI = async () => {
  return axiosInstance.get(`${url}/refresh-token`);
};

export const logoutAPI = async () => {
  return axiosInstance.post(`${url}/logout`);
};

export const setNotificationReadAPI = async (notificationIds: string[]) => {
  return axiosInstance.put("/api/notification/mark-read", { notificationIds });
};
