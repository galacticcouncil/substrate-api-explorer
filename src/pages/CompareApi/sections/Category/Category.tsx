import React from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiStateInterface, ApiDiffInterface } from 'types'
import { CompareApiBreadcrumbs, CompareApiLink } from 'components'

import * as S from './styled'

type Method = {
  description?: string
}

type Props = {
  api: ApiStateInterface
  apiDiff: ApiDiffInterface
  match: Match
}

const Category = ({ api, apiDiff, match }: Props) => {
  const { category } = match.params

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>{category}</S.CategoryName>
        <CompareApiBreadcrumbs apiName={api.compare.url} match={match} />
      </S.Title>
      {_isEmpty(api.compare.description[category]) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        Object.entries(api.compare.description[category].categories)
          .sort((a: [string, Method], b: [string, Method]) => {
            return a[0] < b[0] ? -1 : 1
          })
          .map((item: [string, Method], idx) => {
            const added = !!apiDiff.added[category]?.categories[item[0]]
            const deleted = !!apiDiff.deleted[category]?.categories[item[0]]
            const updated = !!apiDiff.updated[category]?.categories[item[0]]
            const isNew =
              added && !api.current.description[category]?.categories[item[0]]

            return (
              (added || deleted || updated) && (
                <CompareApiLink
                  key={`compareApi-subcategory-${idx}`}
                  to={`${match.url}/${item[0]}`}
                  name={item[0]}
                  description={item[1].description}
                  states={{ added, deleted, updated, isNew }}
                />
              )
            )
          })
      )}
    </S.Wrapper>
  )
}

export default Category
