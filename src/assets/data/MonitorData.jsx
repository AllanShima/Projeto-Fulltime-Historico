// totalTimeRecorded = tempo total de gravação da câmera
const cameras = [
  { 
    id: "1", 
    name: "Câmera 1", 
    imageUrl: "https://images.unsplash.com/photo-1646521790482-a76619a564db?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Entrada Principal", 
    status: "online", 
    totalTimeRecorded: "17:08:59" 
  },
  { 
    id: "2", 
    name: "Câmera 2", 
    imageUrl: "https://images.unsplash.com/photo-1716703435417-f8687d87516c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Andar do Escritório", 
    status: "online", 
    totalTimeRecorded: "12:08:59" 
  },
  { 
    id: "3", 
    name: "Câmera 3", 
    imageUrl: "https://images.unsplash.com/photo-1590938076771-dfe17af4d484?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Estacionamento", 
    status: "online", 
    totalTimeRecorded: "17:25:59" 
  },
  { 
    id: "4", 
    name: "Câmera 4", 
    imageUrl: "https://images.unsplash.com/photo-1647451969544-2e0db88a150b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Saída de Incêndio", 
    status: "offline", 
    totalTimeRecorded: "12:08:59" 
  },
  { 
    id: "5", 
    name: "Câmera 5", 
    imageUrl: "https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Recepção", 
    status: "online", 
    totalTimeRecorded: "12:08:59" 
  },
  { 
    id: "6", 
    name: "Câmera 6", 
    imageUrl: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=1273&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    location: "Sala do Servidor", 
    status: "online", 
    totalTimeRecorded: "19:08:59" 
  },
];

// // emergency pode ser eventos pelo f/safe ou alarmes ativados pelo FullArm
// const event_type = ["emergency", "system", "motion", "access"];

// // software DE ONDE o evento é reportado
// const softwares = ["F/Detect", "F/Safe", "FullCond", "FullCam", "FullArm"]

// // nível de severidade
// const severity = ["low", "medium", "high", "critical"]

// Enumeração dos valores em um único objeto:

const EventConstants = {
    TYPES: {
        EMERGENCY: "emergency",
        SYSTEM: "system",
        MOTION: "motion",
        ACCESS: "access",
    },
    SOFTWARES: {
        F_DETECT: "F/Detect",
        F_SAFE: "F/Safe",
        FULL_COND: "FullCond",
        FULL_CAM: "FullCam",
        FULL_ARM: "FullArm",
    },
    SEVERITIES: {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high",
        CRITICAL: "critical",
    }
};


const VideosRecorded = [
  {
    id: "1",
    id_event: "1",
    size: "15MB",
    //from_camera: cameras[0]  
  },
  {
    id: "2",
    id_event: "2",
    size: "15MB",
    //from_camera: cameras[0]  
  },
  {
    id: "3",
    id_event: "3",
    size: "15MB",
    //from_camera: cameras[0]  
  },
]

// location será de acordo com o que o monitor colocar ao adicionar cameras
// User vai depender do login
// BS: O alerta só será ativado quando o usuário escolher a localização dele
// Date inclui a data e o horário do ocorrido
const events = [
  { 
    id: "1", 
    software_from: EventConstants.SOFTWARES.F_SAFE,
    title: "Assalto armado",
    description: "Assalto armado no local",
    type: EventConstants.TYPES.EMERGENCY,
    severity: EventConstants.SEVERITIES.CRITICAL,
    device: "Usuário 1", 
    camera: cameras[2], 
    location: cameras[2].location,
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[0]
  },
  { 
    id: "2", 
    software_from: EventConstants.SOFTWARES.F_SAFE,
    title: "Assalto armado",
    description: "Assalto armado no local",
    type: EventConstants.TYPES.EMERGENCY,
    severity: EventConstants.SEVERITIES.CRITICAL,
    device: "Usuário 2", 
    camera: cameras[0],
    location: cameras[0].location, 
    date: new Date(2024, 12, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[1]
  },
  { 
    id: "3", 
    software_from: EventConstants.SOFTWARES.FULL_CAM,
    title: "Atualização da câmera",
    description: "Atualização da câmera 2 realizada com sucesso",
    type: EventConstants.TYPES.SYSTEM,
    severity: EventConstants.SEVERITIES.LOW,
    device: "System", 
    camera: cameras[2],
    location: cameras[2].location, 
    date: new Date(2024, 12, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[2]
  },
];


export {cameras, events};