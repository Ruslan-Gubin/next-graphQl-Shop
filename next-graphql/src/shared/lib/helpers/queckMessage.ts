import { Dispatch, SetStateAction } from "react";


const queckMessage = (setState: Dispatch<SetStateAction<{state: boolean; message: string;}>>, message: string) => {
  setState(() => ({state: true, message: message}))
  setTimeout(() => {
  setState(() => ({state: false, message: ''}))
  }, 3000)
}

export { queckMessage }