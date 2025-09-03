import React from 'react'
import CameraScreen from './CameraScreen';

// selectedId
const HomeCam = ({cameras, selectedCam, remainingCams}) => {

  const imageMap = {
    "1": "https://images.unsplash.com/photo-1646521790482-a76619a564db?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "2": "https://images.unsplash.com/photo-1716703435417-f8687d87516c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "3": "https://images.unsplash.com/photo-1590938076771-dfe17af4d484?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "4": "https://images.unsplash.com/photo-1647451969544-2e0db88a150b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "5": "https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "6": "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=1273&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }

  // encontra a camera atual com as informações
  const currentCamera = cameras.find(cam => cam.id === selectedCam)
  const currentImage = imageMap[selectedCam];

  const secondRowCams = remainingCams.slice(1, 4);

  if(!currentCamera){
    return <div>Camera not found.</div>
  }

  return (
    <div className='grid w-full text-white'>
      <div className='ml-auto mr-auto pl-5 pr-5 w-290'>
        <div className='flex mt-6 h-1/2 space-x-6'>
          <CameraScreen camera={currentCamera} image={currentImage}/>
          <CameraScreen camera={remainingCams[0]} image={imageMap[remainingCams[0].id]}/>
        </div>

        <div className='mt-5 mb-auto h-2/5 flex justify-between space-x-6'>
          {secondRowCams.map((cam) => 
            <CameraScreen camera={cam} image={imageMap[cam.id]}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeCam
