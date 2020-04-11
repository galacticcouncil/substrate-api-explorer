import React from 'react'

import * as S from './styled'

type Param = {
  name: string
}

type States = {
  added?: boolean
  deleted?: boolean
  updated?: boolean
  isNew?: boolean
}

type Props = {
  to?: string | object
  name?: string
  params?: Param[]
  description?: string
  states?: States
}

const CompareApiLink = ({
  to = '/',
  name = 'undefined',
  params,
  description,
  states
}: Props) => (
  <S.Wrapper to={to}>
    <div>
      <strong>
        {name}
        {params && (
          <>
            (<span>{params.map(o => o.name).join(', ')}</span>)
          </>
        )}
      </strong>
      {description && (
        <>
          {' '}
          - <span>{description}</span>
        </>
      )}
    </div>
    {states && (
      <S.States>
        {states.added && (
          <S.StatesItem type={states.isNew ? 'isNew' : 'added'} />
        )}
        {states.deleted && <S.StatesItem type="deleted" />}
        {states.updated && <S.StatesItem type="updated" />}
      </S.States>
    )}
  </S.Wrapper>
)

export default CompareApiLink
