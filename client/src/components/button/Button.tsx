export interface IButtonProps {
  label: string
  disabled?: boolean
  onClick?: () => void
}

const Button = (props: IButtonProps) => {
  const { label, onClick, disabled } = props

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#4A96FF] text-white py-3 rounded ${
        disabled
          ? 'cursor-default opacity-50'
          : 'cursor-pointer opacity-100 hover:bg-blue-700'
      }`}
    >
      <p className="text-[#FFF] font-medium font-sans text-base text-center leading-none">
        {label}
      </p>
    </button>
  )
}

export default Button
