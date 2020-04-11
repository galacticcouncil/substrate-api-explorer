import styled from 'styled-components'

import { Colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  padding: 16px 0;

  @media ${device.lg} {
    padding: 0;
  }
`

export const Search = styled.div`
  margin: 24px 0 0;

  @media ${device.md} {
    margin: 0 0 0 32px;
  }
`

export const Empty = styled.div`
  color: ${Colors.Gray[100]};
  font-size: 14px;
  font-weight: 400;
`
