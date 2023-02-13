import React from "react"


const useHoverHits = () => {
const [hover, setHover] = React.useState(false)
const hoverRef = React.useRef<HTMLDivElement>(null)

const on = () => setHover(true)
const off = () => setHover(false)

React.useEffect(() => {
  if (!hoverRef.current) {
    return 
  }
  const node = hoverRef.current

  node.addEventListener('mouseenter', on)
  node.addEventListener('mousemove', on)
  node.addEventListener('mouseleave', off)

  return () => {
  node.removeEventListener('mouseenter', on)
  node.removeEventListener('mousemove', on)
  node.removeEventListener('mouseleave', off)
  }
},[])

return {hover, hoverRef}

}

export {useHoverHits}