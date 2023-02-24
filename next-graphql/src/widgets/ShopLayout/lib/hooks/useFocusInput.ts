import { useEffect, useRef, useState } from "react";

const useFocusInput = () => {
  const [focus, setFocus] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);

  const on = () => setFocus(true);
  const off = () => setFocus(false);

  useEffect(() => {
    if (!focusRef.current) {
      return;
    }
    const node = focusRef.current;

    node.addEventListener("focus", on);
    node.addEventListener("focusout", off);

    return () => {
      node.removeEventListener("focus", on);
      node.removeEventListener("focusout", off);
    };
  }, []);

  return { focus, focusRef };
};

export { useFocusInput };
