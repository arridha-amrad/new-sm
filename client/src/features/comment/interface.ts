import { Alert } from "../alert/interface";
import { User } from "../user/interface";

export interface CommentReply {
  owner: User;
  comment: Comment;
  body: string;
  likes: User[];
  createdAt: string;
  updatedAt: string;
}

export interface SetCommentReply {
  reply: CommentReply;
  commentIndex: number;
  postIndex: number;
}

export interface Comment {
  _id: string;
  owner: User;
  post: string;
  body: string;
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
  isShowInput: boolean;
  replies: CommentReply[];
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

export interface LikeComment {
  comment: Comment;
  isLiked: boolean;
  user: User;
}

export interface UnsetReplyCommentForm {
  commentIndex: number;
  comment: Comment;
}
