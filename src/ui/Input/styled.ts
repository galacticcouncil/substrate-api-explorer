import styled from 'styled-components'

import { colors } from 'styles/variables'

export const Wrapper = styled.div<{
  [key: string]: any
}>`
  max-width: 100%;
  width: ${p => (p.fluid ? '100%' : '344px')};
  margin-bottom: 24px;
  color: ${colors.gray[100]};
`

export const Label = styled.div`
  margin-bottom: 24px;
`

export const InputWrapper = styled.div<{
  [key: string]: any
}>`
  opacity: ${p => p.disabled && '0.5'};
  position: relative;
  display: flex;
  align-items: flex-start;

  > div:before,
  > div:after {
    content: ' ';
    height: 4px;
    border-radius: 2px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > div:before {
    background: ${colors.gray[200]};
  }

  > div:after {
    background: ${colors.primary};
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.2s ease-in;
  }
`

export const Input = styled.input<{
  [key: string]: any
}>`
  padding: 0 0 12px 0;
  color: ${colors.gray[100]};
  line-height: 20px;
  flex: 1;

  &:focus + div:after {
    transform: scaleX(1);
  }
`

export const Reset = styled.button`
  padding: 4px 0;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};

  &:hover path {
    fill: ${p => !p.disabled && colors.white};
  }

  svg,
  img {
    width: 15px;
    height: 15px;
    margin-top: -2px;
    display: block;
  }

  path {
    fill: ${colors.gray[100]};
  }
`
