import { SHOW_LOADING, HIDE_LOADING } from 'constants/loading'

export const showLoadingAction = () => ({
  type: SHOW_LOADING
})

export const hideLoadingAction = () => ({
  type: HIDE_LOADING
})
