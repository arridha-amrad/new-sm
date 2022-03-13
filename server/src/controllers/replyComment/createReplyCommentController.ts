import { Request, Response } from 'express';
import { findOneComment } from '../../services/CommentService';
import { makeReply } from '../../services/ReplyService';

export default async (req: Request, res: Response) => {
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
