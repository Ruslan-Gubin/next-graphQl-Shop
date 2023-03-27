import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { ALL_QUESTIONS } from "../../../../apps/apollo";
import { notificationIcons } from "../../lib/assets/linkNotificationIcons";
import { adminQuestionAction } from "../../../../features/AdminQuestionsContent";
import { GET_NEW_ORDERS_LENGTH } from "../../../../apps/apollo/orderRequest";
import { useAdminLayoutContext } from "../../../../widgets/AdminLayout/lib/context/useAdminLayoutContext";

import styles from "./AdminNotification.module.scss";


const AdminNotification: FC = () => {
  const { handleRouterLink } = useAdminLayoutContext()
  const { data, loading } = useQuery(ALL_QUESTIONS);
  const {data: allOrders} = useQuery(GET_NEW_ORDERS_LENGTH)
  const dispatch = useDispatch()

  const viewsLenght = useMemo(() => {
    if (data && !loading) {
      return data.questions.filter((item: any) => !item.viewed).length
    }
  }, [data, loading])

  return (
    <>
      <div className={styles.notifications}>
        <div
        onClick={() => dispatch(adminQuestionAction.setMenuSortQuestions({ value: "vieweds" }))}
         className={styles.notificationItem}>
            <picture onClick={() => handleRouterLink("/admin/questions")}>
            <img width={25} height={25}  src={notificationIcons.message} alt="message icon" />
            </picture>
            {viewsLenght > 0 && <small>{viewsLenght}</small>}
        </div>
        <div className={styles.notificationItem}>
          <picture onClick={() => handleRouterLink("/admin/notification")}>
            <img width={25} height={25} src={notificationIcons.notification} alt="notification icon" />
          </picture>
            {allOrders && allOrders?.getNewLength.length > 0 && <small>{allOrders?.getNewLength.length}</small>}
        </div>

        <div className={styles.menugrid}>
        <picture >
          <img width={25} height={25} src={notificationIcons.menuGrid} alt="menu grid icon" />
        </picture>
        </div>
          <div className={styles.exit} onClick={() => handleRouterLink("/")}>
            <span>exit</span>
          </div>
      </div>
    </>
  );
};

export { AdminNotification };
