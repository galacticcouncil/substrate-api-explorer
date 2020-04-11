import React from 'react'

import * as S from './styled'

type Param = {
  name: string
}

type Props = {
  to?: string | object
  name?: string
  params?: Param[]
  description?: string
}

const ExploreApiLink = ({
  to = '/',
  name = 'undefined',
  params,
  description
}: Props) => (
  <S.Wrapper to={to}>
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
  </S.Wrapper>
)

export default ExploreApiLink
