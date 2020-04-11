import React from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiInterface } from 'types'
import { ExploreApiBreadcrumbs, ExploreApiLink } from 'components'

import * as S from './styled'

type Method = {
  description?: string
}

type Props = {
  api: ApiInterface
  match: Match
}

const Category = ({ api, match }: Props) => {
  const { category } = match.params

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>
          <strong>{category}</strong>
          <S.SearchPlaceholder />
        </S.CategoryName>
        <ExploreApiBreadcrumbs match={match} />
      </S.Title>
      {_isEmpty(api.description[category]) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        Object.entries(api.description[category].categories)
          .sort((a: [string, Method], b: [string, Method]) => {
            return a[0] < b[0] ? -1 : 1
          })
          .map((item: [string, Method], idx) => (
            <ExploreApiLink
              key={`exploreApi-subcategory-${idx}`}
              to={`${match.url}/${item[0]}`}
              name={item[0]}
              description={item[1].description}
            />
          ))
      )}
    </S.Wrapper>
  )
}

export default Category
