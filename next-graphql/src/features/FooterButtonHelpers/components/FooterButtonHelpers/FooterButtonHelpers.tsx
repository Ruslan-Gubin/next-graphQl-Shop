import { FC, useState } from "react";
import { ModalQuestionsMessage } from "../../../../entities";
import { ButtonFooterHelper } from "../../../../shared/components";
import { buttonIcon } from "../../lib/assets/buttonIcon";

import styles from "./FooterButtonHelpers.module.scss";


const FooterButtonHelpers: FC = () => {
  const [modalActive, setModalActive] = useState(false);


  return (
    <>
      <div className={styles.root}>
        <ButtonFooterHelper
          icon={buttonIcon.arrowUp}
          onClick={() => window.scrollTo(0, 0)}
        />
        {modalActive ? (
          <ModalQuestionsMessage
            closeModal={() => setModalActive(() => false)}
          />
        ) : (
          <ButtonFooterHelper
            icon={buttonIcon.chatIcon}
            onClick={() => setModalActive(() => true)}
          />
        )}
      </div>
    </>
  );
};

export { FooterButtonHelpers };
