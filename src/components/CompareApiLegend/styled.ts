import styled from 'styled-components'

import { Colors } from 'styles/variables'

export const Wrapper = styled.div`
  color: ${Colors.Gray[100]};

  strong {
    margin-bottom: 4px;
    display: block;
  }
`

export const PropertyState = styled.div<{
  type: string
}>`
  margin-top: 12px;
  display: flex;
  align-items: center;

  div {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background: ${p => {
      switch (p.type) {
        case 'added':
          return Colors.Success

        case 'deleted':
          return Colors.Error

        case 'updated':
          return Colors.Warning

        case 'isNew':
          return Colors.Mint

        case 'isAltered':
          return Colors.Purple

        default:
          return Colors.Gray[300]
      }
    }};
    border-radius: 50%;
    flex: none;
  }
`
