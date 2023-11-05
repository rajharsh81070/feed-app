import Spinner from '../spinner/Spinner'

export interface IButtonProps {
  label: string
  disabled?: boolean
  onClick?: () => void
  isLoading?: boolean
}

const Button = (props: IButtonProps) => {
  const { label, onClick, disabled, isLoading } = props

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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner size={20} containerHeight="max-h-min" />
        </div>
      ) : (
        <p className="text-[#FFF] font-medium font-sans text-base text-center leading-none">
          {label}
        </p>
      )}
    </button>
  )
}

export default Button
