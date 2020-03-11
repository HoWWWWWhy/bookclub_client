import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Notification = () => {
  return () => {
    NotificationManager.info("Info message");
  };
};

export default Notification;
