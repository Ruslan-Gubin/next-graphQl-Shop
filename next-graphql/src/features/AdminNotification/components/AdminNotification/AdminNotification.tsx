import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ALL_QUESTIONS } from "../../../../apps/apollo";
import { notificationIcons } from "../../lib/assets/linkNotificationIcons";
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { adminQuestionAction } from "../../../../features/AdminQuestionsContent";
import { GET_NEW_ORDERS_LENGTH } from "../../../../apps/apollo/orderRequest";

import styles from "./AdminNotification.module.scss";

const AdminNotification: FC = () => {
  const { data, loading } = useQuery(ALL_QUESTIONS);
  const {data: allOrders} = useQuery(GET_NEW_ORDERS_LENGTH)
  const [lengthViewed, setLengthViewed] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading) {
      const filterArr = data.questions.filter((item: any) => !item.viewed);
      setLengthViewed(filterArr.length);
    }
  }, [data, loading]);

  return (
    <>
      <div className={styles.notifications}>
        <div
        onClick={() => dispatch(adminQuestionAction.setMenuSortQuestions({ value: "vieweds" }))}
         className={styles.notificationItem}>
          <Link href={"/admin/questions"}>
            <Image width={25} height={25}  src={notificationIcons.message} alt="message icon" />
            {lengthViewed > 0 && <small>{lengthViewed}</small>}
          </Link>
        </div>
        <div className={styles.notificationItem}>
          <Link href={"/admin/notification"}>
            <Image width={25} height={25} src={notificationIcons.notification} alt="notification icon" />
            {allOrders && allOrders?.getNewLength.length > 0 && <small>{allOrders?.getNewLength.length}</small>}
          </Link>
        </div>

        <div className={styles.menugrid}>
          <Image width={25} height={25} src={notificationIcons.menuGrid} alt="menu grid icon" />
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
