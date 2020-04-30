import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import packageJSON from 'package.alias.json'
import { UiOptionType } from 'types'
import { apiSelector } from 'selectors'
import { RadioGroup, Dropdown, Input, Button } from 'ui'

import * as S from './styled'

type Props = {
  onSetApi: (
    url: string,
    customTypes: string,
    which: 'current' | 'compare',
    redirectTo?: string | object
  ) => void
}

const SelectApi = ({ onSetApi }: Props) => {
  const api = useSelector(apiSelector)

  const options = [
    'wss://kusama-rpc.polkadot.io/',
    'wss://mainnet2.edgewa.re',
    'wss://testnet.plasmnet.io',
    'wss://substrate-rpc.parity.io/',
    'ws://127.0.0.1:9944',
    'custom',
  ]

  const computedApiUrl = api.current.url
    ? options.includes(api.current.url)
      ? api.current.url
      : 'custom'
    : options[0]

  const [apiUrl, setApiUrl] = useState<UiOptionType>(computedApiUrl)
  const [customApiUrl, setCustomApiUrl] = useState<string>(
    computedApiUrl === 'custom' ? api.current.url : 'wss://'
  )

  const [customApiTypes, setCustomApiTypes] = useState<string>('')

  const handleSubmit = () => {
    const isCustomUrl = apiUrl === 'custom'
    let customTypes = ''
    let url = apiUrl as string
    if (isCustomUrl) {
      url = customApiUrl
      customTypes = customApiTypes
    }

    onSetApi(url, customTypes, 'current', '/explore-api')
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) handleSubmit()
  }

  return (
    <S.Wrapper onKeyUp={handleKeyUp}>
      <S.Inner>
        <S.Form>
          <RadioGroup
            id="selectApiRadioGroup"
            value={apiUrl}
            onChange={setApiUrl}
            options={options}
          />
          <Dropdown isOpen={apiUrl === 'custom'}>
            <Input
              type="text"
              placeholder="Custom Node URL"
              value={customApiUrl}
              onChange={(e) => setCustomApiUrl(e.target.value)}
              style={{ margin: '24px 0 0' }}
            />
            <Input
              type="text"
              placeholder="Custom Types"
              value={customApiTypes}
              onChange={(e) => setCustomApiTypes(e.target.value)}
            />
          </Dropdown>
        </S.Form>
        <Button
          fluid
          text="connect"
          disabled={apiUrl === api.current.url}
          onClick={handleSubmit}
          style={{ marginBottom: '24px' }}
        />
      </S.Inner>
      <S.Version>
        API Version:{' '}
        {packageJSON.dependencies['@polkadot/api'].replace('^', '')}
      </S.Version>
    </S.Wrapper>
  )
}

export default SelectApi
