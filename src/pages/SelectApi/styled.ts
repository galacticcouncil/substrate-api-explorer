import styled from 'styled-components'

import { colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  @media ${device.md} {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

export const Inner = styled.div`
  max-width: 100%;
`

export const Form = styled.div`
  padding-bottom: 40px;
`

export const Version = styled.div`
  color: ${colors.gray[100]};
  font-weight: 700;
  text-align: center;
`
