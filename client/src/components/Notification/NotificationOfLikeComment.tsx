import { FC } from "react";
import { INotification, User } from "../../features/authentication/interface";
import likeHelpers from "../../utils/likeHelpers";
import timeSetter from "../../utils/timeSetter";

interface Props {
  notification: INotification;
  loginUser: User;
}

const NotificationOfLikeComment: FC<Props> = ({ notification, loginUser }) => {
  const senders = notification.sender;
  return (
    <div className="d-flex gap-3 align-items-start p-3">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column justify-content-start align-items-start">
          <div>{likeHelpers(senders, loginUser!)} like your comment</div>
          <small className=" text-secondary">
            {timeSetter(new Date(notification.updatedAt))}
          </small>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div>
            <img
              src={loginUser?.avatarURL}
              alt="avatar"
              className="rounded-circle"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <div className="d-flex flex-column align-items-start">
            <div>
              you
              <span className="ms-2">
                <small className="text-secondary">
                  {timeSetter(new Date(notification.comment!.createdAt))}
                </small>
              </span>
            </div>
            <div>{notification.comment?.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationOfLikeComment;
