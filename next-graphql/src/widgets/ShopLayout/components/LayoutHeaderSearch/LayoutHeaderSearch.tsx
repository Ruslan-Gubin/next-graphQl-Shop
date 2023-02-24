import { useState } from "react";
import { useFocusInput } from "../../lib/hooks/useFocusInput";


import styles from './LayoutHeaderSearch.module.scss';
import { LayoutSearchInput } from "../LayoutSearchInput";
import { LayoutAutoComplet } from "../LayoutAutoComplet";

const LayoutHeaderSearch = () => {
  const [value, setValue] = useState<string>("");
  const {focus, focusRef} = useFocusInput()


  return (
    <div className={styles.root}>
      <LayoutSearchInput
      focusRef={focusRef}
        active={focus}
        value={value}
        onChange={(e) => setValue(e)}
        cancel={() => setValue('')}
      />
      {focus && 
      <LayoutAutoComplet />
      }
    </div>
  );
};

export { LayoutHeaderSearch };
