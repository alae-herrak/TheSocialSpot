import { NotificationsModalProps } from "../../types";
import Notification from "./Notification";

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  theme,
}) => {
  return (
    <div
      className="modal fade"
      id="notifications"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Notifications</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {
            notifications.length ?
            notifications.map((notification) => (
              <Notification
                key={notification.notification_id}
                notification={notification}
                theme={theme}
              />
            ))
              : "No notifications"
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
