import { SHOW_MESSAGE, HIDE_MESSAGE } from 'constants/message'

export const showMessageAction = (payload: string) => ({
  type: SHOW_MESSAGE,
  payload
})

export const hideMessageAction = () => ({
  type: HIDE_MESSAGE
})
