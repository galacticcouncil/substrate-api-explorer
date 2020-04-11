import styled from 'styled-components'

import { Input } from 'ui'
import { Colors } from 'styles/variables'
import { device } from 'styles/media'

export const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid ${Colors.Gray[200]};
  color: ${Colors.Gray[100]};
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const ApiName = styled.div`
  font-size: 18px;
  word-break: break-all;

  small {
    margin-bottom: 8px;
    font-size: 11px;
    display: block;
  }
`

export const Legend = styled.div`
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid ${Colors.Gray[200]};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Form = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 400px);
  grid-column-gap: 128px;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 40px;
  }
`

export const FormInput = styled(Input)`
  width: 100%;
  margin: 16px 0 0;
`
