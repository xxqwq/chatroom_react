// 防抖函数
const useDebounce = (callback: Function, delay: number) => {
  let timeout: any;
  return (...args) => {
    const context = this;
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      callback.apply(context, args)
    }, delay)
  }
}

export {
  useDebounce
}