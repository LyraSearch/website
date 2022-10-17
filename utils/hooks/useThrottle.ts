import { useState } from 'react'

export function useThrottle (func: Function, delay: number): Function {
  const [timeout, saveTimeout] = useState<any>(null)

  const throttledFunc = function () {
    if (timeout) {
      clearTimeout(timeout)
    }

    const newTimeout = setTimeout(() => {
      // @ts-expect-error
      func(...arguments)
      if (newTimeout === timeout) {
        saveTimeout(null)
      }
    }, delay)

    saveTimeout(newTimeout)
  }

  return throttledFunc
}
