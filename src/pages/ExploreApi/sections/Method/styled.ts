import styled from 'styled-components'
import { transparentize } from 'polished'

import { Card } from 'ui'
import { Colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  padding: 16px 0;

  @media ${device.lg} {
    padding: 0;
  }
`

export const Title = styled.div`
  color: ${Colors.Gray[100]};
`

export const CategoryName = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${Colors.Gray[200]};
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  strong {
    font-size: 24px;
    line-height: 32px;

    span {
      color: ${transparentize(0.3, Colors.Gray[100])};
      font-size: 18px;
    }
  }

  > div:last-of-type {
    margin: 32px 0 0;

    @media ${device.md} {
      margin: 0 0 0 32px;
    }
  }

  button {
    white-space: nowrap;
  }
`

export const Empty = styled.div`
  color: ${Colors.Gray[100]};
  font-size: 14px;
  font-weight: 400;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

  > div {
    @media ${device.md} {
      width: 50%;
    }
  }
`

export const Header = styled.div`
  margin: 48px 0 12px;
  color: ${Colors.Gray[100]}
  font-size: 18px;
`

export const Requirement = styled.div<{
  isOk: boolean
}>`
  color: ${p => (p.isOk ? Colors.Success : Colors.Error)};
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 12px;
  }

  svg,
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  path {
    fill: ${p => (p.isOk ? Colors.Success : Colors.Error)};
  }
`

export const ReturnType = styled.div`
  color: ${Colors.Mint};
  font-size: 16px;
  font-weight: 900;
`

export const Params = styled.div`
  @media ${device.md} {
    padding-right: 64px;
  }
`

export const NoParams = styled.div`
  margin-bottom: 24px;
  color: ${Colors.Gray[100]};
`

export const ParamName = styled.div<{
  isOptional: boolean
}>`
  margin-bottom: 8px;
  font-family: 'Roboto Mono', sans-serif;
  color: ${Colors.Almond};

  strong {
    color: ${Colors.Orange};
  }

  span {
    margin-left: 16px;
    color: ${p => (p.isOptional ? Colors.Mint : Colors.Error)};
  }
`

export const FuncResult = styled(Card)<{
  level: string
}>`
  min-height: 210px;
  border-radius: 8px;
  font-family: 'Roboto Mono', sans-serif;
  color: ${p => {
    switch (p.level) {
      case 'info':
        return Colors.Mint

      case 'error':
        return Colors.Error

      case 'result':
        return Colors.Orange

      default:
        return Colors.Mint
    }
  }};
  overflow-wrap: break-word;
  position: relative;

  @media ${device.md} {
    margin-top: 36px;
  }

  button {
    color: ${Colors.Gray[100]};
    font-weight: 900;
    letter-spacing: 2px;
    position: absolute;
    top: -22px;
    right: 0;
  }
`
