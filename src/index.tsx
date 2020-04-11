import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { AppContainer } from 'containers'
import configureStore from 'config/store'

import 'styles/global.css'

const store = configureStore()

const history = createBrowserHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
)
