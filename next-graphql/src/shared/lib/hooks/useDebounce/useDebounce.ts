import { useCallback, useRef } from "react";

function useDebounce(callback: any, delay: number)  {
  const timer = useRef(null)

  const debounceCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debounceCallback;
}

export { useDebounce }
