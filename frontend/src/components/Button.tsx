import React from 'react'
import { styled } from '@stitches/react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

const StyledButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  fontWeight: 500,
  borderRadius: '0.375rem',
  padding: '0.5rem 1rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s, color 0.2s',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        '&:hover': { backgroundColor: '$accent' },
      },
      outline: {
        backgroundColor: 'transparent',
        border: '1px solid $primary',
        color: '$primary',
        '&:hover': { backgroundColor: '$primary', color: 'white' },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
        '&:hover': { backgroundColor: '$gray2' },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
