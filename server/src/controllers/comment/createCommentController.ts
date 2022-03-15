import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotificationType } from '../../models/notification/INotificationModel';
import { addComment } from '../../services/CommentService';
import {
  createNotification,
  findOneNotification,
} from '../../services/NotificationService';
import { findOnePost } from '../../services/PostService';

export default async (req: Request, res: Response) => {
  const { postId } = req.params;
  const commentUser = req.userId;
  const { body } = req.body;

  try {
    const post = await findOnePost(postId);
    if (post) {
      const newComment = await addComment({
        body,
        post: postId,
        owner: commentUser,
      });
      post.comments.push(newComment);
      await post.save();

      // create notification if the commentUser is not the postOwner
      if (post.owner._id.toString() !== commentUser) {
        const notification = await findOneNotification({
          post: post,
          type: NotificationType.COMMENT_POST,
        });
        if (!notification) {
          await createNotification({
            comment: newComment._id,
            type: NotificationType.COMMENT_POST,
            owner: post.owner._id,
            sender: commentUser,
            post: post,
            body,
          });
        } else {
          // if sender already exists change his index to 0
          // so he will be the latest person who comment the post
          // and the commentBody will appear as the latest notificationBody
          const alreadySender = notification.sender.find(
            (user) => user.id === commentUser
          );
          if (alreadySender) {
            const index = notification.sender.findIndex(
              (sender) => sender.id === alreadySender
            );
            notification.sender.splice(index, 1);
            notification.sender.unshift(alreadySender);
          } else {
            const user = new mongoose.Types.ObjectId(commentUser);
            notification.sender.unshift(user);
          }
          notification.body = body;
          await notification.save();
        }
      }
      return res.status(200).json({ comment: newComment });
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
