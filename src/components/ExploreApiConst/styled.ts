import styled from 'styled-components'
import { transparentize } from 'polished'

import { Colors } from 'styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
  padding: 16px 24px;
  background: ${Colors.Gray[300]};
  border-radius: 8px;
  font-family: 'Roboto Mono', sans-serif;
  color: ${Colors.Gray[100]};
  display: block;

  div {
    color: ${Colors.Mint};

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }

    strong {
      color: ${Colors.Almond};
    }

    small {
      color: ${transparentize(0.5, Colors.White)};
    }

    span {
      color: ${Colors.Orange};
    }
  }
`
