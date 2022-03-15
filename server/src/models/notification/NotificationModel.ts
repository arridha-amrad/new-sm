import { Schema, model, Model } from 'mongoose';
import { INotificationModel, NotificationType } from './INotificationModel';

const NotificationSchema = new Schema<
  INotificationModel,
  Model<INotificationModel>
>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
    },
    sender: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    type: {
      type: String,
      enum: NotificationType,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = model<INotificationModel>(
  'Notification',
  NotificationSchema
);

export default NotificationModel;
