import axiosInstance from "../../utils/axiosInterceptor";
import { CreateCommentDTO, IComment } from "./interface";

const url = "/api/post";

export const createCommentAPI = async (dto: CreateCommentDTO) => {
  console.log("dto : ", dto);

  return axiosInstance.post<{ comment: IComment }>(
    `/api/post/comment/${dto.postId}`,
    { body: dto.data }
  );
};

export const likeCommentAPI = async (commentId: string) => {
  return axiosInstance.post<{ comment: IComment }>(
    `${url}/comment/like/${commentId}`
  );
};

export const deleteCommentAPI = async (commentId: string) => {
  return axiosInstance.delete(`${url}/comment/${commentId}`);
};

export const updateCommentAPI = async (data: string, commentId: string) => {
  return axiosInstance.put<{ comment: IComment }>(
    `${url}/comment/${commentId}`,
    data
  );
};
