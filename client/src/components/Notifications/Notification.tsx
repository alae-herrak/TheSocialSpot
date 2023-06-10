import { useEffect, useState } from "react";

import { NotificationProps, Post, User } from "../../types";
import { getUserById } from "../../api/user";

const Notification: React.FC<NotificationProps> = ({ notification, theme }) => {
  const [user, setuser] = useState<User>();
  const [link, setLink] = useState<string>('')
  const [notificationContent, setNotificationContent] = useState<string>("");

  useEffect(() => {
    getUserById(notification.user_id1).then((res) => {
      setuser(res.data);
      switch (notification.event) {
        case "postLike":
          setNotificationContent(`${res.data.fullName} liked your post`);
          setLink(`/post/${notification.ressource_id}`)
          break;
        case "comment":
          setNotificationContent(`${res.data.fullName} commented on your post`);
          setLink(`/post/${notification.ressource_id}`)
          break;
        case "commentLike":
          setNotificationContent(`${res.data.fullName} liked your comment`);
          setLink(`/post/${notification.ressource_id}`)
          break;
        case "invite":
          setNotificationContent(`${res.data.fullName} sent you an invite`);
          setLink(`/user/${notification.user_id1}`)
          break;
        case "inviteAccepted":
          setNotificationContent(`${res.data.fullName} accepted your friend request `);
          setLink(`/user/${notification.user_id1}`)
          break;
      }
    });
  }, []);

  return (
    <a
      className="dropdown-item d-flex justify-content-between align-items-center py-2"
      href={link}
    >
      <div className="d-flex align-items-center">
        <img
          src={user?.profilePicture}
          alt=""
          referrerPolicy="no-referrer"
          style={{
            aspectRatio: "1/1",
            objectFit: "contain",
            backgroundColor: theme === "light" ? "white" : "black",
          }}
          className="width-2rem p-0 rounded-circle border border-1 border-dark-subtle me-2"
        />
        <p className="m-0">{notificationContent}</p>
      </div>
      <img src="" alt="" className="width-2rem" />
    </a>
  );
};

export default Notification;
