import { useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserState } from "../../features/authentication/authSlice";
import NotificationCard from "./NotificationCard";
import "./style.css";

const NotificationButton = () => {
  const [isShow, setIsShow] = useState(false);
  const { notifications } = useAppSelector(selectUserState);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ position: "relative", paddingTop: "4px", cursor: "pointer" }}>
      <button
        ref={ref}
        onClick={() => setIsShow((prev) => !prev)}
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
      {notifications.length > 0 && (
        <div onClick={() => ref.current?.click()} className="notif-pill">
          <div className=" fs-6 fw-bold">{notifications.length}</div>
        </div>
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
