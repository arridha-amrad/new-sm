import { Request, Response } from 'express';
import { NotificationType } from '../../models/notification/INotificationModel';
import { findOneComment } from '../../services/CommentService';
import { createNotification } from '../../services/NotificationService';
import { makeReply } from '../../services/ReplyService';

export default async (req: Request, res: Response) => {
  const { body, receiver } = req.body;
  const { commentId } = req.params;
  const replySender = req.userId;

  try {
    const newReply = await makeReply({
      body,
      comment: commentId,
      receiver,
      sender: replySender,
    });
    const comment = await findOneComment(commentId);
    if (comment) {
      comment.replies.push(newReply);
      await comment.save();

      await createNotification({
        comment: comment._id,
        owner: receiver,
        type: NotificationType.REPLY_COMMENT,
        sender: replySender,
      });
    }
    return res.status(200).json({ reply: newReply });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
