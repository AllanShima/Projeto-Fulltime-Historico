import React from 'react'
import CameraStatusUi from './ui/CameraStatusUi';
import CameraDataElements from './ui/CameraDataElements';
import RecordingIndicator from './ui/RecordingIndicator';

const CameraScreen = ({camera}) => {
  
  return (
    <>
      <div className='relative w-1/2 rounded-xl'
        style={{ 
          backgroundImage: `url(${camera.imageUrl})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        
        <div className='flex absolute p-3 justify-between w-full h-full'>
          <div className='h-full'>
            <div className='h-full'>
              <div className='grid content-between w-fit h-full'>
                <div className='grid space-y-1'>
                  <CameraDataElements text={camera.name}/>
                  <CameraDataElements text={camera.location}/>                     
                </div>
                
                <CameraDataElements text={camera.totalTimeRecorded}/>
              </div>
            </div>        
          </div>
          <div className='grid content-between h-full w-fit'>
            <span><CameraStatusUi status={camera.status}/></span>
            <span className=''><CameraDataElements text="REC" element={<RecordingIndicator/>}/></span>
          </div>
          
        </div>
      </div>      
    </>
  )
}

export default CameraScreen
