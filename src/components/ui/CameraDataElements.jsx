import React from 'react'

// element é um elemento a mais que pode ou não ser adicionado em seguida do texto
const CameraDataElements = ({text, element = ""}) => {
    const showElement = element == "" ? false : true;
    return (
        <span className='w-fit h-fit text-xs rounded-md py-1 px-2 space-x-2 bg-primary/80'>
            {showElement == true ? <span>{element}</span> : null}
            <span>{text}</span>
        </span>
    )
}

export default CameraDataElements
