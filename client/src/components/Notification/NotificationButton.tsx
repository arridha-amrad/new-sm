import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNotification,
  readNotificationAction,
  selectUserState,
} from "../../features/authentication/authSlice";
import { getSocket } from "../../mySocket";
import NotificationCard from "./NotificationCard";
import "./style.css";

const NotificationButton = () => {
  const [isShow, setIsShow] = useState(false);
  const { notifications } = useAppSelector(selectUserState);
  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const socket = getSocket();

  const readNotification = async (notificationIds: string[]) => {
    await dispatch(readNotificationAction(notificationIds));
  };

  const getUnreadNotifications = () => {
    const ntfs = notifications.filter((ntf) => ntf.isRead === false);
    return ntfs;
  };

  return (
    <div style={{ position: "relative", paddingTop: "4px", cursor: "pointer" }}>
      <button
        ref={ref}
        onClick={async () => {
          setIsShow((prev) => !prev);
          const unreadNotifications = getUnreadNotifications();
          if (unreadNotifications.length > 0) {
            const ids: string[] = [];
            unreadNotifications.forEach((ntfs) => ids.push(ntfs._id));
            await readNotification(ids);
          }
        }}
        style={{ position: "relative" }}
        className="btn p-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-bell-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
        </svg>
      </button>
      {getUnreadNotifications().length > 0 && (
        <button
          onClick={() => {
            ref.current?.click();
            ref.current?.focus();
          }}
          className="notif-pill"
        >
          <div className=" fs-6 fw-bold">{getUnreadNotifications().length}</div>
        </button>
      )}
      {isShow && (
        <div className="notification-container shadow text-body fw-normal">
          {notifications.length === 0 && (
            <div className="text-center">You have no notification</div>
          )}
          {notifications.map((notif, index) => (
            <div key={notif._id}>
              <NotificationCard notifIndex={index} notification={notif} />
              {notifications.length > 1 &&
                index !== notifications.length - 1 && (
                  <hr style={{ color: "#ccc" }} />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
