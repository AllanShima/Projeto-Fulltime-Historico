import React from 'react'
import CameraScreen from './CameraScreen';

// selectedId
const HomeCam = ({cameras, selectedCam, remainingCams}) => {

  // encontra a camera atual com as informações
  const currentCamera = cameras.find(cam => cam.id === selectedCam)
  // const currentImage = imageMap[selectedCam];

  const secondRowCams = remainingCams.slice(1, 4);

  if(!currentCamera){
    return <div>Camera not found.</div>
  }

  return (
    <div className='grid w-full text-white'>
      <div className='ml-auto mr-auto pl-5 pr-5 w-290'>
        <div className='flex mt-6 h-1/2 space-x-6'>
          <CameraScreen camera={currentCamera}/>
          <CameraScreen camera={remainingCams[0]}/>
        </div>

        <div className='mt-5 mb-auto h-2/5 flex justify-between space-x-6'>
          {secondRowCams.map((cam) => 
            <CameraScreen key={cam.id} camera={cam}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeCam
