import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ApiPromise, WsProvider } from '@polkadot/api'
import * as edgewareDefinitions from 'edgeware-node-types/dist/definitions'

import { App } from 'components'
import {
  setApiAction,
  resetApiAction,
  resetCompareApiAction,
  showMessageAction,
  hideMessageAction,
  showLoadingAction,
  hideLoadingAction,
} from 'actions'
import { apiSelector, loadingSelector, messageSelector } from 'selectors'
import { isWsAddress, constructApiDescriptionObject } from 'utils'

type Providers = {
  current: WsProvider | undefined
  compare: WsProvider | undefined
}

const edgewareTypes = Object.values(edgewareDefinitions).reduce(
  (res, types): object => ({ ...res, ...types }),
  {}
)

const AppContainer = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const api = useSelector(apiSelector)
  const loading = useSelector(loadingSelector)
  const message = useSelector(messageSelector)

  const providers: Providers = {
    current: undefined,
    compare: undefined,
  }

  const resetApp = () => {
    dispatch(resetApiAction())
    history.push({ pathname: '/', state: { routeName: 'Select API' } })
  }

  const showError = (message?: string) => {
    dispatch(hideLoadingAction())
    dispatch(
      showMessageAction(
        message ||
          'Connection error. Please try again or use a different node URL.'
      )
    )
  }

  const resetCompareApi = () => {
    dispatch(resetCompareApiAction())
  }

  useEffect(() => {
    if (!api.current.loaded) resetApp()
  }, [api, location.pathname])

  const disconnect = async (
    which: string,
    reset = false,
    showCompareScreenMessage = true
  ) => {
    try {
      await providers[which].disconnect()
    } catch (e) {}

    if (reset) {
      if (which === 'current') {
        resetApp()
        showError()
      } else {
        resetCompareApi()

        if (showCompareScreenMessage) showError()
      }
    }
  }

  const connect = async (
    url: string,
    customTypes: string,
    which: 'current' | 'compare',
    redirectTo?: string | object
  ) => {
    dispatch(showLoadingAction())

    if (!isWsAddress(url)) {
      showError(
        'The provided WebSocket address is not valid. Please correct it and try again.'
      )
      return
    }

    let parsedTypes = {}

    try {
      if (customTypes) parsedTypes = JSON.parse(customTypes)
    } catch (e) {
      showError(
        'Failed to parse custom types, please check your JSON formatting\n:: ' +
          e
      )
      return
    }

    disconnect(which)

    providers[which] = new WsProvider(url)

    providers[which]?.on('error', () => disconnect(which, true))
    providers[which]?.on('disconnected', () => disconnect(which, true))

    const api = await ApiPromise.create({
      types: parsedTypes,
      typesSpec: {
        edgeware: {
          ...edgewareTypes,
          // aliases that don't do well as part of interfaces
          'voting::VoteType': 'VoteType',
          'voting::TallyType': 'TallyType',
          // chain-specific overrides
          Address: 'GenericAddress',
          Keys: 'SessionKeys4',
          StakingLedger: 'StakingLedgerTo223',
          Votes: 'VotesTo230',
          ReferendumInfo: 'ReferendumInfoTo239',
        },
        // override duplicate type name edgeware
        typesAlias: { voting: { Tally: 'VotingTally' } },
        plasm: {
          Parameters: {
            canBeNominated: 'bool',
            optionExpired: 'u128',
            optionP: 'u128',
          },
          BTreeSet: {},
        },
      },
      provider: providers[which],
    })

    if (api) {
      const { apiDescription, apiSearch } = await constructApiDescriptionObject(
        api
      )

      dispatch(
        setApiAction({
          which,
          data: {
            loaded: true,
            url,
            description: apiDescription,
            search: apiSearch,
            promise: api,
          },
        })
      )
      dispatch(hideLoadingAction())
      if (redirectTo) history.push(redirectTo)
    } else {
      if (which === 'current') {
        resetApp()
        showError()
      } else {
        resetCompareApi()
        showError()
      }
    }
  }

  const handleSetApi = (
    url,
    customTypes,
    which: 'current' | 'compare',
    redirectTo?: string | object
  ) => {
    connect(url, customTypes, which, redirectTo)
  }

  return (
    <App
      loading={loading}
      message={message}
      onMessageModalClose={() => dispatch(hideMessageAction())}
      onSetApi={handleSetApi}
      onDisconnectApi={disconnect}
    />
  )
}

export default AppContainer
