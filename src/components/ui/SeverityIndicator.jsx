import React from 'react'

const SeverityIndicator = ({severity}) => {
    const sevSpecs = {
      "baixo": ["bg-green-100 text-green-800"],
      "medio": ["bg-yellow-200 text-yellow-800"],
      "alto": ["bg-orange-100 text-orange-800"],
      "critico": ["bg-red-100 text-red-800"]
    }
    const style = sevSpecs[severity];

    const text = severity[0].toUpperCase() + severity.slice(1);

    return (
        <div className={`flex items-center px-2 w-fit rounded-xl ${style}`}>
            <h3 className='font-regular text-xs'>
                {text}
            </h3>
        </div>
    )
}

export default SeverityIndicator
