import React from 'react'

import * as S from './styled'

type Props = {
  name: string
  path: string
  type?: string
  description?: string
  value?: string
}

const ExploreApiConst = ({
  name = 'undefined',
  path,
  type,
  description,
  value
}: Props) => (
  <S.Wrapper>
    <div>
      <span>name:</span>{' '}
      <strong>
        {name} {path && <small>({path})</small>}
      </strong>
    </div>
    {type && (
      <div>
        <span>type:</span> {type}
      </div>
    )}
    {description && (
      <div>
        <span>description:</span> {description}
      </div>
    )}
    {value && (
      <div>
        <span>value:</span> {value}
      </div>
    )}
  </S.Wrapper>
)

export default ExploreApiConst
