// totalTimeRecorded = tempo total de gravação da câmera
const cameras = [
    {
        id: "1",
        name: "Câmera",
        location: "Entrada Principal",
        status: "online",
        position: "top-left"
    },
    {
        id: "2",
        name: "Câmera 2",
        location: "Andar do Escritório",
        status: "online",
        position: "top-right"
    },
    {
        id: "3",
        name: "Câmera 3",
        location: "Estacionamento",
        status: "online",
        position: "bottom-left"
    },
    {
        id: "4",
        name: "Câmera 4",
        location: "Saída de Incêndio",
        status: "offline",
        position: "bottom-right"
    },
    {
        id: "5",
        name: "Câmera 5",
        location: "Recepção",
        status: "online",
        position: "center"
    },
    {
        id: "6",
        name: "Câmera 6",
        location: "Sala do Servidor",
        status: "online",
        position: "top-left"
    },
];

// // emergency pode ser eventos pelo f/safe ou alarmes ativados pelo FullArm
// const event_type = ["emergency", "system", "motion", "access"];

// // software DE ONDE o evento é reportado
// const softwares = ["F/Detect", "F/Safe", "FullCond", "FullCam", "FullArm"]

// // nível de severidade
// const severity = ["low", "medium", "high", "critical"]

// Enumeração dos valores em um único objeto:
const EventsConstants = {
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
    },
    ALERTS: {
        MESSAGE: "message",
        HELP: "help",
        FORMS: "forms",
        REPORT: "report",
        CAMERA: "camera",
        ALERT: "alert",
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

// Todos os eventos onde serão processados para o operador

// location será de acordo com o que o monitor colocar ao adicionar cameras
// User vai depender do login
// BS: O alerta só será ativado quando o usuário escolher a localização dele
// Date inclui a data e o horário do ocorrido
const events = [
  { 
    id: "1", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Assalto armado",
    description: "Assalto armado no local",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    alert: EventsConstants.ALERTS.FORMS,
    show_button: true,
    device: "Eduarda Ferreira", 
    camera: cameras[2], 
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[0]
  },
  { 
    id: "2", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Assalto armado",
    description: "Assalto armado no local",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    device: "Paulo Sérgio", 
    camera: cameras[0],
    date: new Date(2024, 12, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[1]
  },
  { 
    id: "3", 
    software_from: EventsConstants.SOFTWARES.FULL_CAM,
    title: "Atualização da câmera",
    description: "Atualização da câmera 2 realizada com sucesso",
    type: EventsConstants.TYPES.SYSTEM,
    severity: EventsConstants.SEVERITIES.LOW,
    device: "System", 
    camera: cameras[2],
    date: new Date(2024, 12, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[2]
  },
  { 
    id: "4", 
    software_from: EventsConstants.SOFTWARES.FULL_CAM,
    title: "Atualização da câmera",
    description: "Atualização da câmera 2 realizada com sucesso",
    type: EventsConstants.TYPES.SYSTEM,
    severity: EventsConstants.SEVERITIES.LOW,
    device: "System", 
    camera: cameras[2],
    date: new Date(2024, 12, 15, 14, 20, 20),
    video_available: true,
    video_recorded: VideosRecorded[2]
  },
];

const ExtraUserEvents = [
  { 
    id: "3", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Acompanhar Câmera",
    description: "Clique no botão para acompanhar a câmera em tempo real",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    alert: EventsConstants.ALERTS.CAMERA,
    show_button: true,
    device: "Eduarda Ferreira", 
    camera: cameras[0], 
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: false,
    video_recorded: null
  },
  { 
    id: "4", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Formulário de Complemento do Incidente",
    description: "Preencha o formulário o quanto possível",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    alert: EventsConstants.ALERTS.FORMS,
    show_button: true,
    device: "Eduarda Ferreira", 
    camera: null, 
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: false,
    video_recorded: null
  }, 
  { 
    id: "5", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Relatório Disponível",
    description: "Relatório completo do incidente disponível no e-mail",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    alert: EventsConstants.ALERTS.REPORT,
    show_button: true,
    device: "Eduarda Ferreira", 
    camera: null, 
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: false,
    video_recorded: null
  }, 
  { 
    id: "6", 
    software_from: EventsConstants.SOFTWARES.F_SAFE,
    title: "Aviso",
    description: "Preencha o formulário",
    type: EventsConstants.TYPES.EMERGENCY,
    severity: EventsConstants.SEVERITIES.CRITICAL,
    alert: EventsConstants.ALERTS.ALERT,
    show_button: false,
    device: "Eduarda Ferreira", 
    camera: null, 
    date: new Date(2024, 6, 15, 14, 20, 20),
    video_available: false,
    video_recorded: null
  }, 
]

export {cameras, events, ExtraUserEvents};