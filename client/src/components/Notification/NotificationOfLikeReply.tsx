import { FC } from "react";
import { INotification, User } from "../../features/authentication/interface";
import likeHelpers from "../../utils/likeHelpers";
import timeSetter from "../../utils/timeSetter";

interface Props {
  notification: INotification;
  loginUser: User;
}

const NotificationOfLikeReply: FC<Props> = ({ notification, loginUser }) => {
  const senders = notification.sender;
  return (
    <div className="d-flex gap-3 align-items-start p-3">
      <div className="d-flex flex-column gap-2 align-items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#db19d2"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </div>
        <div className={notification.isRead ? "" : "unseen"} />
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column justify-content-start align-items-start">
          <div>{likeHelpers(senders, loginUser!)} like your reply</div>
          <small className=" text-secondary">
            {timeSetter(new Date(notification.updatedAt))}
          </small>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div>
            <img
              src={loginUser?.avatarURL}
              alt="avatar"
              className="rounded-circle mt-2"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <div className="d-flex flex-column align-items-start">
            <div>
              you
              <span className="ms-2">
                <small className="text-secondary">
                  {timeSetter(new Date(notification.reply!.createdAt))}
                </small>
              </span>
            </div>
            <div>{notification.reply?.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationOfLikeReply;
