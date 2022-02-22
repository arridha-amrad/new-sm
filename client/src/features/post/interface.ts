import { Alert } from "../alert/interface";
import { User } from "../user/interface";

export interface Post {
  id: string;
  body: string;
  owner: User;
  images: string[];
  comments: string[];
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  post: string;
  body: string;
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostState {
  isLoading: boolean;
  posts: Post[];
  post: Post | null;
  alert: Alert | null;
}
