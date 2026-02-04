import React from 'react'
import CameraScreen from './CameraScreen';

// selectedId
const HomeCam = ({cameras, selectedCam, remainingCams}) => {

  // encontra a camera atual com as informações
  const currentCamera = cameras.find(cam => cam.id === selectedCam)
  // const currentImage = imageMap[selectedCam];

  let secondRowCams = 0;

  if (remainingCams.length == 2) {
    secondRowCams = remainingCams[1];
  } else if (remainingCams.length == 3) {
    secondRowCams = remainingCams.slice(1, 3)
  } else {
    secondRowCams = remainingCams.slice(1, 4);
  }

  if(!currentCamera){
    return <div>No cameras detected.</div>
  }

  return (
    <div className='grid w-full text-white'>
      <div className='ml-auto mr-auto pl-5 pr-5 w-290'>
        {cameras.length == 1 ? (
          <div className='bg-amber-400'>
            <CameraScreen camera={currentCamera}/>
          </div>
        ) : (
          <div className='flex mt-6 h-1/2 space-x-6'>
            <CameraScreen camera={currentCamera}/>
            <CameraScreen camera={remainingCams[0]}/>
          </div>
        )} 

      </div>
    </div>
  )
}

export default HomeCam
