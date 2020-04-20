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

  const isLocal =
    window.location.hostname == 'localhost' ||
    window.location.hostname == '127.0.0.1'

  const options = [
    'wss://kusama-rpc.polkadot.io/',
    'wss://mainnet2.edgewa.re',
    'wss://testnet.plasmnet.io',
    'wss://substrate-rpc.parity.io/',
    'custom',
  ]

  if (isLocal) options.unshift('ws://127.0.0.1:9944')

  const computedApiUrl = api.current.url
    ? options.includes(api.current.url)
      ? api.current.url
      : 'Custom'
    : options[0]

  const [apiUrl, setApiUrl] = useState<UiOptionType>(computedApiUrl)
  const [customApiUrl, setCustomApiUrl] = useState<string>(
    computedApiUrl === 'Custom' ? api.current.url : 'wss://'
  )

  const [customApiTypes, setCustomApiTypes] = useState<string>('')

  const handleSubmit = () => {
    const isCustomUrl = apiUrl === 'Custom'
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
