import { Request, Response } from 'express';
import { findOneComment } from '../services/CommentService';
import { deleteReply, findOneReply, makeReply } from '../services/ReplyService';

export const createReply = async (req: Request, res: Response) => {
  const { body, receiver } = req.body;
  const { commentId } = req.params;

  try {
    const newReply = await makeReply({
      body,
      comment: commentId,
      receiver,
      sender: req.userId,
    });
    const comment = await findOneComment(commentId);
    if (comment) {
      comment.replies.push(newReply);
      await comment.save();
    }
    return res.status(200).json({ reply: newReply });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const removeReply = async (req: Request, res: Response) => {
  const { replyId } = req.params;
  const loginUser = req.userId;
  try {
    const reply = await findOneReply(replyId);
    if (reply) {
      if (reply.sender.toString() === loginUser) {
        const comment = await findOneComment(reply.comment.toString());
        if (comment) {
          comment.replies.filter((reply) => reply.id !== replyId);
          await comment.save();
          await deleteReply(replyId);
          return res.sendStatus(200);
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
