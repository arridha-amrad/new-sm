import { Alert } from "../alert/interface";
import { IComment } from "../comment/interface";
import { User } from "../user/interface";

export interface Post {
  _id: string;
  body: string;
  owner: User;
  images: string[];
  comments: IComment[];
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
  isEdit: boolean;
}

export interface PostState {
  isLoading: boolean;
  posts: Post[];
  post: Post | null;
  alert: Alert | null;
}

export interface UpdatePostDTO {
  body: string;
  postId: string;
}
