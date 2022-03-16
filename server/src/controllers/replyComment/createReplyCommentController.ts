import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotificationType } from '../../models/notification/INotificationModel';
import { findOneComment } from '../../services/CommentService';
import {
  createNotification,
  findOneNotification,
} from '../../services/NotificationService';
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

      // create notification for receiver of reply
      const notification = await findOneNotification({
        comment: comment.id,
        type: NotificationType.REPLY_COMMENT,
        owner: receiver,
      });

      if (!notification) {
        await createNotification({
          comment: comment._id,
          owner: receiver,
          type: NotificationType.REPLY_COMMENT,
          sender: replySender,
          body,
        });
      } else {
        // if sender already exists change his index to 0
        // so he will be the latest person who comment the post
        // and the commentBody will appear as the latest notificationBody
        const alreadySender = notification.sender.find(
          (user) => user.id === replySender
        );
        if (alreadySender) {
          const index = notification.sender.findIndex(
            (sender) => sender.id === alreadySender
          );
          notification.sender.splice(index, 1);
          notification.sender.unshift(alreadySender);
        } else {
          const user = new mongoose.Types.ObjectId(replySender);
          notification.sender.unshift(user);
          notification.isRead = false;
        }
        notification.body = body;
        await notification.save();
      }
    }
    return res.status(200).json({ reply: newReply });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
