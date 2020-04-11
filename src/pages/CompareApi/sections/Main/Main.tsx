import React from 'react'
import { Match } from 'react-router-dom'
import _isEmpty from 'lodash/isEmpty'

import { ApiStateInterface, ApiDiffInterface } from 'types'
import { CompareApiLink } from 'components'

import * as S from './styled'

type Props = {
  api: ApiStateInterface
  apiDiff: ApiDiffInterface
  match: Match
}

const Main = ({ api, apiDiff, match }: Props) => (
  <S.Wrapper>
    {_isEmpty(api.compare.description) ? (
      <S.Empty>There&apos;s nothing in here 🤔</S.Empty>
    ) : (
      Object.keys(api.compare.description)
        .sort()
        .map((item, idx) => {
          const added = !!apiDiff.added[item]
          const deleted = !!apiDiff.deleted[item]
          const updated = !!apiDiff.updated[item]
          const isNew = added && !api.current.description[item]

          return (
            (added || deleted || updated) && (
              <CompareApiLink
                key={`compareApi-category-${idx}`}
                to={`${match.url}/${item}`}
                name={item}
                description={api.compare.description[item].description}
                states={{ added, deleted, updated, isNew }}
              />
            )
          )
        })
    )}
  </S.Wrapper>
)

export default Main
