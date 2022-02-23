import axiosInstance from "../../utils/axiosInterceptor";
import { Post } from "./interface";

export const createPostAPI = async (data: FormData) => {
  return axiosInstance.post<{ post: Post }>("/api/post/create", data);
};

export const getPostsAPI = async () => {
  return axiosInstance.get<{ posts: Post[] }>("/api/post");
};
