
function debounce(callback: () => void, delay: number) {
  let timer;
  
  return function (...args) {
    
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
    
  }
}

export { debounce }