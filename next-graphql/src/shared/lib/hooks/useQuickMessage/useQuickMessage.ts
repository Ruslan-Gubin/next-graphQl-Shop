import {  useState } from "react";
import { queckMessageFn } from "../../../utils";


const useQuickMessage = () => {
  const [quickMessage, setQueckMessage] = useState({status: false, text: ''}) 

  const handleChangeState = (text: string) => {
    if (quickMessage.status) return;
    queckMessageFn(text, setQueckMessage)
  }
  


  return { text: quickMessage.text, status: quickMessage.status, handleChangeState }
};

export { useQuickMessage };