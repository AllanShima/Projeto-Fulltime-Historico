import React from 'react'

const CameraStatusUi = ({status}) => {
  return (
    <div className={`flex justify-center items-center text-xs w-13 h-6 px-2 py-1 ${status === "online" ? "bg-primary" : "bg-red-700"} text-white rounded-lg`}>
        {status}
    </div>
  )
}

export default CameraStatusUi
