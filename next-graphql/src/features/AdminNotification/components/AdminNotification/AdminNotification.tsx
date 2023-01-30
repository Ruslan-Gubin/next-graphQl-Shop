import { FC } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { CHECK_NEW_QUESTIONS } from "../../models/questionRequest";
import styles from "./AdminNotification.module.scss";
import { notificationIcons } from "../../lib/assets/linkNotificationIcons";
import { useDispatch, useSelector } from "react-redux";
import { adminNavAction } from "@/widgets/AdminLayout";

const AdminNotification: FC = () => {
  const { data, loading } = useQuery(CHECK_NEW_QUESTIONS);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.notifications}>

        <div className={styles.notificationItem}>
      <Link 
      onClick={() => dispatch(adminNavAction.setActivLink({label: 'questions'}))} 
      href={'/admin/questions'}>
      <img src={notificationIcons.message} alt="message icon" />
      {!loading && data.checkVieweds.length > 0 &&
      <small>{data.checkVieweds.length}</small>
      } 
      </Link>
        </div>
        <div className={styles.notificationItem}>
        <Link
        onClick={() => dispatch(adminNavAction.setActivLink({label: 'notification'}))}
         href={'/admin/notification'}>
      <img  src={notificationIcons.notification} alt="notification icon" />
      {/* <small>{}</small> */}
      </Link>
        </div>

        <div className={styles.menugrid}>
      <img src={notificationIcons.menuGrid} alt="menu grid icon" />
        </div>
      <Link href={'/'}>
    <div className={styles.exit}>
      <span>exit</span>  
      </div>
      </Link>
    </div>
    </>
  );
};

export { AdminNotification };
