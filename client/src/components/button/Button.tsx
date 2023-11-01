import React from 'react'

export interface IButtonProps {
  label: string
  onClick?: () => void
}

const Button = (props: IButtonProps) => {
  const { label, onClick } = props

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#4A96FF] hover:bg-blue-700 text-white py-3 rounded"
    >
      <p className="text-[#FFF] font-medium font-sans text-base text-center">
        {label}
      </p>
    </button>
  )
}

export default Button
