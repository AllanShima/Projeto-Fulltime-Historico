import React, { useEffect, useRef } from 'react'
import { MdOutlineClose } from "react-icons/md";

const UserLiveCameraView = ({currentNotification, setCameraViewButtonModal}) => {

    const viewArea = currentNotification.camera.position;

    console.log(viewArea);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null); // Ref para controlar o loop de animação

    const areaConfigs = {
        "top-left": { x: 0, y: 0, width: 0.5, height: 0.5 },
        "top-right": { x: 0.5, y: 0, width: 0.5, height: 0.5 },
        "bottom-left": { x: 0, y: 0.5, width: 0.5, height: 0.5 },
        "bottom-right": { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
        "center": { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
        "center-top": { x: 0.25, y: 0, width: 0.5, height: 0.5 },
    };

    const { x, y, width, height } = areaConfigs[viewArea];

    // --- 1. Efeito para Inicialização da Câmera ---
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    // Após o vídeo carregar, inicie o desenho contínuo
                    startContinuousDrawing();
                }
                console.log("Stream OK, Tracks ativas:", stream.getVideoTracks().map(t => t.readyState));
            })
            .catch(err => {
                console.error("Erro ao acessar câmera:", err);
            });
        
        // Cleanup: interrompe a stream da câmera e o loop de animação
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // --- 2. Desenho Contínuo do Canvas (Loop para manter o canvas atualizado) ---
    const startContinuousDrawing = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        // Configurações do Canvas para a gravação
        canvas.width = 640;
        canvas.height = 360; 
        const ctx = canvas.getContext("2d");

        const drawFrame = () => {
            if (video.readyState >= 2) { // Garante que o vídeo está pronto
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Cálculo de zoom/crop
                const sx = video.videoWidth * x;
                const sy = video.videoHeight * y;
                const sw = video.videoWidth * width;
                const sh = video.videoHeight * height;

                // Desenha o frame recortado no canvas
                ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            }
            // Agenda o próximo frame continuamente
            animationFrameRef.current = requestAnimationFrame(drawFrame);
        };
        
        // Inicia o loop
        animationFrameRef.current = requestAnimationFrame(drawFrame);
    };


    const areaStyles = {
        "top-left": { objectPosition: "left top", transform: "scale(2)" },
        "top-right": { objectPosition: "right top", transform: "scale(2)" },
        "bottom-left": { objectPosition: "left bottom", transform: "scale(2)" },
        "bottom-right": { objectPosition: "right bottom", transform: "scale(2)" },
        "center": { objectPosition: "center center", transform: "scale(2)" },
        "center-top": { objectPosition: "center top", transform: "scale(2)" },
    };
    return (
// 1. OVERLAY DE TELA CHEIA PARA O MODAL (Fundo escurecido)
        // Isso garante que o modal fique centralizado sobre a tela principal
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
            
            {/* 2. CONTAINER PRINCIPAL DO MODAL (Onde o conteúdo vai aparecer) */}
            {/* Defina w-fit h-fit ou um tamanho específico, ex: max-w-2xl */}
            <div className='grid content-start bg-white rounded-2xl font-regular shadow-xl w-[90%] max-w-4xl p-5'>

                {/* 3. HEADER DO MODAL (Botão de Fechar) */}
                <div className='flex justify-between items-center w-full mb-4'>
                    <h2 className='text-xl font-bold text-gray-800'>Visualização da Câmera ({currentNotification.camera.name}) - {currentNotification.camera.location}</h2>
                    <button 
                        onClick={() => setCameraViewButtonModal(false)} 
                        className='flex items-center justify-center w-8 h-8 bg-red-600 rounded-full hover:bg-red-700 transition'
                        aria-label="Fechar visualização da câmera"
                    >
                        <MdOutlineClose className='w-6 h-6 text-white'/>
                    </button>
                </div>
                
                {/* 4. CONTAINER DA CÂMERA (Onde o vídeo será exibido) */}
                <div className='relative w-full aspect-video overflow-hidden rounded-lg border-2 border-gray-300'>
                    
                    {/* O Canvas é o que realmente está sendo gravado (hidden) */}
                    <canvas ref={canvasRef} className="hidden" /> 
                    
                    {/* 5. VÍDEO (Ajustado para ocupar 100% do novo container) */}
                    {/* REMOVIDAS: absolute inset-0 w-full h-full */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out"
                        style={{
                            ...areaStyles[viewArea],
                            // Certifica que o transformOrigin é aplicado
                            transformOrigin: areaStyles[viewArea].objectPosition, 
                        }}
                    />                    
                </div>
            </div>              
        </div>
    )
}

export default UserLiveCameraView
