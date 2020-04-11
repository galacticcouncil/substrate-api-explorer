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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Content = styled.div`
  > div {
    color: ${Colors.Mint};

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }

    > strong {
      color: ${Colors.Almond};
    }

    > small {
      color: ${transparentize(0.5, Colors.White)};
    }

    > span {
      color: ${Colors.Orange};
    }
  }
`

export const Signature = styled.div`
  color: ${Colors.Warning};
  display: inline-block;

  span {
    color: ${Colors.Almond};
  }

  strong {
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
      case 'isNew':
        return Colors.Mint

      case 'isAltered':
        return Colors.Purple
    }
  }};
  border-radius: 50%;
  flex: none;
`
