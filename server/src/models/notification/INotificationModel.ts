import { Types } from 'mongoose';
import { IUserModel } from '../user/IUserModel';

export enum NotificationType {
  LIKE_POST = 'likePost',
  LIKE_COMMENT = 'likeComment',
  LIKE_REPLY = 'likeReply',
  COMMENT_POST = 'commentPost',
  REPLY_COMMENT = 'replyComment',
}

export interface INotificationModel {
  type: NotificationType;
  post: Types.ObjectId;
  body: string;
  comment: Types.ObjectId;
  reply: Types.ObjectId;
  owner: Types.ObjectId;
  sender: Types.DocumentArray<IUserModel>;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
