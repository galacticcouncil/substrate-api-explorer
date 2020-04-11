import React, { useState } from 'react'
import { useDidMount, useDidUpdate } from 'react-hooks-lib'
import { useHistory, Match, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailedDiff } from 'deep-object-diff'

import { UiOptionType, ApiDiffInterface } from 'types'
import { apiSelector } from 'selectors'
import { RadioGroup, Dropdown, Button } from 'ui'
import { CompareApiLegend } from 'components'
import { resetCompareApiAction } from 'actions'

import { Main, Category, Subcategory } from './sections'

import * as S from './styled'

type Props = {
  onSetApi: (
    url: string,
    customTypes: string,
    which: 'current' | 'compare',
    redirectTo?: string
  ) => void
  onDisconnectApi: (
    which: 'current' | 'compare',
    reset: boolean,
    showCompareScreenMessage?: boolean
  ) => void
  match: Match
}

const CompareApi = ({ onSetApi, onDisconnectApi, match }: Props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const api = useSelector(apiSelector)

  const [apiDiff, setApiDiff] = useState<ApiDiffInterface>({
    added: {},
    deleted: {},
    updated: {},
  })

  const isLocal =
    window.location.hostname == 'localhost' ||
    window.location.hostname == '127.0.0.1'

  const options = [
    'wss://kusama-rpc.polkadot.io/',
    'wss://testnet5.edgewa.re',
    'wss://testnet.plasmnet.io',
    'wss://substrate-rpc.parity.io/',
    'Custom',
  ]

  if (isLocal) options.unshift('ws://127.0.0.1:9944')

  const currentApiComputedUrl = api.current.url
    ? options.includes(api.current.url)
      ? api.current.url
      : 'Custom'
    : options[0]
  const [currentApiUrl, setCurrentApiUrl] = useState<UiOptionType>(
    currentApiComputedUrl
  )
  const [customCurrentApiUrl, setCustomCurrentApiUrl] = useState<string>(
    currentApiComputedUrl === 'Custom' ? api.current.url : 'wss://'
  )

  const [customCurrentApiTypes, setCustomCurrentApiTypes] = useState<string>('')

  const [compareApiUrl, setCompareApiUrl] = useState<UiOptionType>(options[0])
  const [customCompareApiUrl, setCustomCompareApiUrl] = useState<string>(
    'wss://'
  )

  const [customCompareApiTypes, setCustomCompareApiTypes] = useState<string>('')

  const handleResetCompareApi = () => {
    dispatch(resetCompareApiAction())
    onDisconnectApi('compare', false, false)
    history.push('/compare-api')
  }

  useDidMount(handleResetCompareApi)

  const handleSubmitCurrentApi = () => {
    const currentApiIsCustom = currentApiUrl === 'Custom'
    let customTypes = ''
    let url = currentApiUrl as string
    if (currentApiIsCustom) {
      url = customCurrentApiUrl
      customTypes = customCurrentApiTypes
    }

    handleResetCompareApi()
    onSetApi(url, customTypes, 'current', '')
  }

  const handleSubmitCompareApi = () => {
    const compareApiIsCustom = compareApiUrl === 'Custom'
    let customTypes = ''
    let url = compareApiUrl as string
    if (compareApiIsCustom) {
      url = customCurrentApiUrl
      customTypes = customCurrentApiTypes
    }

    onSetApi(url, customTypes, 'compare', '')
  }

  useDidUpdate(() => {
    const diff = detailedDiff(
      api.current.description,
      api.compare.description
    ) as ApiDiffInterface

    setApiDiff(diff)
  }, [api.compare.description])

  return (
    <S.Wrapper>
      {api.compare.loaded ? (
        <>
          <S.Title>
            <S.ApiName>
              <small>Main API:</small>
              {api.current.url}
            </S.ApiName>
            <S.ApiName>
              <small>Comparison API:</small>
              {api.compare.url}
            </S.ApiName>
          </S.Title>
          <S.Legend>
            <CompareApiLegend />
            <Button
              theme="outline"
              text="< Compare other API"
              onClick={handleResetCompareApi}
            />
          </S.Legend>
          <Switch>
            <Route
              path={match.path}
              exact
              render={(props) => (
                <Main api={api} apiDiff={apiDiff} {...props} />
              )}
            />
            <Route
              path={`${match.path}/:category`}
              exact
              render={(props) => (
                <Category api={api} apiDiff={apiDiff} {...props} />
              )}
            />
            <Route
              path={`${match.path}/:category/:subcategory`}
              exact
              render={(props) => (
                <Subcategory api={api} apiDiff={apiDiff} {...props} />
              )}
            />
          </Switch>
        </>
      ) : (
        <S.Form>
          <div>
            <RadioGroup
              id="selectApi1RadioGroup"
              label="Current Node"
              value={currentApiUrl}
              onChange={setCurrentApiUrl}
              options={options}
            />
            <Dropdown isOpen={currentApiUrl === 'Custom'}>
              <S.FormInput
                type="text"
                placeholder="Custom Node URL"
                value={customCurrentApiUrl}
                onChange={(e) => setCustomCurrentApiUrl(e.target.value)}
                style={{ margin: '24px 0 0' }}
              />
              <S.FormInput
                type="text"
                placeholder="Custom Types"
                value={customCurrentApiTypes}
                onChange={(e) => setCustomCurrentApiTypes(e.target.value)}
              />
            </Dropdown>
            <Button
              fluid
              condensed
              text="Switch Node"
              disabled={currentApiUrl === api.current.url}
              onClick={handleSubmitCurrentApi}
            />
          </div>
          <div>
            <RadioGroup
              id="selectApi2RadioGroup"
              label="Node to compare"
              value={compareApiUrl}
              onChange={setCompareApiUrl}
              options={options}
            />
            <Dropdown isOpen={compareApiUrl === 'Custom'}>
              <S.FormInput
                type="text"
                placeholder="Custom Node URL"
                value={customCompareApiUrl}
                onChange={(e) => setCustomCompareApiUrl(e.target.value)}
              />
              <S.FormInput
                type="text"
                placeholder="Custom Types"
                value={customCompareApiTypes}
                onChange={(e) => setCustomCompareApiTypes(e.target.value)}
              />
            </Dropdown>
            <Button
              fluid
              condensed
              text="Compare"
              disabled={currentApiUrl === compareApiUrl}
              onClick={handleSubmitCompareApi}
            />
          </div>
        </S.Form>
      )}
    </S.Wrapper>
  )
}

export default CompareApi
