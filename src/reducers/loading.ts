import { LoadingStateInterface, SetLoadingActionInterface } from 'types'
import { SHOW_LOADING, HIDE_LOADING } from 'constants/loading'

const initialState: LoadingStateInterface = {
  visible: false
}

export default (state = initialState, action: SetLoadingActionInterface) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        visible: true
      }

    case HIDE_LOADING:
      return initialState

    default:
      return state
  }
}
