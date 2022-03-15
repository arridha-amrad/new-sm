import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserState } from "../../features/authentication/authSlice";
import {
  INotification,
  NotificationType,
} from "../../features/authentication/interface";
import NotificationOfCommentPost from "./NotificationOfCommentPost";
import NotificationOfLikeComment from "./NotificationOfLikeComment";
import NotificationOfLikePost from "./NotificationOfLikePost";
import NotificationOfReply from "./NotificationOfReply";

interface Props {
  notification: INotification;
  notifIndex: number;
}

const NotificationCard: FC<Props> = ({ notification, notifIndex }) => {
  const { loginUser } = useAppSelector(selectUserState);
  if (notification.type === NotificationType.LIKE_POST) {
    return (
      <NotificationOfLikePost
        loginUser={loginUser!}
        notification={notification}
      />
    );
  }
  if (notification.type === NotificationType.COMMENT_POST) {
    return (
      <NotificationOfCommentPost
        loginUser={loginUser!}
        notification={notification}
      />
    );
  }
  if (notification.type === NotificationType.LIKE_COMMENT) {
    return (
      <NotificationOfLikeComment
        loginUser={loginUser!}
        notification={notification}
      />
    );
  }
  if (notification.type === NotificationType.REPLY_COMMENT) {
    return (
      <NotificationOfReply loginUser={loginUser!} notification={notification} />
    );
  }
  return <div>{notification.type}</div>;
};

export default NotificationCard;
