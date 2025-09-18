import React, { useEffect, useState } from 'react'

const Avatar = ({ fullName="Null Null", showName=false }) => {

  const separatedName = fullName.split(" ");
  const firstName = separatedName[0];
  const lastName = separatedName[1];

  const [abbreviation, setAbbreviation] = useState("");

  useEffect(() => {
    const firstChars = (firstName[0] + lastName[0]).toUpperCase();
    setAbbreviation(firstChars)
  }, [])

  return (
    <div className='grid grid-flow-col content-center justify-center items-center'>
      <div className='grid content-center justify-center w-8 h-8 rounded-2xl bg-gray-200'>
        {abbreviation}
      </div>
      {showName===true ? <span className='pl-1'>{fullName}</span> : null}
    </div>
  )
}

export default Avatar
