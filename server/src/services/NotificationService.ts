import NotificationModel from '../models/notification/NotificationModel';
import { AnyKeys, FilterQuery } from 'mongoose';
import { INotificationModel } from '../models/notification/INotificationModel';

export const createNotification = async (data: AnyKeys<INotificationModel>) => {
  const newNotification = new NotificationModel(data);
  return newNotification.save();
};

export const findOneNotification = async (
  filter: FilterQuery<INotificationModel>
) => {
  return NotificationModel.findOne(filter).populate(
    'sender',
    'username avatarURL'
  );
};

export const deleteNotification = async (id: string) => {
  return NotificationModel.findByIdAndDelete(id);
};

export const findNotificationsOfOneUser = async (userId: string) => {
  return NotificationModel.find({ owner: userId })
    .sort({ createdAt: 'desc' })
    .populate('sender', 'username avatarURL')
    .populate('comment', 'body createdAt')
    .populate('post', 'body createdAt')
    .populate('reply', 'body createdAt');
};
