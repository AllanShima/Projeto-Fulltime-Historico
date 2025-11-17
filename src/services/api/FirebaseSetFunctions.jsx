import { addDoc, collection, getDocs, limit, orderBy, query, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { useUserContext } from '../../contexts/user-context';
import { firebaseGetMessages } from './FirebaseGetFunctions';

const EventsConstants = {
    TYPES: {
      EMERGENCY: "emergency",
      SYSTEM: "system",
      MOTION: "motion",
      ACCESS: "access",
    },
    SOFTWARES: {
      F_DETECT: "f/detect",
      F_SAFE: "f/safe",
      FULL_COND: "fullcond",
      FULL_CAM: "fullcam",
      FULL_ARM: "fullarm",
      F_CENTER: "f/center"
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
    },
    TITLE: {
      "INCÊNDIO": "Incêndio",
      "ALAGAMENTO": "Alagamento",
      "FURTO/ROUBO RESIDENCIAL": "Furto/Roubo Residencial",
      "EMERGÊNCIA MÉDICA": "Emergência Médica",
      "FALHA NA ILUMINAÇÃO": "Falha na Iluminação",
      "PÂNICO": "Pânico",
      "CHUVAS SEVERAS": "Chuvas Severas",
      "VIOLÊNCIA DOMÉSTICA": "Violência Doméstica",
      "SUPERVISÃO": "Supervisão"
    }
};

const sevOptions = {
  "INCÊNDIO": EventsConstants.ALERTS.ALERT,
  "ALAGAMENTO": EventsConstants.ALERTS.ALERT,
  "FURTO/ROUBO RESIDENCIAL": EventsConstants.ALERTS.ALERT,
  "EMERGÊNCIA MÉDICA": EventsConstants.ALERTS.ALERT,
  "FALHA NA ILUMINAÇÃO": EventsConstants.ALERTS.HELP,
  "PÂNICO": EventsConstants.ALERTS.ALERT,
  "CHUVAS SEVERAS": EventsConstants.ALERTS.HELP,
  "VIOLÊNCIA DOMÉSTICA": EventsConstants.ALERTS.ALERT,
  "SUPERVISÃO": EventsConstants.ALERTS.HELP
}

// // Guardando o Sinal de alerta do usuário no banco de dados Firestore
// export const firestoreSetAlertSignal = async(alert, userState) => {
//   try {
//     // se por algum motivo não existe algum alerta selecionado
//     if (!alert){
//       throw new Error("Sem alerta selecionado!");
//     }
//     // Defining the ID of the message
//     // 1. Define the reference to the subcollection
//     const chatCollectionRef = collection(db, "monitor_events");

//     // software_from: EventsConstants.SOFTWARES.F_SAFE,
//     // title: "Mensagem Nova",
//     // description: "Nova mensagem do Operador disponível no Live Chat",
//     // type: EventsConstants.TYPES.EMERGENCY,
//     // severity: EventsConstants.SEVERITIES.CRITICAL,
//     // alert: EventsConstants.ALERTS.MESSAGE,
//     // show_button: false,
//     // device: "Eduarda Ferreira", 
//     // camera: null, 
//     // date: new Date(2024, 6, 15, 14, 20, 20),
//     // video_available: false,
//     // video_recorded: null
//     const docRef = await addDoc(chatCollectionRef, {
//       title: alert.title,
//       software_from: EventsConstants.SOFTWARES.F_SAFE,
//       title: "Alerta de Segurança",
//       description: "Alerta iminente de usuário f/safe",
//       type: EventsConstants.TYPES.EMERGENCY,
//       severity: EventsConstants.SEVERITIES.CRITICAL,
//       alert: alertType,
//       show_button: false,
//       device: userState.first + " " + userState.last,
//       device_pfp: null, // deixar null por enquanto
//       camera: null,
//       date: new Date(),
//       video_available: false,
//       video_recorded: null
//     });
//     // id é o id do nome do documento inserido no banco, n o id do doc em si
//     console.log("Alerta Inserida com o ID: ", docRef.id);
//   } catch (e) {
//     console.error("Erro ao adicionar o alerta: ", e);
//   }
// }

// Guardando o Sinal de alerta do usuário no banco de dados Firestore
export const firestoreSetAlertOnByUid = async(event, userState, userDispatch, currentLocation) => {
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!event){
      throw new Error("Nenhum Evento selecionado!");
    }
    userDispatch({type: "SET_ALERT", payload: {alertOn: event}});
    // Defining the ID of the message
    // 1. Define the reference to the subcollection
    const documentId = userState.uid;
    const docRef = doc(db, "current_alerts", documentId);
    const alertType = sevOptions[event];

    // Informações para notificação do monitor:
    
    await setDoc(docRef, {
      id: documentId,
      visualized: false,
      software_from: EventsConstants.SOFTWARES.F_SAFE,
      title: "Alerta de Segurança",
      description: "Alerta iminente de usuário f/safe",
      type: event,
      severity: EventsConstants.SEVERITIES.CRITICAL,
      alert: alertType,
      device: userState.first + " " + userState.last,
      camera: null,
      location: currentLocation,
      status: "active",
      response: null,
      date: new Date()
    });
    // id é o id do nome do documento inserido no banco, n o id do doc em si
    console.log("Alerta Atual (current_alert) inserido no db...");
  } catch (e) {
    console.error("Erro ao adicionar o alerta atual: ", e);
  }
}


// Guardando as respostas do sinal de alerta
export const firestoreSetMonitorEvent = async(event) => {
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!event){
      throw new Error("Sem alerta selecionado!");
    }
    // if (userState.usertype == "f/safe") {

    // }
    // Defining the ID of the message
    // 1. Define the reference to the subcollection
    const chatCollectionRef = collection(db, "monitor_events");

    // Informações do Evento:
    let docRef;
    if (event.software_from == "f/safe") {
      docRef = await addDoc(chatCollectionRef, {
        software_from: event.software_from,
        title: "Alerta de Segurança",
        description: "Alerta iminente de usuário f/safe",
        type: EventsConstants.TYPES.EMERGENCY,
        severity: EventsConstants.SEVERITIES.CRITICAL,
        alert: alertType,
        show_button: false,
        device: userState.first + " " + userState.last,
        device_pfp: null,
        video_available: false,
        video_recorded: null,
        camera: alert.camera,
        date: new Date()
      });
    } else {
      docRef = await addDoc(chatCollectionRef, {
        software_from: event.software_from,
        title: event.title,
        description: event.description,
        type: event.type,
        severity: event.severity,
        alert: event.alert,
        show_button: false,
        device: event.device, 
        device_pfp: null,
        camera: event.camera, 
        video_available: false,
        video_recorded: null,
        date: new Date()      
      });
    }
    // id é o id do nome do documento inserido no banco, n o id do doc em si
    console.log("Evento inserido com o ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao inserir o evento: ", e);
  }
}

// Guardando o Formulário do usuário
export const firestoreSetUserReport = async(data, userState) => {
  try {
    // se por algum motivo não existe algum dado
    if (!data){
      throw new Error("Nenhuma informação foi passado!");
    }
    // Defining the ID of the message
    // 1. Define the reference to the subcollection
    const chatCollectionRef = collection(db, "users", userState.uid, "alerts_sent");
 
    const docRef = await addDoc(chatCollectionRef, {
      title: alert.title,
      createdAt: new Date()
    });
    // id é o id do nome do documento inserido no banco, n o id do doc em si
    console.log("Alerta Inserida com o ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar o alerta: ", e);
  }
}

export const firestoreSetNewUser = async(userId, firstName, lastName, email, type, location, phone_number) => {
  try {
    //const userNamePath = (firstName + "_" + lastName).toLowerCase();
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
      uid: userId,
      first: firstName,
      last: lastName,
      email: email,
      phone_number: phone_number,
      usertype: type,
      pfpUrl: null,
      location: location,
      createdAt: new Date()
    });
    console.log("Usuário inserido com o ID: ", userId);
  } catch (e) {
    console.error("Erro ao adicionar o usuário: ", e);
  }
}

export const firebaseSetMessages = async(selectedContact, textareaValue, userState) => {
    try {
        // Defining the ID of the message
        // 1. Define the reference to the subcollection
        const senderFullnameCollection = (selectedContact.first + "_" + selectedContact.last).toLowerCase();
        const chatCollectionRef = collection(db, "users", userState.uid, "chats", senderFullnameCollection, "messages");
        // 2. Query for the document with the highest 'id'
        const q = query(chatCollectionRef,
            orderBy("id", "desc"), // Sort by 'id' in descending order
            limit(1)             // Only get the top document
        );
        // 3. Execute the query
        const snapshot = await getDocs(q);
        // 4. Determine the next 'id'
        let nextId = 1; // Default starting ID if the collection is empty
        if (!snapshot.empty) {
            // Get the 'id' from the first (and only) document in the result
            const lastDoc = snapshot.docs[0].data();
            const maxId = lastDoc.id;
            // Calculate the next ID (maxId + 1)
            nextId = maxId + 1;
        }
        const docRef = await addDoc(chatCollectionRef, {
            id: nextId,
            text: textareaValue,
            userWith: selectedContact,
            createdAt: new Date()
        });
        // id é o id do nome do documento inserido no banco, n o id do doc em si
        console.log("Mensagem Inserida com o ID: ", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar a mensagem: ", e);
    }
}