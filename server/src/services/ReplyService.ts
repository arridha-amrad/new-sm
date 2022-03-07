import ReplyModel from '../models/reply/ReplyModel';
import { AnyKeys } from 'mongoose';
import { IReplyModel } from '../models/reply/IReplyModel';

export const makeReply = async (data: AnyKeys<IReplyModel>) => {
  const newReply = new ReplyModel(data);
  return newReply.save();
};

export const deleteReply = async (replyId: string) => {
  return ReplyModel.findByIdAndDelete(replyId);
};

export const findOneReply = async (replyId: string) => {
  return ReplyModel.findById(replyId);
};
