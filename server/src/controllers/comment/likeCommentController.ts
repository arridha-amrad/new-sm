import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotificationType } from '../../models/notification/INotificationModel';
import { editComment, findOneComment } from '../../services/CommentService';
import {
  createNotification,
  deleteNotification,
  findOneNotification,
} from '../../services/NotificationService';

export default async (req: Request, res: Response) => {
  const likeSender = req.userId;
  const { commentId } = req.params;
  try {
    let comment = await findOneComment(commentId);
    if (comment) {
      const isLiked = comment.likes.find(
        (user) => user._id?.toString() === likeSender
      );
      const updatedComment = await editComment(
        commentId,
        isLiked
          ? {
              $pull: { likes: likeSender },
            }
          : {
              $push: { likes: likeSender },
            }
      );
      // create notification if likeSender is not the postOwner
      if (likeSender !== comment.owner._id.toString()) {
        const notification = await findOneNotification({
          comment: commentId,
          type: NotificationType.LIKE_COMMENT,
        });
        if (!notification) {
          await createNotification({
            comment: commentId,
            owner: comment.owner._id,
            type: NotificationType.LIKE_COMMENT,
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
            notification.isRead = false;
            await notification.save();
          }
        }
      }
      return res.status(200).json({ comment: updatedComment });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
