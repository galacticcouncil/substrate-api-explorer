import React from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiStateInterface, ApiDiffInterface } from 'types'
import { CompareApiBreadcrumbs, CompareApiCard } from 'components'

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
  api: ApiStateInterface
  apiDiff: ApiDiffInterface
  match: Match
}

const Subcategory = ({ api, apiDiff, match }: Props) => {
  const { category, subcategory } = match.params

  return (
    <S.Wrapper>
      <S.Title>
        <S.CategoryName>{subcategory}</S.CategoryName>
        <CompareApiBreadcrumbs apiName={api.compare.url} match={match} />
      </S.Title>
      {/* We have to disable ESLint here because it doesn't
      play nicely with Prettier */}
      {/* eslint-disable indent */}
      {_isEmpty(
        api.compare.description[category]?.categories[subcategory]?.methods
      ) ? (
        <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
      ) : (
        Object.entries(
          api.compare.description[category]?.categories[subcategory]?.methods
        )
          .sort((a: [string, Method], b: [string, Method]) => {
            return a[0] < b[0] ? -1 : 1
          })
          .map((item: [string, Method], idx) => {
            const main =
              api.current.description[category]?.categories[subcategory]
                ?.methods[item[0]]
            const comparison =
              api.compare.description[category]?.categories[subcategory]
                ?.methods[item[0]]
            const isNew = !main
            const isAltered = !!apiDiff.updated[category]?.categories[
              subcategory
            ]?.methods[item[0]]

            return (
              <CompareApiCard
                key={`compareApi-${subcategory}-method-${idx}`}
                name={item[0]}
                path={`api.${category}.${subcategory}.${item[0]}`}
                exists={{ main: !!main, comparison: !!comparison }}
                mainApiParams={main?.params}
                comparisonApiParams={comparison?.params}
                mainApiType={main?.type}
                comparisonApiType={comparison?.type}
                description={item[1].description}
                states={{ isNew, isAltered }}
              />
            )
          })
      )}
      {!_isEmpty(
        apiDiff.deleted[category]?.categories[subcategory]?.methods
      ) && (
        <>
          <S.DividerTitle>Missing in the comparison API</S.DividerTitle>
          {Object.keys(
            apiDiff.deleted[category]?.categories[subcategory]?.methods
          )
            .sort((a: string, b: string) => {
              return a < b ? -1 : 1
            })
            .map((item: string, idx) => {
              const main =
                api.current.description[category]?.categories[subcategory]
                  ?.methods[item]

              return (
                <CompareApiCard
                  key={`compareApi-${subcategory}-missing-${idx}`}
                  name={item}
                  path={`api.${category}.${subcategory}.${item}`}
                  exists={{ main: !!main, comparison: false }}
                  mainApiParams={main?.params}
                  mainApiType={main?.type}
                  description={main?.description}
                />
              )
            })}
        </>
      )}
      {/* eslint-enable indent */}
    </S.Wrapper>
  )
}

export default Subcategory
