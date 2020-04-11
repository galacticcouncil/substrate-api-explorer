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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

export const States = styled.div`
  margin-left: 8px;
  display: flex;
`

export const StatesItem = styled.div<{ type: string }>`
  width: 16px;
  height: 16px;
  margin-left: 8px;
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
    }
  }};
  border-radius: 50%;
  flex: none;
`
