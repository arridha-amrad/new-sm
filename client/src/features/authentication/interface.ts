import { IComment } from "../comment/interface";
import { Post } from "../post/interface";
import { ReplyComment } from "../replyComment/interface";

export enum NotificationType {
  LIKE_POST = "likePost",
  LIKE_COMMENT = "likeComment",
  LIKE_REPLY = "likeReply",
  COMMENT_POST = "commentPost",
  REPLY_COMMENT = "replyComment",
}

export interface INotification {
  _id: string;
  type: NotificationType;
  post?: Post;
  body?: string;
  comment?: IComment;
  reply?: ReplyComment;
  owner: User;
  sender: User[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export interface LoginDTO {
  identity: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  avatarURL: string;
  fullName?: string;
}

export interface AuthState {
  loginUser: User | null;
  isLoadingAuth: boolean;
  notifications: INotification[];
}
