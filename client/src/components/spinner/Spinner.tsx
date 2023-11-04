import React from 'react'

const Spinner: React.FC = () => {
  return (
    <div className="bg-[#131319] flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 shadow-md border-[#bbb3b3]"></div>
    </div>
  )
}

export default Spinner
