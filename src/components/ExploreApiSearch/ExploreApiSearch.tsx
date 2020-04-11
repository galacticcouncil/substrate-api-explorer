import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useDebounce } from 'hooks'

import * as S from './styled'

type Props = {
  focusOnMount?: boolean
  query?: string
  storybookDemo?: boolean
}

const ExploreApiSearch = ({ focusOnMount, query, storybookDemo }: Props) => {
  const historyHook = useHistory()
  const history = storybookDemo ? {} : historyHook

  const [searchQuery, setSearchQuery] = useState<string>(
    query ? decodeURIComponent(query) : ''
  )

  const handleRedirectBack = () => {
    if (storybookDemo) {
      setSearchQuery('')
    } else {
      history.push({
        pathname: '/explore-api',
        state: { routeName: 'Explore API', fromSearch: true }
      })
    }
  }

  const handleSearch = () => {
    if (!storybookDemo) {
      if (decodeURIComponent(searchQuery).trim()) {
        history.push({
          pathname: `/search/${encodeURIComponent(searchQuery.trim())}`,
          state: { routeName: 'Search' }
        })
      } else {
        handleRedirectBack()
      }
    }
  }

  useDebounce(400, handleSearch, [searchQuery])

  return (
    <S.Wrapper
      focusOnMount={focusOnMount}
      placeholder="Search API..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      onReset={handleRedirectBack}
    />
  )
}

export default ExploreApiSearch
