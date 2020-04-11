import React, { useState, useEffect } from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux'

import { apiSelector } from 'selectors'
import { ExploreApiLink, ExploreApiSearch } from 'components'

import * as S from './styled'

type Props = {
  match: Match
}

const Search = ({ match }: Props) => {
  const api = useSelector(apiSelector)
  const { searchQuery } = match.params
  const [foundItems, setFoundItems] = useState<[string, string][]>([])

  const handleSearch = () => {
    const regex = new RegExp(
      '^(?=.*' +
        decodeURIComponent(searchQuery)
          .trim()
          .split(' ')
          .join(')(?=.*') +
        ').*$',
      'gi'
    )

    const foundItems = api.current.search.filter(([path, description]) => {
      return regex.test(path + description)
    })

    setFoundItems(foundItems)
  }

  useEffect(handleSearch, [searchQuery])

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>Search API</S.CategoryName>
        <S.Search>
          <ExploreApiSearch focusOnMount query={searchQuery} />
        </S.Search>
      </S.Title>
      {_isEmpty(foundItems) ? (
        <S.Empty>Nothing was found 🤔</S.Empty>
      ) : (
        foundItems.sort().map((item, idx) => {
          const link = item[0].split('.')

          return (
            <ExploreApiLink
              key={`searchResult-${idx}`}
              to={{
                pathname: `/explore-api/${link[1]}/${link[2]}/${link[3]}`,
                state: { routeName: 'Search', search: searchQuery }
              }}
              name={item[0]}
              description={item[1]}
            />
          )
        })
      )}
    </S.Wrapper>
  )
}

export default Search
