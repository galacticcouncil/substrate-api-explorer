import { MessageStateInterface, SetMessageActionInterface } from 'types'
import { SHOW_MESSAGE, HIDE_MESSAGE } from 'constants/message'

const initialState: MessageStateInterface = {
  text: '',
  visible: false
}

export default (state = initialState, action: SetMessageActionInterface) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        text: action.payload || '',
        visible: true
      }

    case HIDE_MESSAGE:
      return initialState

    default:
      return state
  }
}
