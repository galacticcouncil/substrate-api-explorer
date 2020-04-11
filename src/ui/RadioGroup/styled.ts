import styled from 'styled-components'

import { colors } from 'styles/variables'

export const Wrapper = styled.div``

export const Label = styled.div`
  margin-bottom: 24px;
  color: ${colors.gray[100]};
`

export const Option = styled.div<{
  [key: string]: any
}>`
  color: ${colors.gray[100]};
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 24px;
  }

  &:before {
    content: ' ';
    width: 16px;
    height: 16px;
    margin-right: 16px;
    border-radius: 50%;
    background: ${p => (p.active ? colors.primary : colors.gray[200])};
    transition: background 0.3s;
    display: block;
  }
`
