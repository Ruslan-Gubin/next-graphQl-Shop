import { LayoutSearchInput, LayoutAutoComplet } from "@/entities";
import { useState } from "react";
import { useFocusInput } from "../../lib/hooks/useFocusInput";

import styles from './LayoutHeaderSearch.module.scss';

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
