import { ApiStateInterface, SetApiActionInterface } from 'types'
import { SET_API, RESET_API, RESET_COMPARE_API } from 'constants/api'

const initialState: ApiStateInterface = {
  current: {
    loaded: false,
    url: '',
    description: {},
    search: [],
    promise: {}
  },
  compare: {
    loaded: false,
    url: '',
    description: {},
    search: [],
    promise: {}
  }
}

export default (state = initialState, action: SetApiActionInterface) => {
  switch (action.type) {
    case SET_API:
      return {
        ...state,
        [action.payload.which]: {
          loaded: action.payload.data.loaded || false,
          url: action.payload.data.url || '',
          description: action.payload.data.description || {},
          search: action.payload.data.search || [],
          promise: action.payload.data.promise || {}
        }
      }

    case RESET_API:
      return initialState

    case RESET_COMPARE_API:
      return {
        ...state,
        compare: initialState.compare
      }

    default:
      return state
  }
}
