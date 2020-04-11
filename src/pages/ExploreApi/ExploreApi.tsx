import React from 'react'
import { Match, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { apiSelector } from 'selectors'

import { Main, Category, Subcategory, Method } from './sections'

import * as S from './styled'

type Props = {
  match: Match
}

const ExploreApi = ({ match }: Props) => {
  const { current } = useSelector(apiSelector)
  window['currentAPI'] = current

  return (
    <S.Wrapper>
      <Switch>
        {current.loaded && (
          <>
            <Route
              path={match.path}
              exact
              render={(props) => <Main api={current} {...props} />}
            />
            <Route
              path={`${match.path}/:category`}
              exact
              render={(props) => <Category api={current} {...props} />}
            />
            <Route
              path={`${match.path}/:category/:subcategory`}
              exact
              render={(props) => <Subcategory api={current} {...props} />}
            />
            <Route
              path={`${match.path}/:category/:subcategory/:method`}
              exact
              render={(props) => <Method api={current} {...props} />}
            />
          </>
        )}
      </Switch>
    </S.Wrapper>
  )
}

export default ExploreApi
