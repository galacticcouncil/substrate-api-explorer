import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SVG from 'react-inlinesvg'

import { Dropdown } from 'ui'

import * as S from './styled'

type Link = {
  name: string
  icon: string
  href: string
  exact?: boolean
}

type Props = {
  forceActive?: boolean
  links?: Link[]
}

const MobileNav = ({ forceActive, links = [] }: Props) => {
  const history = useHistory()
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleLogoClick = () => {
    setIsActive(false)
    history.push('/')
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo src="/images/logo.svg" onClick={handleLogoClick} />
        <S.Hamburger
          active={forceActive || isActive}
          onClick={() => setIsActive(!isActive)}
        >
          <span />
        </S.Hamburger>
      </S.Header>
      <Dropdown isOpen={forceActive || isActive}>
        {links.map((item, idx) => (
          <S.MenuLink
            key={`menuLink-${idx}`}
            to={item.href}
            activeClassName="active"
            onClick={() => setIsActive(false)}
            exact={item.exact}
          >
            <SVG src={item.icon}>
              <img src={item.icon} alt={item.href} />
            </SVG>
            <div>{item.name}</div>
          </S.MenuLink>
        ))}
        <S.GalacticCouncil
          href="https://galacticcouncil.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsActive(false)}
        >
          <SVG src="/images/gc-logotype.svg">
            <img src="/images/gc-logotype.svg" alt="Galactic Council" />
          </SVG>
          <div>Visit Our Website</div>
        </S.GalacticCouncil>
      </Dropdown>
    </S.Wrapper>
  )
}

export default MobileNav
