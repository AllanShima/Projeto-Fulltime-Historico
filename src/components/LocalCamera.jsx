// Arquivo por Emanuelly

import React, {useEffect, useRef, useState} from "react";

// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { fetchFile } from "@ffmpeg/util";
//
// const ffmpeg = new FFmpeg({ log: true });

// async function convertWebmToMp4(webmBlob) {
//     if (!ffmpeg.isLoaded()) {
//         await ffmpeg.load();
//     }
//
//     ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmBlob));
//     await ffmpeg.run("-i", "input.webm", "output.mp4");
//     const data = ffmpeg.FS("readFile", "output.mp4");
//
//     return new Blob([data.buffer], { type: "video/mp4" });
// }

const LocalCamera = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [gravando, setGravando] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (currentTime >= 10) {
            setCurrentTime(0)
            return; // para quando chegar em 10
        }

        const interval = setInterval(() => {
            setCurrentTime(prev => prev + 1);
        }, 1000); // incrementa a cada segundo

        return () => clearInterval(interval);
    }, [currentTime]);


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error("Erro ao acessar câmera:", err);
            });
    }, []);

    const record10Seconds = () => {
        if (!streamRef.current) return;

        setGravando(true);

        let options = { mimeType: "video/webm;codecs=vp9" };

        if (MediaRecorder.isTypeSupported("video/mp4;codecs=h264")) {
            options = { mimeType: "video/mp4;codecs=h264" };
        } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
            options = { mimeType: "video/webm;codecs=vp9" };
        } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
            options = { mimeType: "video/webm;codecs=vp8" };
        }

        const recorder = new MediaRecorder(streamRef.current, options);

        // const recorder = new MediaRecorder(streamRef.current, { mimeType: "video/webm" });
        const chunks = [];

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        recorder.onstop = () => {
            setGravando(false);
            // const blob = new Blob(chunks, { type: "video/webm" });
            // const url = URL.createObjectURL(blob);
            //
            // // Chama callback pro pai (CameraScreen)
            // if (onRecorded) {
            //     onRecorded(blob, url);
            // }
            //
            // // 🔽 Caso queira baixar direto no navegador:
            // const a = document.createElement("a");
            // a.href = url;
            // a.download = `gravacao-${Date.now()}.webm`;
            // a.click();

            const blob = new Blob(chunks, { type: recorder.mimeType });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `gravacao-${Date.now()}.${recorder.mimeType.includes("mp4") ? "mp4" : "webm"}`;
            a.click();
        };

        // recorder.onstop = async () => {
        //     const webmBlob = new Blob(chunks, { type: "video/webm" });
        //
        //     // 🔹 Converte para MP4 com FFmpeg.wasm
        //     const mp4Blob = await convertWebmToMp4(webmBlob);
        //     const url = URL.createObjectURL(mp4Blob);
        //
        //     // 🔹 Faz download do MP4
        //     const a = document.createElement("a");
        //     a.href = url;
        //     a.download = `gravacao-${Date.now()}.mp4`;
        //     a.click();
        // };


        recorder.start();
        setTimeout(() => recorder.stop(), 10000); // 10 segundos
    };

    return (
        <div className="relative w-full h-full">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minWidth: "100%",
                    minHeight: "100%"
                }}
            />

            {gravando ?
                <span
                    className="absolute bottom-10 left-3 bg-gray-600 text-white px-3 py-1 rounded z-50"
                >
                    Gravando...
                </span>
                :
                <a
                    href={'#'}
                    onClick={record10Seconds}
                    className="absolute bottom-10 left-3 bg-red-600 text-white px-3 py-1 rounded z-50"
                >
                    Gravar 10s
                </a>
            }
        </div>
    );
};

export default LocalCamera;
