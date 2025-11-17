import React from 'react'

const SeverityIndicator = ({severity, layout2}) => {
    const sevSpecs = {
      "low": ["bg-green-100 text-green-800", "bg-green-600 text-white", "Baixo"],
      "medium": ["bg-yellow-200 text-yellow-800", "bg-yellow-600 text-white", "Medio"],
      "high": ["bg-orange-100 text-orange-800", "bg-orange-600 text-white", "Alto"],
      "critical": ["bg-red-100 text-red-800", "bg-red-600 text-white", "Critico"]
    }
    const style = layout2 ? sevSpecs[severity][1] : sevSpecs[severity][0];

    const text = sevSpecs[severity][2];

    return (
        <div className={`flex items-center px-2 w-fit h-fit rounded-md ${style}`}>
            <h3 className='flex items-center font-regular text-xs py-0.5'>
                {text}
            </h3>
        </div>
    )
}

export default SeverityIndicator
