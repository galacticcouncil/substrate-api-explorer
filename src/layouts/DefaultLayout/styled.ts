import styled from 'styled-components'
import { transparentize } from 'polished'
import { NavLink } from 'react-router-dom'

import { colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  height: 100vh;
  background: ${colors.gray[400]};
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80px auto 80px;

  @media ${device.md} {
    grid-template-columns: 96px auto;
    grid-template-rows: 96px auto;
  }
`

export const Sidebar = styled.div`
  background: ${colors.gray[300]};
  box-shadow: 0 0 32px ${transparentize(0.9, colors.black)};
  grid-row-end: span 2;
  display: grid;
  grid-template-rows: 96px auto;
  justify-items: center;
`

export const Logo = styled.div`
  width: 88px;
  background: ${colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.md} {
    width: 64px;
    border-bottom: 1px solid ${transparentize(0.95, colors.white)};
  }

  img {
    max-width: 48px;
  }
`

export const Menu = styled.nav`
  min-width: 128px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.md} {
    min-width: initial;
    padding: 24px 0;
    flex-direction: column;
    justify-content: flex-start;
  }

  a {
    width: 48px;
    height: 48px;
  }
`

export const MenuLink = styled(NavLink)`
  margin: 0 8px;
  border-radius: 12px;
  color: ${transparentize(0.5, colors.white)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.custom('min-width: 410px')} {
    margin: 0 16px;
  }

  @media ${device.md} {
    margin: 0 0 32px 0;
  }

  &:hover {
    color: ${colors.white};

    div {
      opacity: 1;
    }
  }

  &.active {
    background: ${transparentize(0.9, colors.white)};
    color: ${colors.white};
  }

  svg {
    max-width: 20px;
    max-height: 20px;

    path {
      fill: currentColor;
    }
  }

  div {
    padding: 8px 12px;
    background: ${transparentize(0.15, colors.black)};
    border-radius: 10px;
    color: ${colors.gray[100]};
    white-space: nowrap;
    opacity: 0;
    transform: translateY(-50%);
    transition: opacity 0.3s;
    position: absolute;
    top: 50%;
    left: calc(100% + 8px);
    z-index: 100;
    pointer-events: none;
    display: none;

    @media ${device.md} {
      display: block;
    }
  }
`

export const GalacticCouncil = styled.a`
  color: ${colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.md} {
    margin: auto 0 0;
  }

  svg,
  img {
    max-width: 56px;
    max-height: 48px;
  }

  path {
    fill: ${colors.primary};
  }
`

export const PageTitle = styled.div`
  padding: 0 20px;
  background: ${colors.gray[300]};
  border-bottom: 1px solid ${colors.gray[300]};
  color: ${colors.primary};
  font-weight: 900;
  font-size: 24px;
  line-height: 33px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  @media ${device.md} {
    padding: 0 72px;
    background: transparent;
    justify-content: flex-start;
  }
`

export const MobileHeader = styled.div`
  box-shadow: 0px 0px 16px ${transparentize(0.75, colors.black)};
  position: relative;
  z-index: 100;
  display: flex;
`

export const MobileFooter = styled.div`
  background: ${colors.gray[300]};
  box-shadow: 0px 0px 16px ${transparentize(0.75, colors.black)};
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  padding: 32px 20px;
  overflow-x: hidden;
  overflow-y: auto;

  @media ${device.md} {
    padding: 40px 72px;
    flex: 1;
  }

  ::-webkit-scrollbar-track {
    background: ${transparentize(0.9, colors.white)};
    border-radius: 50px;
  }

  ::-webkit-scrollbar {
    width: 7px;
    background: ${transparentize(0.9, colors.white)};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${transparentize(0.8, colors.white)};
    border-radius: 50px;
    -webkit-box-shadow: inset 0 0 6px ${transparentize(0.8, colors.white)};
  }
`
