import axiosInstance from "../../utils/axiosInterceptor";
import { Comment, Post } from "./interface";

const url = "/api/post";

export const createPostAPI = async (data: FormData) => {
  return axiosInstance.post<{ post: Post }>(`${url}/create`, data);
};

export interface CreateCommentDTO {
  data: string;
  postId: string;
}

export const createCommentAPI = async (dto: CreateCommentDTO) => {
  console.log("dto : ", dto);

  return axiosInstance.post<{ comment: Comment }>(
    `/api/post/comment/${dto.postId}`,
    { body: dto.data }
  );
};

export const getPostsAPI = async () => {
  return axiosInstance.get<{ posts: Post[] }>(`${url}`);
};

export const getPostByIdAPI = async (postId: string) => {
  return axiosInstance.get<{ post: Post }>(`${url}/${postId}`);
};

export const likePostAPI = async (postId: string) => {
  return axiosInstance.post<{ post: Post }>(`${url}/like/${postId}`);
};

export const likeCommentAPI = async (commentId: string) => {
  return axiosInstance.post(`${url}/comment/like/${commentId}`);
};

export const deleteCommentAPI = async (commentId: string) => {
  return axiosInstance.delete(`${url}/comment/${commentId}`);
};

export const deletePostAPI = async (postId: string) => {
  return axiosInstance.delete(`${url}/${postId}`);
};

export const updatePostAPI = async (data: string, postId: string) => {
  return axiosInstance.put<{ post: Post }>(`${url}/${postId}`, data);
};

export const updateCommentAPI = async (data: string, commentId: string) => {
  return axiosInstance.put<{ comment: Comment }>(
    `${url}/comment/${commentId}`,
    data
  );
};
