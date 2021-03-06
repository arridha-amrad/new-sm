import axiosInstance from "../../utils/axiosInterceptor";
import { INotification } from "../authentication/interface";
import { Post, UpdatePostDTO } from "./interface";

const url = "/api/post";

export const createPostAPI = async (data: FormData) => {
  return axiosInstance.post<{ post: Post }>(`${url}/create`, data);
};

export const getPostsAPI = async () => {
  return axiosInstance.get<{ posts: Post[] }>(`${url}`);
};

export const getPostByIdAPI = async (postId: string) => {
  return axiosInstance.get<{ post: Post }>(`${url}/${postId}`);
};

export const likePostAPI = async (postId: string) => {
  return axiosInstance.post<{ post: Post; notification: INotification }>(
    `${url}/like/${postId}`
  );
};

export const deletePostAPI = async (postId: string) => {
  return axiosInstance.delete(`${url}/${postId}`);
};

export const updatePostAPI = async (dto: UpdatePostDTO) => {
  return axiosInstance.put<{ post: Post }>(`${url}/${dto.postId}`, {
    body: dto.body,
  });
};
