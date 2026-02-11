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

  console.log(remainingCams);

  return (
    <div className='grid h-full w-full text-white'>
      <div className='grid ml-auto mr-auto p-5 bg-amber-900'>
        {cameras.length == 1 ? (
          <div className='flex w-full h-full'>
            <CameraScreen camera={currentCamera}/>
          </div>
        ) : cameras.length == 2 ? (
          <div className='grid grid-flow-col'>
            <span className=' pr-5'>
              <CameraScreen camera={currentCamera}/>
            </span>
            <span className=''>
              <CameraScreen camera={currentCamera}/>
            </span>
            
          </div>
        ) : cameras.length == 3 ? (
          <div className='grid grid-flow-col h-1/2 space-x-6'>
            <CameraScreen camera={currentCamera}/>
            <CameraScreen camera={remainingCams[0]}/>
          </div>
        ) : (
          <div className='grid grid-flow-col h-1/2 space-x-6'>
            <CameraScreen camera={currentCamera}/>
            <CameraScreen camera={remainingCams[0]}/>
          </div>
        )} 
      </div>
    </div>
  )
}

export default HomeCam
