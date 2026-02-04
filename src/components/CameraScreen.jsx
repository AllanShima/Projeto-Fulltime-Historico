import React, { useState, useEffect } from 'react'
import CameraStatusUi from './ui/CameraStatusUi';
import CameraDataElements from './ui/CameraDataElements';
import RecordingIndicator from './ui/RecordingIndicator';
import LocalCamera from "./LocalCamera.jsx";

const CameraScreen = ({ camera }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Atualiza a cada minuto
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 1.000 ms = 1 segundo

        return () => clearInterval(interval);
    }, []);

    // Formatar data/hora
    const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const formattedDate = currentTime.toLocaleDateString('pt-BR');

    return (
        <>
            <div className="relative w-1/2 rounded-xl overflow-hidden"
                 style={{
                    // backgroundImage: `url(${camera.imageUrl})`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                    overflow: 'hidden',
                    zIndex: 0
                 }}>
                {/* {console.log(camera)} */}
                <LocalCamera viewArea={camera.position} />

                <div className="flex absolute inset-0 p-3 justify-between w-full h-full z-10">
                    <div className="h-full">
                        <div className="h-full">
                            <div className="grid content-between w-fit h-full">
                                <div className="grid space-y-1">
                                    <CameraDataElements text={camera.name} />
                                    <CameraDataElements text={camera.location} />
                                </div>

                                {/* Exibe data e hora */}
                                <CameraDataElements text={`${formattedDate} ${formattedTime}`} />
                            </div>
                        </div>
                    </div>
                    <div className="grid content-between h-full w-fit">
                        <span><CameraStatusUi status={camera.status} /></span>
                        <span><CameraDataElements text="REC" element={<RecordingIndicator />} /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CameraScreen
