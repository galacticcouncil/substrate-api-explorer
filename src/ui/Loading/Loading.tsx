import React from 'react'
import SVG from 'react-inlinesvg'

import * as S from './styled'

const Loading = () => (
  <S.Wrapper>
    <SVG src="/images/logo.svg">
      <img src="/images/logo.svg" alt="Loading..." />
    </SVG>
  </S.Wrapper>
)

export default Loading
