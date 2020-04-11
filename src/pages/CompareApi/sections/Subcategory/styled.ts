import styled from 'styled-components'

import { Colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  padding-bottom: 16px;

  @media ${device.lg} {
    padding: 0;
  }
`

export const Title = styled.div`
  margin-bottom: 28px;
  color: ${Colors.Gray[100]};
`

export const CategoryName = styled.div`
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid ${Colors.Gray[200]};
  font-size: 24px;
  line-height: 32px;
`

export const Empty = styled.div`
  color: ${Colors.Gray[100]};
  font-size: 14px;
  font-weight: 400;
`

export const DividerTitle = styled.div`
  padding: 50px 0 28px;
  color: ${Colors.Gray[100]};
  font-size: 24px;
  line-height: 32px;
`
