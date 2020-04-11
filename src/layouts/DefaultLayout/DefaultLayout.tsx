import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SVG from 'react-inlinesvg'

import { apiSelector } from 'selectors'
import { useMediaQuery } from 'hooks'

import { device } from 'styles/media'
import * as S from './styled'

type Props = {
  forceShowSidebar?: boolean
  children: React.ReactNode[] | React.ReactNode | string
}

const DefaultLayout = ({ forceShowSidebar, children }: Props) => {
  const location = useLocation()
  const api = useSelector(apiSelector)
  const isDesktop = useMediaQuery(device.md)

  const links = [
    {
      name: 'Select API',
      icon: '/icons/refresh.svg',
      href: '/',
      exact: true,
    },
    {
      name: 'Explore API',
      icon: '/icons/search.svg',
      href: '/explore-api',
      exact: false,
    },
    {
      name: 'Compare API',
      icon: '/icons/compare.svg',
      href: '/compare-api',
      exact: false,
    },
    {
      name: 'Contact us',
      icon: '/icons/mail.svg',
      href: '/contact',
      exact: true,
    },
  ]

  return (
    <S.Wrapper>
      {isDesktop ? (
        <>
          <S.Sidebar>
            <S.Logo>
              <img src="/images/logo.svg" alt="API Explorer" />
            </S.Logo>
            <S.Menu>
              {links.map(
                (item, idx) =>
                  (forceShowSidebar ||
                    api.current.loaded ||
                    item.href === '/') && (
                    <S.MenuLink
                      key={`menuLink-${idx}`}
                      to={{
                        pathname: item.href,
                        state: { routeName: item.name },
                      }}
                      activeClassName="active"
                      exact={item.exact}
                    >
                      <SVG src={item.icon}>
                        <img src={item.icon} alt={item.href} />
                      </SVG>
                      <div>{item.name}</div>
                    </S.MenuLink>
                  )
              )}
              <S.GalacticCouncil
                href="https://galacticcouncil.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>by</span>
                <SVG src="/images/gc-small.svg">
                  <img src="/images/gc-small.svg" alt="Galactic Council" />
                </SVG>
              </S.GalacticCouncil>
            </S.Menu>
          </S.Sidebar>
          <S.PageTitle>{location.state?.routeName}</S.PageTitle>
        </>
      ) : (
        <S.MobileHeader>
          <S.Logo>
            <img src="/images/logo.svg" alt="API Explorer" />
          </S.Logo>
          <S.PageTitle>{location.state?.routeName}</S.PageTitle>
        </S.MobileHeader>
      )}
      <S.Content>{children}</S.Content>
      {!isDesktop && (
        <S.MobileFooter>
          <S.Menu>
            {links.map(
              (item, idx) =>
                (forceShowSidebar ||
                  api.current.loaded ||
                  item.href === '/') && (
                  <S.MenuLink
                    key={`menuLink-${idx}`}
                    to={{
                      pathname: item.href,
                      state: { routeName: item.name },
                    }}
                    activeClassName="active"
                    exact={item.exact}
                  >
                    <SVG src={item.icon}>
                      <img src={item.icon} alt={item.href} />
                    </SVG>
                    <div>{item.name}</div>
                  </S.MenuLink>
                )
            )}
            <S.GalacticCouncil
              href="https://galacticcouncil.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>by</span>
              <SVG src="/images/gc-small.svg">
                <img src="/images/gc-small.svg" alt="Galactic Council" />
              </SVG>
            </S.GalacticCouncil>
          </S.Menu>
        </S.MobileFooter>
      )}
    </S.Wrapper>
  )
}

export default DefaultLayout
