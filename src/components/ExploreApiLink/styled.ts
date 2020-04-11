import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Colors } from 'styles/variables'

export const Wrapper = styled(Link)`
  width: 100%;
  margin-bottom: 8px;
  padding: 16px 24px;
  background: ${Colors.Gray[300]};
  border-radius: 8px;
  font-family: 'Roboto Mono', sans-serif;
  color: ${Colors.Gray[100]};
  display: block;
  cursor: pointer;

  &:hover {
    background: ${Colors.Gray[200]};
  }

  strong {
    color: ${Colors.Orange};

    span {
      color: ${Colors.Almond};
    }
  }

  span {
    color: ${Colors.Mint};
  }
`
