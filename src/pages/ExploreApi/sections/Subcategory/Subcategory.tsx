import React from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiInterface } from 'types'
import {
  ExploreApiBreadcrumbs,
  ExploreApiLink,
  ExploreApiConst
} from 'components'

import * as S from './styled'

type Param = {
  name: string
}

type Method = {
  params?: Param[]
  description?: string
  type?: string
}

type Props = {
  api: ApiInterface
  match: Match
}

const Subcategory = ({ api, match }: Props) => {
  const { category, subcategory } = match.params

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>
          <div>
            <strong>{subcategory}</strong>
            <span>
              Available {category === 'consts' ? 'consts' : 'methods'}:
            </span>
          </div>
        </S.CategoryName>
        <ExploreApiBreadcrumbs match={match} />
      </S.Title>
      {/* We have to disable ESLint here because it doesn't
      play nicely with Prettier */}
      {/* eslint-disable indent */}
      {_isEmpty(api.description[category]?.categories[subcategory]?.methods) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        Object.entries(
          api.description[category]?.categories[subcategory]?.methods
        )
          .sort((a: [string, Method], b: [string, Method]) => {
            return a[0] < b[0] ? -1 : 1
          })
          .map((item: [string, Method], idx) =>
            category === 'consts' ? (
              <ExploreApiConst
                key={`exploreApi-const-${idx}`}
                name={item[0]}
                path={`api.consts.${subcategory}.${item[0]}`}
                type={item[1].type}
                description={item[1].description}
                value={JSON.stringify(
                  api.promise[category][subcategory][item[0]]
                )}
              />
            ) : (
              <ExploreApiLink
                key={`exploreApi-subcategory-${idx}`}
                to={`${match.url}/${item[0]}`}
                name={item[0]}
                params={item[1].params}
                description={item[1].description}
              />
            )
          )
      )}
      {/* eslint-enable indent */}
    </S.Wrapper>
  )
}

export default Subcategory
