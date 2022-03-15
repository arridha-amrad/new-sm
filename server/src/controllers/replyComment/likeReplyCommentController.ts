import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotificationType } from '../../models/notification/INotificationModel';
import {
  createNotification,
  deleteNotification,
  findOneNotification,
} from '../../services/NotificationService';
import { findOneReply, updateReply } from '../../services/ReplyService';

export default async (req: Request, res: Response) => {
  const likeSender = req.userId;
  const { replyId } = req.params;

  try {
    const reply = await findOneReply(replyId);
    if (reply) {
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

      if (likeSender !== reply.sender._id.toString()) {
        const notification = await findOneNotification({
          type: NotificationType.LIKE_REPLY,
          reply: replyId,
        });
        if (!notification) {
          await createNotification({
            reply: reply._id,
            owner: reply.sender._id,
            type: NotificationType.LIKE_REPLY,
            sender: likeSender,
          });
        } else {
          if (isLiked) {
            notification.sender.pull(likeSender);
            if (notification.sender.length === 0) {
              await deleteNotification(notification.id);
            } else {
              await notification.save();
            }
          } else {
            const user = new mongoose.Types.ObjectId(likeSender);
            notification.sender.unshift(user);
            await notification.save();
          }
        }
      }
      return res.status(200).json({ reply: updatedReply });
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
