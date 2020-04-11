import React from 'react'

import * as S from './styled'

type Existence = {
  main?: boolean
  comparison?: boolean
}

type Param = {
  name: string
}

type States = {
  isNew?: boolean
  isAltered?: boolean
}

type Props = {
  name: string
  path: string
  exists?: Existence
  mainApiParams?: Param[]
  comparisonApiParams?: Param[]
  mainApiType?: string
  comparisonApiType?: string
  description?: string
  states?: States
}

const CompareApiCard = ({
  name = 'undefined',
  path,
  exists,
  mainApiParams,
  comparisonApiParams,
  mainApiType,
  comparisonApiType,
  description,
  states
}: Props) => (
  <S.Wrapper>
    <S.Content>
      <div>
        <span>path:</span> {path}
      </div>
      {exists?.main && (
        <div>
          <span>main api:</span>{' '}
          <S.Signature>
            {name}
            {mainApiParams?.length && (
              <>
                (<span>{mainApiParams.map(o => o.name).join(', ')}</span>)
              </>
            )}
            <strong>: {mainApiType || 'unknown'}</strong>
          </S.Signature>
        </div>
      )}
      {exists?.comparison && (
        <div>
          <span>comparison api:</span>{' '}
          <S.Signature>
            {name}
            {comparisonApiParams?.length && (
              <>
                (<span>{comparisonApiParams.map(o => o.name).join(', ')}</span>)
              </>
            )}
            <strong>: {comparisonApiType || 'unknown'}</strong>
          </S.Signature>
        </div>
      )}
      {description && (
        <div>
          <span>description:</span> {description}
        </div>
      )}
    </S.Content>
    {states && (
      <S.States>
        {states.isNew && <S.StatesItem type="isNew" />}
        {states.isAltered && <S.StatesItem type="isAltered" />}
      </S.States>
    )}
  </S.Wrapper>
)

export default CompareApiCard
