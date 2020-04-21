import { useState, useCallback } from 'react'

export default (initialState = false): [boolean, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initialState)

  return [
    value,
    useCallback(() => setValue(true), []),
    useCallback(() => setValue(false), []),
  ]
}
