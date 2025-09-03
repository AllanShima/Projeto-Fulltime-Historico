import React, { useEffect, useState } from 'react'

const Avatar = ({ name, last_name }) => {

  const fullName = name + " " + last_name;
  const [abbreviation, setAbbreviation] = useState("");

  useEffect(() => {
    const firstChars = (name[0] + last_name[0]).toUpperCase();
    setAbbreviation(firstChars)
  }, [])

  return (
    <div className='grid grid-flow-col content-center justify-center'>
      <div className='grid content-center justify-center w-8 h-8 rounded-2xl bg-gray-200'>
        {abbreviation}
      </div>
    </div>
  )
}

export default Avatar
