import React from 'react'

const ToggleSwitch = ({state}) => {
    const spanStyle = state ? "right-0" : "left-0";
    const backgroundStyle = state ? "bg-red-400" : "bg-gray-400";
  return (
    <div className={`relative w-12 h-6 rounded-l-2xl rounded-r-2xl ${backgroundStyle}`}>
      <input type='checkbox' className='w-0 h-0'></input>
      {/* slider */}
      <span className={`absolute w-1/2 h-full bg-white rounded-2xl shadow-sm transition duration-500 ${spanStyle}`}></span>
    </div>
  )
}

export default ToggleSwitch
