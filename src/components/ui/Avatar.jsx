import React, { useEffect, useState } from 'react'


const Avatar = ({fullName="Null Null", showName=false, profileUrl=null, customSize=null}) => {

  const separatedName = fullName.split(" ");
  const firstName = separatedName[0];
  const lastName = separatedName[1];
  // Ainda testando
  const customSizeStyle = customSize !== null ? {width: `${customSize}px`, height: `${customSize}px`} : {};

  const [abbreviation, setAbbreviation] = useState("");

  useEffect(() => {
    const firstChars = (firstName[0] + lastName[0]).toUpperCase();
    setAbbreviation(firstChars)
  }, [])

  return (
    <div className='grid grid-flow-col content-center justify-center items-center'>
      {profileUrl !== null ? (
        <div style={{
          backgroundImage: `url(${profileUrl})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          ...customSizeStyle
        }} className={`grid content-center justify-center w-8 h-8 rounded-full bg-gray-200`}/>
      ) : (
        <div style={{ ...customSizeStyle }} className={`grid content-center justify-center w-10 h-10 rounded-full bg-gray-200`}>
          {abbreviation}
        </div>        
      )}

      {showName===true ? <span className='pl-1'>{fullName}</span> : null}
    </div>
  )
}

export default Avatar
