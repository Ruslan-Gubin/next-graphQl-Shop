import { ChangeEvent, FC, memo } from "react";
import { CustomClose, ImageSearch } from "../../../../shared";

import styles from "./LayoutSearchInput.module.scss";


interface ILayoutSearchInput {
  value: string;
  onChange: (value: string) => void;
  cancel: () => void;
  active: boolean;
  focusRef: React.RefObject<HTMLInputElement>;
}

const LayoutSearchInputF: FC<ILayoutSearchInput> = ({
  value,
  onChange,
  cancel,
  active,
  focusRef,
}) => {
  
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  
  
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
        onChange={(e) => handleChangeInput(e)}
      />

      <div className={styles.imageClose}>
        <CustomClose onClick={cancel} active={value.length > 0} />
      </div>
    </div>
  );
};

export const LayoutSearchInput = memo(LayoutSearchInputF);
