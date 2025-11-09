import React from 'react'

const SeverityIndicator = ({severity}) => {
    const sevSpecs = {
      "low": ["bg-green-100 text-green-800", "Baixo"],
      "medium": ["bg-yellow-200 text-yellow-800", "Medio"],
      "high": ["bg-orange-100 text-orange-800", "Alto"],
      "critical": ["bg-red-100 text-red-800", "Critico"]
    }
    const style = sevSpecs[severity][0];

    const text = sevSpecs[severity][1];

    return (
        <div className={`flex items-center px-2 w-fit rounded-xl ${style}`}>
            <h3 className='font-regular text-xs'>
                {text}
            </h3>
        </div>
    )
}

export default SeverityIndicator
