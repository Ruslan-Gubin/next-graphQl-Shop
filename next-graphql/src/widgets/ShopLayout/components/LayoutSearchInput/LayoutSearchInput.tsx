import { FC } from "react";
import { CustomClose, ImageSearch } from "../../../../shared";

import styles from "./LayoutSearchInput.module.scss";


interface ILayoutSearchInput {
  value: string;
  onChange: (value: string) => void;
  cancel: () => void;
  active: boolean;
  focusRef: React.RefObject<HTMLInputElement>;
}

const LayoutSearchInput: FC<ILayoutSearchInput> = ({
  value,
  onChange,
  cancel,
  active,
  focusRef,
}) => {
  return (
    
    <div
      style={{ backgroundColor: active ? "white" : "" }}
      data-testid="root-testid"
      className={styles.root}
    >
      <div className={styles.searchIcon}>
        <ImageSearch active={active} />
      </div>
      <input
        ref={focusRef}
        className={styles.input}
        placeholder="Я ищу..."
        aria-label="input-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className={styles.imageClose}>
        <CustomClose onClick={cancel} active={value.length > 0} />
      </div>
    </div>
  );
};

export { LayoutSearchInput };
