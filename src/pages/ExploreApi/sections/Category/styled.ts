import styled from 'styled-components'

import { Colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  padding: 16px 0;

  @media ${device.lg} {
    padding: 0;
  }
`

export const Title = styled.div`
  margin-bottom: 40px;
  color: ${Colors.Gray[100]};
`

export const CategoryName = styled.div`
  margin-bottom: 16px;
  padding-bottom: 28px;
  border-bottom: 1px solid ${Colors.Gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 24px;
    line-height: 32px;
  }
`

export const SearchPlaceholder = styled.div`
  height: 39px;
`

export const Empty = styled.div`
  color: ${Colors.Gray[100]};
  font-size: 14px;
  font-weight: 400;
`
