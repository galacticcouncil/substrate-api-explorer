import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'

import { colors } from 'styles/variables'
import { device } from 'styles/media'

const fadeIn = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`

const smallPing = keyframes`
  10% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1);
  }
`

const bigPing = keyframes`
  10% {
    transform: scale(1.8);
  }

  20% {
    transform: scale(1);
  }
`

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${transparentize(0.1, colors.gray[400])};
  animation: ${fadeIn} 0.15s linear;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9100;
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  img {
    width: 210px;

    @media ${device.sm} {
      width: 250px;
    }
  }

  svg {
    overflow: visible;

    .a,
    .p,
    .i,
    .dot {
      transform-box: fill-box;
      transform-origin: center;
    }

    .a,
    .p,
    .i {
      animation: ${smallPing} 3s infinite;
    }

    .a {
    }

    .p {
      animation-delay: 0.5s;
    }

    .i {
      animation-delay: 1s;
    }

    .dot {
      animation: ${bigPing} 3s infinite;
      animation-delay: 2s;
    }
  }
`
