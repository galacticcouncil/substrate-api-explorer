import styled, { css } from 'styled-components'

import { colors } from 'styles/variables'

export const Wrapper = styled.button<{
  [key: string]: any
}>`
  min-width: ${p => (p.condensed ? '120px' : '140px')};
  max-width: 100%;
  width: ${p => p.fluid && '100%'};
  padding: ${p => (p.condensed ? '8px 16px' : '14px 24px')};
  border-radius: 50px;
  font-weight: 700;
  line-height: 17px;
  transition: transform 0.2s linear, opacity 0.3s, background 0.3s;

  &:not(:disabled):hover {
    transform: scale(1.03);
  }

  &:disabled {
    background: ${colors.gray[200]};
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${p => {
    switch (p.theme) {
      case 'primary':
        return css`
          background: ${colors.primary};
          color: ${colors.gray[400]};
        `

      case 'error':
        return css`
          background: ${colors.error};
          color: ${colors.white};
        `

      case 'outline':
        return css`
          border: 3px solid ${colors.gray[100]};
          color: ${colors.gray[100]};

          &:hover {
            border: 3px solid ${colors.primary};
            color: ${colors.primary};
          }
        `
    }
  }}
`
