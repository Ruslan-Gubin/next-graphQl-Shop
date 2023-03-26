import {  useCallback, useMemo, useState } from "react";
import { queckMessageFn } from "../../../utils";


const useQuickMessage = () => {
  const [quickMessage, setQueckMessage] = useState({status: false, text: ''}) 

  const handleChangeState = useCallback((text: string) => {
    if (quickMessage.status) return;
    queckMessageFn(text, setQueckMessage)
  }, [quickMessage,setQueckMessage])
  
  const memoText = useMemo(() => quickMessage.text, [quickMessage.text])
  const memoStatus = useMemo(() => quickMessage.status, [quickMessage.status])

  return { text: memoText, status: memoStatus, handleChangeState }
};

export { useQuickMessage };