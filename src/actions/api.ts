import { SetApiActionPayloadInterface } from 'types'
import { SET_API, RESET_API, RESET_COMPARE_API } from 'constants/api'

export const setApiAction = (payload: SetApiActionPayloadInterface) => ({
  type: SET_API,
  payload
})

export const resetApiAction = () => ({
  type: RESET_API
})

export const resetCompareApiAction = () => ({
  type: RESET_COMPARE_API
})
