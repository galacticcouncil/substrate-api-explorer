import React, { useState, useRef } from 'react'
import { useDidMount, useDidUpdate } from 'react-hooks-lib'
import SVG from 'react-inlinesvg'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  type?: string
  fluid?: boolean
  name?: string
  disabled?: boolean
  label?: string
  placeholder?: string
  value: string
  required?: boolean
  focusOnMount?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onReset?: () => void
  className?: string
  style?: CSS.Properties
}

const Input = ({
  type = 'text',
  fluid,
  name,
  disabled,
  label,
  placeholder = '',
  value = '',
  required,
  focusOnMount,
  onChange,
  onReset,
  className = '',
  style
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [invalid, setInvalid] = useState<boolean>(false)

  useDidMount(() => {
    if (focusOnMount && inputRef?.current) inputRef.current.focus()
  })

  useDidUpdate(() => {
    if (required) setInvalid(!value.replace(/\s/g, ''))
  }, [value])

  return (
    <S.Wrapper fluid={fluid} className={className} style={style}>
      {label && <S.Label>{label}</S.Label>}
      <S.InputWrapper disabled={disabled} invalid={invalid}>
        <S.Input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div />
        {!!onReset && value && (
          <S.Reset disabled={disabled} onClick={disabled ? undefined : onReset}>
            <SVG src="/icons/close.svg">
              <img src="/icons/close.svg" alt="Reset" />
            </SVG>
          </S.Reset>
        )}
      </S.InputWrapper>
    </S.Wrapper>
  )
}

export default Input
