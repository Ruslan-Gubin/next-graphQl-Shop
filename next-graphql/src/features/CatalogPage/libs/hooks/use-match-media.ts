import  { useLayoutEffect, useState } from "react";

const queries:string[] = [
  '(max-width: 576px)',
  '(min-width: 576px) and (max-width: 1023px)',
  '(min-width: 1023px)',
]

export const useMatchMedia = (): {isMobile?: boolean, isTablet?: boolean, isDesktop?: boolean} => {
  
  const mediaQueryLists = queries.map(query => matchMedia(query))
  
  const getValues = () => mediaQueryLists.map(mq1 => mq1.matches)
  
  const [values, setValues] = useState(getValues)
  
  useLayoutEffect(() => {
    const handler = () => setValues(getValues)
    
    mediaQueryLists.forEach(mq1 => mq1.addEventListener('change', handler))
    
    return () => mediaQueryLists.forEach(mq1 => mq1.removeEventListener('change', handler))
  })
  
  if (typeof window === 'undefined') return {}
  
  return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => ({
    ...acc,
    [screen]: values && values[index]
  }),{})
}

// import { useLayoutEffect, useState } from 'react'
// import { IMediaQuery, IMatchedMedia } from './types'

// function useMatchMedia (queries: IMediaQuery, defaultValues: IMatchedMedia = []): IMatchedMedia {
//   const initialValues = defaultValues.length
//     ? defaultValues
//     : Array(queries.length).fill(false)
    

//   if (typeof window === 'undefined') return initialValues

//   const mediaQueryLists = queries.map(q => window.matchMedia(q))
//   const getValue = (): IMatchedMedia => {
//     // Return the value for the given queries
//     const matchedQueries = mediaQueryLists.map(mql => mql.matches)

//     return matchedQueries
//   }

//   // State and setter for matched value
//   const [value, setValue] = useState(getValue)

//   useLayoutEffect(() => {
//     // Event listener callback
//     // Note: By defining getValue outside of useEffect we ensure that it has ...
//     // ... current values of hook args (as this hook only runs on mount/dismount).
//     const handler = (): void => setValue(getValue)
//     // Set a listener for each media query with above handler as callback.
//     mediaQueryLists.forEach(mql => mql.addListener(handler))
//     // Remove listeners on cleanup
//     return (): void => mediaQueryLists.forEach(mql => mql.removeListener(handler))
//   }, [])

//   return value
// }

// export default useMatchMedia

