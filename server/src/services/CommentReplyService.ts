import CommentReplyModel from '../models/reply/ReplyModel';
import { AnyKeys } from 'mongoose';
import { ICommentReply } from '../models/reply/IReplyModel';

export const makeReply = async (data: AnyKeys<ICommentReply>) => {
  const newReply = new CommentReplyModel(data);
  return newReply.save();
};
