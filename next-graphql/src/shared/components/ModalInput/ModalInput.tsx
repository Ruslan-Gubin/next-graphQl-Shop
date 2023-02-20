import { FC } from "react";

import styles from "./ModalInput.module.scss";

interface IModalInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  width?: number;
}

const ModalInput: FC<IModalInput> = ({
  label,
  value,
  placeholder,
  width,
  onChange,
}) => {
  return (
    <section style={{ width: width }} className={styles.root}>
      <label htmlFor="modal-input">{label}</label>
      <input
      autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
        id="modal-input"
        type="text"
      />
    </section>
  );
};

export { ModalInput };
