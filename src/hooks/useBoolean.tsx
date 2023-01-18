import React, { useState } from 'react'

interface ReturnType {
  toggleIsOpen: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const useBoolean = (value: boolean = false): ReturnType => {
  const [isOpen, setIsOpen] = useState(value)

  const toggleIsOpen = () => setIsOpen(prev => !prev)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { toggleIsOpen, open, close, isOpen}
}

export default useBoolean