import { IComment } from "../comment/interface";
import { User } from "../authentication/interface";

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
  isFetchingPosts: boolean;
  posts: Post[];
  post: Post | null;
}

export interface UpdatePostDTO {
  body: string;
  postId: string;
}
