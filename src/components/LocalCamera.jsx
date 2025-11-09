import React, {useEffect, useRef, useState} from "react";
// Ícones substituídos por SVGs inline para evitar erros de dependência.

// Ícone de Ponto Vermelho (Indicador de Gravação)
const RecordingIndicator = ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
    </svg>
);

// Ícone de Câmera (Botão de Gravação)
const RecordButtonIcon = ({ className = 'w-3 h-3' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
    </svg>
);

// Ícone de Download
const DownloadIcon = ({ className = 'w-3 h-3' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
);


const LocalCamera = ({ viewArea = "center" }) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null); // Ref para controlar o loop de animação
    const [gravando, setGravando] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState(null); // Para o download do vídeo

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

    // --- 3. Função de Gravação ---
    const record10Seconds = () => {
        if (!canvasRef.current || gravando) return;
        
        // Limpa o download anterior
        setDownloadUrl(null); 

        setGravando(true);
        setCurrentTime(0); // Reinicia o contador para o UI

        // Obtém o stream do canvas que está sendo desenhado continuamente
        const canvasStream = canvasRef.current.captureStream(30); // 30 FPS
        const recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm" });
        const chunks = [];

        recorder.ondataavailable = e => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
            setGravando(false);
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url); // Armazena o URL para download
        };

        recorder.start();
        
        // Para a gravação após 10 segundos
        setTimeout(() => {
            if (recorder.state !== 'inactive') {
                recorder.stop();
            }
        }, 10000); 
    };
    
    // --- 4. Efeito para Contagem do Tempo (Apenas para o UI) ---
    useEffect(() => {
        if (!gravando) {
            setCurrentTime(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentTime(prev => {
                // Para a contagem no 10, que é o momento que a gravação é interrompida
                if (prev >= 9) { 
                    clearInterval(interval);
                    return 10;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gravando]);


    const areaStyles = {
        "top-left": { objectPosition: "left top", transform: "scale(2)" },
        "top-right": { objectPosition: "right top", transform: "scale(2)" },
        "bottom-left": { objectPosition: "left bottom", transform: "scale(2)" },
        "bottom-right": { objectPosition: "right bottom", transform: "scale(2)" },
        "center": { objectPosition: "center center", transform: "scale(2)" },
        "center-top": { objectPosition: "center top", transform: "scale(2)" },
    };

    return (
        <div className="relative w-full h-full rounded-xl shadow-lg bg-gray-900 overflow-hidden">
            {/* O Canvas é o que realmente está sendo gravado, mas está escondido (hidden) no UI */}
            <canvas ref={canvasRef} className="hidden" /> 
            
            {/* O Vídeo é apenas para visualização/fonte, com o zoom aplicado via CSS */}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out"
                style={{
                    ...areaStyles[viewArea],
                    transformOrigin: areaStyles[viewArea].objectPosition,
                }}
            />

            {/* UI e Botões */}
            
            {gravando ?
                <span className="absolute bottom-4 left-4 bg-red-700 text-white font-bold px-3 py-1 rounded-full shadow-xl flex items-center space-x-2 z-50 animate-pulse">
                    <RecordingIndicator className='w-4 h-4'/>
                    <span>Gravando: {10 - currentTime}s</span>
                </span>
                :
                <div className="absolute bottom-4 left-4 z-50 flex space-x-2">
                    <button
                        onClick={record10Seconds}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 flex items-center space-x-2"
                        disabled={!streamRef.current}
                    >
                        <RecordButtonIcon className='w-3 h-3'/> <span>Gravar 10s</span>
                    </button>
                    {downloadUrl && (
                        <a 
                            href={downloadUrl}
                            download={`gravacao-${Date.now()}.webm`}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 flex items-center space-x-2"
                        >
                            <DownloadIcon className='w-3 h-3'/> <span>Baixar Vídeo</span>
                        </a>
                    )}
                </div>
            }
        </div>
    );
};

export default LocalCamera;