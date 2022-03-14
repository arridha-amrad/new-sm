import { Request, Response } from 'express';
import { findOneReply, updateReply } from '../../services/ReplyService';

export default async (req: Request, res: Response) => {
  const likeSender = req.userId;
  const { replyId } = req.params;

  try {
    const reply = await findOneReply(replyId);
    const isLiked = reply?.likes.find(
      (userId) => userId.toString() === likeSender
    );
    const updatedReply = await updateReply(
      replyId,
      isLiked
        ? {
            $pull: { likes: likeSender },
          }
        : { $push: { likes: likeSender } }
    );
    return res.status(200).json({ reply: updatedReply });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
