import ReplyModel from '../models/reply/ReplyModel';
import { AnyKeys } from 'mongoose';
import { IReplyModel } from '../models/reply/IReplyModel';

export const makeReply = async (data: AnyKeys<IReplyModel>) => {
  const newReply = new ReplyModel(data);
  const reply = await newReply.save();
  const populatedReply = await reply.populate('sender', 'username avatarURL');
  return populatedReply;
};

export const deleteReply = async (replyId: string) => {
  return ReplyModel.findByIdAndDelete(replyId);
};

export const findOneReply = async (replyId: string) => {
  return ReplyModel.findById(replyId);
};
