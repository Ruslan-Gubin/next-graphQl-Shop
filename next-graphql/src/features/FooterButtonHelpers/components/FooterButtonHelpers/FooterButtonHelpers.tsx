import { useState } from "react";
import { ModalQuestionsMessage } from "@/entities";
import { ButtonFooterHelper } from "@/shared/components";

import styles from "./FooterButtonHelpers.module.scss";
import { MockDialog } from "../../models/MockDialog";
import { buttonIcon } from "../../lib/assets/buttonIcon";
import { formatedDate } from "../../lib/helpers/formatedDate";

const FooterButtonHelpers = () => {
  const [modalMessageActive, setModalMessageActive] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [comments, setComments] = useState([...MockDialog]);

  const handleSubmitMessage = () => {
    if (message.length > 0) {
      const newComment = {
        text: message,
        date: formatedDate(),
      };

      setComments((prev) => (prev = [...prev, newComment]));

      setMessage("");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <ButtonFooterHelper icon={buttonIcon.arrowUp} onClick={() => {}} />
        {modalMessageActive ? (
          <ModalQuestionsMessage
            dialogs={comments}
            setMessage={setMessage}
            message={message}
            closeModal={() => setModalMessageActive(false)}
            handleSubmitMessage={handleSubmitMessage}
          />
        ) : (
          <ButtonFooterHelper
            icon={buttonIcon.chatIcon}
            onClick={() => setModalMessageActive(true)}
          />
        )}
      </div>
    </>
  );
};

export { FooterButtonHelpers };
