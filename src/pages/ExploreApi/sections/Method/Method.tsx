import React, { useState } from 'react'
import { useLocation, useHistory, Match, Redirect } from 'react-router-dom'
import { useDidMount, useDidUpdate } from 'react-hooks-lib'
import SVG from 'react-inlinesvg'
import _isEmpty from 'lodash/isEmpty'
import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'

import { ApiInterface } from 'types'
import { Input, Button } from 'ui'
import { ExploreApiBreadcrumbs } from 'components'

import * as S from './styled'

type Param = {
  isOptional: boolean
  name: string
  type: string
}

type Method = {
  description?: string
  isSigned: boolean
  isSubscription: boolean
  isConstant?: boolean
  params: Param[]
  pubsub?: string[]
  type: string
}

type ParamFormatted = Param & {
  value: string
}

type FuncResult = {
  message: string
  level: string
}

type Props = {
  api: ApiInterface
  match: Match
}

const Method = ({ api, match }: Props) => {
  const location = useLocation()
  const history = useHistory()
  const { category, subcategory, method } = match.params
  const [data, setData] = useState<Method>()
  const [paramInputs, setParamInputs] = useState<ParamFormatted[]>([])
  const [funcResult, setFuncResult] = useState<FuncResult>({
    message: 'Fill out the required params and click the "Run test" button.',
    level: 'info'
  })

  const requirements = [
    {
      key: 'isSigned',
      name: 'signed'
    },
    {
      key: 'isSubscription',
      name: 'a subscription'
    }
  ]

  useDidMount(() => {
    if (api.description[category]?.categories[subcategory]?.methods[method]) {
      setData(api.description[category].categories[subcategory].methods[method])
    }
  })

  useDidUpdate(() => {
    if (data && !_isEmpty(data)) {
      const paramsFormatted: ParamFormatted[] = data.params.map((o: Param) => ({
        ...o,
        value: ''
      }))

      setParamInputs(paramsFormatted)

      if (data.isSigned || data.isSubscription) {
        setFuncResult({
          message: "This function can't be tested.",
          level: 'error'
        })
      }
    }
  }, [data])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (paramInputs) {
      const paramsFormatted = _cloneDeep(paramInputs)

      paramsFormatted[idx].value = e.target.value
      setParamInputs(paramsFormatted)
    }
  }

  const handleRunTest = () => {
    if (_some(paramInputs, o => !o.isOptional && !o.value)) {
      setFuncResult({
        message: 'You have to fill out all the required params!',
        level: 'error'
      })
    } else {
      const params = paramInputs.map(o => o.value)
      const fn = api.promise[category][subcategory][method]

      if (data && !data.isConstant) {
        fn(...params)
          .then(res => {
            setFuncResult({
              message: JSON.stringify(res),
              level: 'result'
            })
          })
          .catch(err => {
            setFuncResult({
              message: JSON.stringify(err.message),
              level: 'error'
            })
          })
      } else {
        setFuncResult({
          message: JSON.stringify(fn),
          level: 'result'
        })
      }
    }
  }

  const handleReset = () => {
    setFuncResult({
      message: 'Fill out the required params and click the "Run test" button.',
      level: 'info'
    })
  }

  return category === 'consts' ? (
    <Redirect to="/explore-api" />
  ) : data ? (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>
          <div>
            <strong>
              {method}(
              {data.params && (
                <>
                  <span> {data.params.map(o => o.name).join(', ')} </span>
                </>
              )}
              )
            </strong>
            {data.description && <div>{data.description}</div>}
          </div>
          <div>
            {location?.state?.search && (
              <Button
                fluid
                theme="outline"
                text="< Back to search"
                onClick={() =>
                  history.push({
                    pathname: `/search/${location.state.search}`,
                    state: { routeName: 'Search' }
                  })
                }
              />
            )}
          </div>
        </S.CategoryName>
        <ExploreApiBreadcrumbs match={match} />
      </S.Title>
      {_isEmpty(data) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        <S.Content>
          <div>
            <S.Header>Can be tested?</S.Header>
            {requirements.map((item, idx) => (
              <S.Requirement key={`requirement-${idx}`} isOk={!data[item.key]}>
                <SVG
                  src={data[item.key] ? '/icons/close.svg' : '/icons/check.svg'}
                >
                  <img
                    src={
                      data[item.key] ? '/icons/close.svg' : '/icons/check.svg'
                    }
                    alt={data[item.key] ? 'not testable' : 'is testable'}
                  />
                </SVG>
                {data[item.key] ? `Is ${item.name}` : `Is not ${item.name}`}
              </S.Requirement>
            ))}
          </div>
          <div>
            <S.Header>Return type</S.Header>
            {data.type && <S.ReturnType>{data.type}</S.ReturnType>}
          </div>
          <S.Params>
            <S.Header>Params</S.Header>
            {_isEmpty(paramInputs) ? (
              <S.NoParams>
                This function doesn&apos;t have any params.
              </S.NoParams>
            ) : (
              paramInputs &&
              paramInputs.map((item, idx) => (
                <div key={`paramInput-${idx}`}>
                  <S.ParamName isOptional={item.isOptional}>
                    <strong>{item.name}:</strong>
                    {` ${item.type}`}
                    <span>{item.isOptional ? 'Optional' : 'Required!'}</span>
                  </S.ParamName>
                  {!data.isSigned && !data.isSubscription && (
                    <Input
                      fluid
                      value={item.value}
                      onChange={e => handleInputChange(e, idx)}
                    />
                  )}
                </div>
              ))
            )}
            <Button
              fluid
              disabled={data.isSigned || data.isSubscription}
              text={
                data.isSigned || data.isSubscription
                  ? 'Test unavailable'
                  : 'Run test'
              }
              onClick={handleRunTest}
              style={{ marginTop: '8px' }}
            />
          </S.Params>
          <div>
            <S.Header>Test result</S.Header>
            <S.FuncResult fluid padding="16px 24px" level={funcResult.level}>
              <button onClick={handleReset}>RESET</button>
              {funcResult.message}
            </S.FuncResult>
          </div>
        </S.Content>
      )}
    </S.Wrapper>
  ) : null
}

export default Method
