import { Alert } from "../alert/interface";
import { User } from "../user/interface";

export interface Comment {
  _id: string;
  owner: User;
  post: string;
  body: string;
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentState {
  comments: Comment[];
  comment: Comment | null;
  isLoadingComment: boolean;
  isFetchingComment: boolean;
  alert: Alert | null;
}

export interface CreateCommentDTO {
  data: string;
  postId: string;
}

export interface DeleteCommentDTO {
  postId: string;
  commentId: string;
}
