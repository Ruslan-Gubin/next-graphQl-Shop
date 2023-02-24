import React, { SetStateAction, Dispatch } from "react"

 type TypeOut = {
  ref: any
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
 }

const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = React.useState(initialIsVisible)
  const ref = React.useRef<HTMLElement>(null)

  const handlerClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.targer)) {
      setIsShow(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handlerClickOutside, true)
    return () => {
      document.removeEventListener('click', handlerClickOutside, true)
    }
  })

  return {ref, isShow, setIsShow}

}

export {useOutside}