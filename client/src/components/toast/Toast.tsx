import React from 'react'
import { useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export enum ToastType {
  Success,
  Failure,
  Info,
}

export type IToast = {
  text: string
  onClose?: () => void
  duration?: number
  type?: ToastType
}

const Toast = (props: IToast) => {
  const { text, onClose, duration, type } = props

  useEffect(() => {
    if (text && duration && onClose) {
      setTimeout(() => {
        onClose()
      }, duration)
    }
  }, [duration, text, onClose])

  const getToastBgColor = (toastType?: ToastType) => {
    switch (toastType) {
      case ToastType.Success:
        return 'bg-green-400'
      case ToastType.Info:
        return 'bg-orange-500'
      case ToastType.Failure:
      default:
        return 'bg-red-500'
    }
  }

  return (
    <div className="absolute top-0 z-50 flex w-full justify-center">
      <div
        data-test-id="toastMsg"
        id="toast-default"
        className={`${getToastBgColor(
          type
        )} flex w-full animate-slide items-center justify-between gap-2 p-4 text-white shadow-md`}
        role="alert"
      >
        <div className="text-center text-xs font-normal">{text}</div>
        <div className="cursor-pointer" onClick={onClose}>
          <AiOutlineCloseCircle size={20} />
        </div>
      </div>
    </div>
  )
}

export default Toast
