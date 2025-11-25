import React, {useEffect, useRef, useState, useMemo, useCallback} from "react";

// --- Imports e Configuração Firebase ---
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// 🚨 MODIFIQUE AQUI: Coloque a sua configuração REAL do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAC3_QCymO3bSL53gSohMWGk3G9mkotOOg",
  authDomain: "fulltime-historico.firebaseapp.com",
  projectId: "fulltime-historico",
  storageBucket: "fulltime-historico.firebasestorage.app",
  messagingSenderId: "888352218511",
  appId: "1:888352218511:web:716be04e4fc99a649bbffa"
};

// Variáveis globais de ambiente (MANDATÓRIO)
// AGORA PEGA O APP ID DIRETAMENTE DO OBJETO DE CONFIGURAÇÃO ACIMA OU UM VALOR SEGURO
const appId = firebaseConfig.appId || 'default-app-id';

// --- REINSTALANDO SUA IMPORTAÇÃO ORIGINAL ---
// O sistema de build pode reclamar se este arquivo não estiver presente, mas 
// manteremos conforme sua instrução para funcionar em seu ambiente.
import { useUserContext } from "../contexts/user-context";
import { firestoreUpdateCurrentEventVideosByUid, firestoreUpdateMonitorVideoById } from "../services/api/FirebaseUpdateFunctions";
import { firestoreGetAllCurrentAlerts, firestoreGetAllMonitorEvents } from "../services/api/FirebaseGetFunctions";
import { db } from "../services/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";


// --- Ícones substituidos por SVGs inline ---

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

// Ícone de Upload 
const UploadIcon = ({ className = 'w-3 h-3' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
    </svg>
);

// Ícone de Link (URL do Storage)
const LinkIcon = ({ className = 'w-3 h-3' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zm10.2 0c0 1.71-1.39 3.1-3.1 3.1H7v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5H7v1.9h3.1c1.71 0 3.1 1.39 3.1 3.1zm-4.2-2.8V14h1.8v-4.8h-1.8z"/>
    </svg>
);


const LocalCamera = ({ viewArea = "center" }) => {

    // Usando o useUserContext importado externamente
    const { userState, userDispatch } = useUserContext();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null); 
    const mediaRecorderRef = useRef(null); 

    const [gravando, setGravando] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState(null); 
    const [storageUrl, setStorageUrl] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); 
    
    // Estado para armazenar a razão pela qual o botão está desabilitado
    const [disabledReason, setDisabledReason] = useState(""); 
    const [isCameraActive, setIsCameraActive] = useState(false);

    // Variável para determinar a permissão de gravação baseada no contexto
    const canRecord = userState && typeof userState.can_record === 'boolean' ? userState.can_record : false;
    
    // Inicialização do Firebase Storage
    const storageInstance = useMemo(() => {
        if (!firebaseConfig) {
            setDisabledReason("Configuração do Firebase ausente.");
            return null;
        }
        try {
            const app = initializeApp(firebaseConfig, appId);
            // Verifica se as chaves do config são válidas antes de pegar o Storage
            if (!app.options.projectId) {
                setDisabledReason("Configuração do Firebase Inválida.");
                return null;
            }
            return getStorage(app);
        } catch (e) {
            console.error("Erro na inicialização do Firebase/Storage:", e);
            setDisabledReason("Erro ao inicializar Firebase Storage.");
            return null;
        }
    }, [firebaseConfig, appId]);


    const areaConfigs = {
        "top-left": { x: 0, y: 0, width: 0.5, height: 0.5 },
        "top-right": { x: 0.5, y: 0, width: 0.5, height: 0.5 },
        "bottom-left": { x: 0, y: 0.5, width: 0.5, height: 0.5 },
        "bottom-right": { x: 0.5, y: 0.5, width: 0.5, height: 0.5 },
        "center": { x: 0.25, y: 0.25, width: 0.5, height: 0.5 },
        "center-top": { x: 0.25, y: 0, width: 0.5, height: 0.5 },
    };

    const { x, y, width, height } = areaConfigs[viewArea];

    // --- 1. Inicialização da Câmera e Cleanup ---
    useEffect(() => {
        // Inclui audio: true para captura de áudio
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
                setIsCameraActive(true); // Câmera OK
                videoRef.current.onloadedmetadata = () => {
                    startContinuousDrawing();
                }
            })
            .catch(err => {
                console.error("Erro ao acessar câmera:", err);
                setDisabledReason("Câmera não acessível: " + err.name);
                setIsCameraActive(false);
            });
        
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // --- 2. Desenho Contínuo do Canvas (Loop) ---
    const startContinuousDrawing = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        canvas.width = 640;
        canvas.height = 360; 
        const ctx = canvas.getContext("2d");

        const drawFrame = () => {
            if (video.readyState >= 2) { 
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const sx = video.videoWidth * x;
                const sy = video.videoHeight * y;
                const sw = video.videoWidth * width;
                const sh = video.videoHeight * height;

                ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            }
            animationFrameRef.current = requestAnimationFrame(drawFrame);
        };
        
        animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    // --- Função para Upload no Firebase Storage ---
    const uploadToFirebaseStorage = async (videoBlob) => {
        if (!storageInstance) {
            console.error("Firebase Storage não inicializado. Não foi possível fazer upload.");
            return null;
        }

        setIsUploading(true);
        try {
            const filename = `videos/${appId}/recording-${Date.now()}.webm`;
            const storageRef = ref(storageInstance, filename);

            const uploadTask = await uploadBytes(storageRef, videoBlob, {
                contentType: 'video/webm',
            });

            const downloadUrl = await getDownloadURL(uploadTask.ref);
            console.log("Upload para Firebase Storage concluído. URL:", downloadUrl);
            return downloadUrl;

        } catch (error) {
            console.error("Erro durante o processo de upload para Firebase Storage:", error);
            setDisabledReason("Falha no Upload: " + error.message);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const storeVideos = async(finalStorageUrl) => {

        const allCurrentAlerts = await firestoreGetAllCurrentAlerts();
        const currentEventId = allCurrentAlerts[0].uid;
        console.log(currentEventId);

        await firestoreUpdateCurrentEventVideosByUid(currentEventId, finalStorageUrl);

        setStorageUrl(finalStorageUrl);
    }


    // --- 3. Lógica para verificar o estado do botão ---
    const checkIfDisabled = useCallback(() => {
        if (!isCameraActive) return "Aguardando câmera...";
        
        // **CHECK DE CONTEXTO ROBUSTO**
        if (!userState || typeof userState.can_record !== 'boolean') {
             // Este log aparecerá se o Contexto não estiver carregado ou não tiver a propriedade can_record
             console.log("Aviso: Contexto de usuário não carregado ou 'can_record' ausente.");
             return "Contexto de gravação (userState.can_record) não carregado/inválido.";
        }
        
        
        if (!storageInstance) return disabledReason || "Aguardando inicialização do Storage.";
        if (gravando) return "Gravação em andamento.";
        if (isUploading) return "Upload em andamento.";
        return null; // Não desabilitado
    }, [isCameraActive, userState, storageInstance, gravando, isUploading, disabledReason]);

    // --- 4. Função para Parar a Gravação ---
    const stopRecording = () => {
        const recorder = mediaRecorderRef.current;
        if (recorder && recorder.state === 'recording') {
            console.log("Sinal de parada recebido. Interrompendo gravação.");
            recorder.stop();
        }
    };

    // --- 5. Função para Iniciar a Gravação ---
    const recordUntilEnd = () => {
        const disableReason = checkIfDisabled();
        if (disableReason) {
            console.warn(`Tentativa de gravação bloqueada: ${disableReason}`);
            return;
        }
        
        setDownloadUrl(null); 
        setStorageUrl(null); 
        setGravando(true);
        setCurrentTime(0); 

        // Adicionando áudio ao stream de captura do canvas
        const canvasStream = canvasRef.current.captureStream(30); 
        const audioTracks = streamRef.current.getAudioTracks();
        if (audioTracks.length > 0) {
            canvasStream.addTrack(audioTracks[0]);
        }
        
        const recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm" });
        mediaRecorderRef.current = recorder; 

        const chunks = [];

        recorder.ondataavailable = e => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = async () => {
            setGravando(false);
            const blob = new Blob(chunks, { type: "video/webm" });
            
            const localUrl = URL.createObjectURL(blob);
            setDownloadUrl(localUrl); 

            const finalStorageUrl = await uploadToFirebaseStorage(blob);
            if (finalStorageUrl) {
                storeVideos(finalStorageUrl);
            }

            mediaRecorderRef.current = null;
        };

        recorder.start();
    };

    // --- 6. Efeito para MONITORAR e PARAR a Gravação ---
    // Monitora o sinal 'canRecord' do contexto e interrompe a gravação se ele se tornar falso
    useEffect(() => {
        if (gravando && !canRecord) {
            stopRecording();
        }
    }, [canRecord, gravando]);


    // --- 7. Efeito para Contagem do Tempo ---
    useEffect(() => {
        if (!gravando) {
            setCurrentTime(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentTime(prev => prev + 1); 
        }, 1000);

        return () => clearInterval(interval);
    }, [gravando]);

    const disableReason = checkIfDisabled();

    // Determina se o botão deve estar *visualmente* desabilitado.
    const isButtonDisabled = disableReason !== null && !gravando && !isUploading;


    const areaStyles = {
        "top-left": { objectPosition: "left top", transform: "scale(2)" },
        "top-right": { objectPosition: "right top", transform: "scale(2)" },
        "bottom-left": { objectPosition: "left bottom", transform: "scale(2)" },
        "bottom-right": { objectPosition: "right bottom", transform: "scale(2)" },
        "center": { objectPosition: "center center", transform: "scale(2)" },
        "center-top": { x: 0.25, y: 0, width: 0.5, height: 0.5 },
    };

    return (
        <div className="relative w-full h-full rounded-xl shadow-lg bg-gray-900 overflow-hidden">
            <canvas ref={canvasRef} className="hidden" /> 
            
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

            {/* Mensagem de Erro/Status */}
            {isButtonDisabled && (
                <div className="absolute top-4 left-4 z-50 bg-yellow-500/90 text-gray-900 font-semibold px-3 py-1 rounded-lg shadow-xl">
                    {disableReason}
                </div>
            )}


            {/* UI e Botões: Exibe a UI se houver permissão, gravação em andamento, ou vídeos prontos */}
            {(canRecord || gravando || isUploading || downloadUrl || storageUrl) && (
                <>
                    {gravando ?
                        // Exibe o tempo decorrido
                        <span className="absolute bottom-4 left-4 bg-red-700/80 text-white font-bold px-3 py-1 rounded-full shadow-xl flex items-center space-x-2 z-50 animate-pulse mb-8">
                            <RecordingIndicator className='w-4 h-4'/>
                            <span>Gravando: {currentTime}s</span> 
                        </span>
                        : isUploading ?
                        // Novo estado: Uploading
                        <span className="absolute bottom-4 left-4 bg-blue-500/80 text-white font-bold px-3 py-1 rounded-full shadow-xl flex items-center space-x-2 z-50 mb-8 animate-pulse">
                            <UploadIcon className='w-4 h-4'/>
                            <span>Enviando para Storage...</span> 
                        </span>
                        :
                        // Botões de Ação (Gravar, Baixar, Storage)
                        <div className="absolute bottom-4 left-4 z-50 flex space-x-2">
                            <button
                                onClick={recordUntilEnd}
                                className={`font-bold py-2 px-4 rounded-xl shadow-lg transition duration-200 flex items-center mb-8 ${isButtonDisabled 
                                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' 
                                    : 'bg-red-600/90 hover:bg-red-700 text-white'}`}
                                disabled={isButtonDisabled}
                                title={isButtonDisabled ? disableReason : "Iniciar Gravação"}
                            >
                                <RecordButtonIcon className='w-3 h-3'/> <span>Gravar</span>
                            </button>
                            {downloadUrl && (
                                <a 
                                    href={downloadUrl}
                                    download={`gravacao-local-${Date.now()}.webm`}
                                    className="bg-green-500/80 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 flex items-center space-x-2 mb-8"
                                >
                                    <DownloadIcon className='w-3 h-3'/> <span>Baixar Local</span>
                                </a>
                            )}
                             {storageUrl && (
                                <a 
                                    href={storageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600/80 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 flex items-center space-x-2 mb-8"
                                >
                                    <LinkIcon className='w-3 h-3'/> <span>Ver no Storage</span>
                                </a>
                            )}
                        </div>
                    }                      
                </>
            )}

        </div>
    );
};

export default LocalCamera;