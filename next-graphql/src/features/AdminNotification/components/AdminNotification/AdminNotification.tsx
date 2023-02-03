import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ALL_QUESTIONS } from "@/apps/apollo";
import { notificationIcons } from "../../lib/assets/linkNotificationIcons";
import styles from "./AdminNotification.module.scss";
import { useDispatch } from "react-redux";
import { adminQuestionAction } from "@/features/AdminQuestionsContent";

const AdminNotification: FC = () => {
  const { data, loading } = useQuery(ALL_QUESTIONS);
  const [lengthViewed, setLengthViewed] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading) {
      const filterArr = data.questions.filter((item: any) => !item.viewed);
      setLengthViewed(filterArr.length);
    }
  }, [data]);

  return (
    <>
      <div className={styles.notifications}>
        <div
        onClick={() => dispatch(adminQuestionAction.setMenuSortQuestions({ value: "vieweds" }))}
         className={styles.notificationItem}>
          <Link href={"/admin/questions"}>
            <img src={notificationIcons.message} alt="message icon" />
            {lengthViewed > 0 && <small>{lengthViewed}</small>}
          </Link>
        </div>
        <div className={styles.notificationItem}>
          <Link href={"/admin/notification"}>
            <img src={notificationIcons.notification} alt="notification icon" />
            {/* <small>{}</small> */}
          </Link>
        </div>

        <div className={styles.menugrid}>
          <img src={notificationIcons.menuGrid} alt="menu grid icon" />
        </div>
        <Link href={"/"}>
          <div className={styles.exit}>
            <span>exit</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export { AdminNotification };
