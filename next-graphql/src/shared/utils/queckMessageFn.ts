import { SetStateAction } from "react";

const queckMessageFn = (text: string, callback: (value: SetStateAction<{status: boolean, text: string}> ) => void, ms: number = 3000) => {
  callback(() => ({status: true, text}))
  setTimeout(() => {
    callback(() => ({status: false, text: ''}))
  }, ms);
}

export { queckMessageFn }