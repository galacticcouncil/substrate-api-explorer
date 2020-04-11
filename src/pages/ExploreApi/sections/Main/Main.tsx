import React from 'react'
import { Match, useLocation } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiInterface } from 'types'
import { ExploreApiLink, ExploreApiSearch } from 'components'

import * as S from './styled'

type Props = {
  api: ApiInterface
  match: Match
}

const Main = ({ api, match }: Props) => {
  const location = useLocation()

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>{api.url}</S.CategoryName>
        <S.Search>
          <ExploreApiSearch focusOnMount={location?.state?.fromSearch} />
        </S.Search>
      </S.Title>
      {_isEmpty(api.description) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        Object.keys(api.description)
          .sort()
          .map((item, idx) => (
            <ExploreApiLink
              key={`exploreApi-category-${idx}`}
              to={`${match.url}/${item}`}
              name={item}
              description={api.description[item].description}
            />
          ))
      )}
    </S.Wrapper>
  )
}

export default Main
