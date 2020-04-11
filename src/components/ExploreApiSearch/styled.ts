import styled from 'styled-components'

import { Input } from 'ui'
import { device } from 'styles/media'

export const Wrapper = styled(Input)`
  width: 100%;
  margin-bottom: 0;

  @media ${device.md} {
    width: 350px;
  }
`
