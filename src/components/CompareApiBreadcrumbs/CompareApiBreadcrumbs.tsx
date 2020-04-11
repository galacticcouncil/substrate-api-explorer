import React, { useState, useEffect } from 'react'
import { Match } from 'react-router-dom'
import SVG from 'react-inlinesvg'

import * as S from './styled'

type Step = {
  name: string
  href: string
}

type Props = {
  apiName?: string
  match: Match
}

const CompareApiBreadcrumbs = ({ apiName, match }: Props) => {
  const [steps, setSteps] = useState<Step[]>()

  useEffect(() => {
    const stepsArray = match.url.split('/').slice(2)
    const stepsFormatted = stepsArray.map((item, idx) => ({
      name: item,
      href: `/compare-api/${stepsArray.slice(0, idx + 1).join('/')}`
    }))

    setSteps(stepsFormatted)
  }, [match.url])

  return steps ? (
    <S.Wrapper>
      <S.Breadcrumb to="/compare-api">{apiName || 'api'}</S.Breadcrumb>
      {steps.map((item, idx) => (
        <S.Breadcrumb key={`breakcrumb-${idx}`} to={item.href}>
          <SVG src="/icons/arrow-down.svg">
            <img src="/icons/arrow-down.svg" alt=">" />
          </SVG>
          {item.name}
        </S.Breadcrumb>
      ))}
      <S.JSONPath>
        (api.
        {match.url
          .split('/')
          .slice(2)
          .join('.')}
        )
      </S.JSONPath>
    </S.Wrapper>
  ) : null
}

export default CompareApiBreadcrumbs
