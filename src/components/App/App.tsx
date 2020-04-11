import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { LoadingStateInterface, MessageStateInterface } from 'types'
import { DefaultLayout } from 'layouts'
import { SelectApi, ExploreApi, CompareApi, Contact, Search } from 'pages'
import { Loading, Modal } from 'ui'

type Props = {
  loading: LoadingStateInterface
  message: MessageStateInterface
  onMessageModalClose: () => void
  onSetApi: (
    url: string,
    which: 'current' | 'compare',
    redirectTo?: string | object
  ) => void
  onDisconnectApi: (
    which: 'current' | 'compare',
    reset: boolean,
    showCompareScreenMessage?: boolean
  ) => void
}

const App = ({
  loading,
  message,
  onMessageModalClose,
  onSetApi,
  onDisconnectApi
}: Props) => (
  <DefaultLayout>
    {loading.visible && <Loading />}
    <Switch>
      <Route
        path="/"
        exact
        render={props => <SelectApi onSetApi={onSetApi} {...props} />}
      />
      <Route path="/explore-api" component={ExploreApi} />
      <Route
        path="/compare-api"
        render={props => (
          <CompareApi
            onSetApi={onSetApi}
            onDisconnectApi={onDisconnectApi}
            {...props}
          />
        )}
      />
      <Route path="/contact" component={Contact} />
      <Route path="/search/:searchQuery" exact component={Search} />
      <Redirect from="*" to="/" />
    </Switch>

    {message.visible && (
      <Modal onClose={onMessageModalClose}>
        <div style={{ textAlign: 'center' }}>{message.text}</div>
      </Modal>
    )}
  </DefaultLayout>
)

export default App
