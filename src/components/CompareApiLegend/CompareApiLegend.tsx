import React from 'react'

import * as S from './styled'

const states = [
  {
    type: 'added',
    text: 'Has some additional methods/consts'
  },
  {
    type: 'deleted',
    text: 'Is missing some methods/consts'
  },
  {
    type: 'updated',
    text: 'Has some altered methods/consts'
  },
  {
    type: 'isNew',
    text: 'Is a new property'
  },
  {
    type: 'isAltered',
    text: 'Is an altered property'
  }
]

const CompareApiLegend = () => (
  <S.Wrapper>
    <strong>How is a property different in the comparison API:</strong>
    {states.map((item, idx) => (
      <S.PropertyState key={`legend-state-${idx}`} type={item.type}>
        <div />
        <span>{item.text}</span>
      </S.PropertyState>
    ))}
  </S.Wrapper>
)

export default CompareApiLegend
