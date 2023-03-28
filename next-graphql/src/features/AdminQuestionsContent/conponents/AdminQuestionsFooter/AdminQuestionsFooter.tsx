import  { forwardRef, useImperativeHandle,   useRef,   useState } from "react";

import styles from "./AdminQuestionsFooter.module.scss";


const AdminQuestionsFooterInner = (( props, ref) => {
  const [message, setMessage] = useState('')

useImperativeHandle(ref, () => {
  return {
    value: message,
  }
}, [message])

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Answer"
          />
      </div>
    </footer>
  );
});

export const AdminQuestionsFooter = forwardRef(AdminQuestionsFooterInner)


