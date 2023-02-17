import  { useLayoutEffect, useState } from "react";

const queries:string[] = [
  '(max-width: 576px)',
  '(min-width: 576px) and (max-width: 1023px)',
  '(min-width: 1023px)',
]

export const useMatchMedia = (): {isMobile?: boolean, isTablet?: boolean, isDesktop?: boolean} => {
  if (typeof window === 'undefined') return {}

  const mediaQueryLists = queries.map(query => matchMedia(query))

  const getValues = () => mediaQueryLists.map(mq1 => mq1.matches)

  const [values, setValues] = useState(getValues)

  useLayoutEffect(() => {
    const handler = () => setValues(getValues)

    mediaQueryLists.forEach(mq1 => mq1.addEventListener('change', handler))

    return () => mediaQueryLists.forEach(mq1 => mq1.removeEventListener('change', handler))
  })

  return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => ({
    ...acc,
    [screen]: values[index]
  }),{})
}

