import React, { MouseEvent } from 'react'
import { Button } from './CustomButton.styles'

interface ButtonProps {
  text: string,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const CustomButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <Button onClick={onClick}>{text}</Button>
  )
}

export default CustomButton