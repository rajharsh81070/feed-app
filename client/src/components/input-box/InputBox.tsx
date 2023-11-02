import React, { HTMLInputTypeAttribute, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export interface IInputBoxProps {
  id: string
  name: string
  value: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required?: boolean
  primaryLabel: string
  secondaryLabel?: string
  onSecondaryLabelClick?: () => void
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = (props: IInputBoxProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    id,
    primaryLabel,
    name,
    placeholder,
    type,
    required,
    value,
    secondaryLabel,
    onSecondaryLabelClick,
    onInputChange,
  } = props

  return (
    <div className="flex-shrink-0 flex flex-col items-start gap-2 min-w-full">
      <div className="w-full flex justify-between">
        <p className="text-[#C5C7CA] font-sans font-medium text-sm">
          {primaryLabel}
        </p>
        {secondaryLabel && onSecondaryLabelClick && (
          <p
            onClick={onSecondaryLabelClick}
            className="text-[#C5C7CA] font-sans font-medium text-xs text-right hover:underline cursor-pointer"
          >
            {secondaryLabel}
          </p>
        )}
      </div>
      <div className="relative min-w-full">
        <input
          id={id}
          name={name}
          value={value}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          required={required}
          onChange={onInputChange}
          className="sm:w-[412px] min-w-full bg-inherit rounded-[4px] border-[1.5px] border-solid border-[#35373B] px-3 py-3 text-[#7F8084] text-base font-normal font-sans placeholder:text-[#7F8084] focus:outline-none focus:ring-2 focus:ring-[#969696] focus:border-transparent"
        />
        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={toggleShowPassword}
          >
            {!showPassword ? (
              <AiFillEye color="#7F8084" size={20} />
            ) : (
              <AiFillEyeInvisible color="#7F8084" size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
