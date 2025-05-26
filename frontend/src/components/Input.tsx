import React from 'react'
import { styled } from '@stitches/react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const FieldWrapper = styled('div', {
  margin: '0.5rem 0',
  width: '100%',
})

const StyledLabel = styled('label', {
  display: 'block',
  marginBottom: '0.25rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '$gray11',
})

const StyledInput = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',
  padding: '0.5rem',
  border: '1px solid $gray6',
  borderRadius: '0.375rem',
  width: '100%',
  fontSize: '1rem',
  '&:focus': {
    borderColor: '$primary',
    boxShadow: `0 0 0 2px $accent`,
  },
  '&::placeholder': {
    color: '$gray9',
  },
})

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <FieldWrapper>
    {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    <StyledInput id={id} {...props} />
  </FieldWrapper>
)

export default Input
