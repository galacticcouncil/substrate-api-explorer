import { DependencyList, useRef } from 'react'
import { useDidUpdate } from 'react-hooks-lib'

export default (time = 500, callback: () => void, deps: DependencyList) => {
  const callbackRef = useRef(callback)

  useDidUpdate(() => {
    callbackRef.current = callback
  }, [callback])

  useDidUpdate(() => {
    const timeoutID = setTimeout(() => callbackRef.current(), time)
    return () => clearTimeout(timeoutID)
  }, deps)
}
