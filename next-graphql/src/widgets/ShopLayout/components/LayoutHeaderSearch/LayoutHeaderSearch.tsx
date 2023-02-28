import { useEffect, useRef, useState } from "react";
import { useFocusInput } from "../../lib/hooks/useFocusInput";
import { LayoutSearchInput } from "../LayoutSearchInput";
import { LayoutAutoComplet } from "../LayoutAutoComplet";

import styles from "./LayoutHeaderSearch.module.scss";

const LayoutHeaderSearch = () => {
  const [value, setValue] = useState<string>("");
  const { focus, focusRef } = useFocusInput();
  const [modalActive, setModalActive] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!dropRef.current?.contains(e.target)) {
        setModalActive(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    if (focus) {
      setModalActive(true);
    }
  }, [focus]);

  return (
    <div ref={dropRef} className={styles.root}>
      <LayoutSearchInput
        focusRef={focusRef}
        active={focus}
        value={value}
        onChange={(e) => setValue(e)}
        cancel={() => setValue("")}
      />
      {modalActive && (
        <LayoutAutoComplet
          setValue={setValue}
          searchValue={value}
          setModalActive={setModalActive}
        />
      )}
    </div>
  );
};

export { LayoutHeaderSearch };
