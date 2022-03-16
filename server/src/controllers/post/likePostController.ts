import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotificationType } from '../../models/notification/INotificationModel';
import {
  createNotification,
  deleteNotification,
  findOneNotification,
} from '../../services/NotificationService';
import { editPost, findOnePost } from '../../services/PostService';
import { findUserById } from '../../services/UserServices';

export default async (req: Request, res: Response) => {
  const likeSender = req.userId;
  const { postId } = req.params;
  try {
    const post = await findOnePost(postId);
    if (post) {
      const isLiked = post?.likes.find(
        (user) => user._id?.toString() === likeSender
      );
      const updatedPost = await editPost(
        postId,
        isLiked
          ? { $pull: { likes: likeSender } }
          : { $push: { likes: likeSender } }
      );
      // create notification if likeSender is not the post owner
      if (post?.owner._id.toString() !== likeSender) {
        let currentNotification;
        const notification = await findOneNotification({
          type: NotificationType.LIKE_POST,
          owner: post.owner,
          post: post._id,
        });
        if (!notification) {
          currentNotification = await createNotification({
            post: post._id,
            type: NotificationType.LIKE_POST,
            owner: post.owner,
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
            return res.status(200).json({ post: updatedPost });
          } else {
            const user = await findUserById(likeSender, 'username');
            notification.sender.unshift(user);
            notification.isRead = false;
            currentNotification = await notification.save();
          }
        }
        return res
          .status(200)
          .json({ post: updatedPost, notification: currentNotification });
      }
      return res.status(200).json({ post: updatedPost });
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
