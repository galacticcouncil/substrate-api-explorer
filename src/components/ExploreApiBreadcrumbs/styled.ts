import styled from 'styled-components'
import { transparentize } from 'polished'
import { Link } from 'react-router-dom'

import { Colors } from 'styles/variables'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const Breadcrumb = styled(Link)<{
  to: string
}>`
  margin: 0 8px 4px 0;
  color: ${Colors.Gray[100]};
  display: flex;
  align-items: baseline;

  &:first-of-type {
    color: ${Colors.Primary};
  }

  &:last-of-type {
    margin-right: 24px;
  }

  &:hover {
    color: ${Colors.White};
    text-decoration: underline;
  }

  svg,
  img {
    width: 8px;
    height: 8px;
    margin-right: 8px;
    transform: rotate(-90deg);
  }

  svg path {
    fill: ${Colors.Gray[100]};
  }
`

export const JSONPath = styled.div`
  max-width: 100%;
  margin-bottom: 4px;
  font-family: 'Roboto Mono', sans-serif;
  color: ${transparentize(0.5, Colors.White)};
  overflow-wrap: break-word;
`
