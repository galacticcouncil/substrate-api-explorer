import { combineReducers } from 'redux'

import api from './api'
import message from './message'
import loading from './loading'

export default combineReducers({ api, message, loading })

export * from './api'
export * from './message'
export * from './loading'
