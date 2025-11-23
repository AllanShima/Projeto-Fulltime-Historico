import { addDoc, collection, getDocs, limit, orderBy, query, doc, setDoc, updateDoc } from 'firebase/firestore'
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
      uid: documentId,
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
      can_send_email: false,
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

    // 1. Define a referência para a subcoleção
    const chatCollectionRef = collection(db, "monitor_events");

    const alertType = sevOptions[event.type]; // Assumindo que 'sevOptions' é definido

    let docRef;

    // 2. Cria o documento sem o ID no campo 'id'
    // Deixe o campo 'id' fora ou como null temporariamente se preferir.
    // Eu o removi abaixo para simplificar a criação inicial.

    const baseData = {
      software_from: event.software_from,
      type: event.type,
      location: event.location,
      show_button: false,
      device: event.device,
      device_pfp: null,
      video_available: false,
      video_recorded: null,
      camera: event.camera,
      date: event.date,
      user_report: null,
      finished: new Date()
    };
    
    if (event.software_from == "f/safe") {
      docRef = await addDoc(chatCollectionRef, {
        ...baseData,
        title: "Alerta de Segurança",
        uid: event.uid,
        description: "Alerta iminente de usuário f/safe",
        severity: EventsConstants.SEVERITIES.CRITICAL, // Assumindo 'EventsConstants'
        alert: alertType,
        style: EventsConstants.TYPES.EMERGENCY // Assumindo 'EventsConstants'
      });
    } else {
      docRef = await addDoc(chatCollectionRef, {
        ...baseData,
        title: event.title,
        uid: null,
        description: event.description,
        severity: event.severity,
        alert: event.alert,
        style: EventsConstants.TYPES.EMERGENCY // Assumindo 'EventsConstants'
      });
    }

    // ⭐️ 3. USA O updateDoc PARA ADICIONAR O ID AO CAMPO 'id'
    await updateDoc(docRef, {
      id: docRef.id // O ID do documento gerado automaticamente
    });

    console.log("Evento inserido e atualizado com o ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao inserir/atualizar o evento: ", e);
  }
}


// Guardando as respostas do sinal de alerta
export const firestoreSetUserReport = async(userState, notificationData) => {
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!notificationData){
      throw new Error("Nenhum dado presente!");
    }

    // 1. Define a referência para a subcoleção
    const chatCollectionRef = collection(db, "users", uid, "notifications");

    // 2. Cria o documento sem o ID no campo 'id'
    // Deixe o campo 'id' fora ou como null temporariamente se preferir.
    // Eu o removi abaixo para simplificar a criação inicial.

    // objeto de entrada
    {
      type: "report"
      title: "Relatório"
    }

    // const type = 

    const docRef = await addDoc(chatCollectionRef, {
      incident_cause: null,
      estimated_time: null,
      incident_injures: null,
      evidences: null,
      monitor_answer: null,
      response_time: null,
      software_from: EventsConstants.SOFTWARES.F_SAFE,
      title: notificationData.title,
      description: "Nova mensagem do Operador disponível no Live Chat",
      type: EventsConstants.TYPES.EMERGENCY,
      severity: EventsConstants.SEVERITIES.CRITICAL,
      alert: EventsConstants.ALERTS.REPORT,
      show_button: false,
      device: userState.first + " " + userState.last, 
      camera: null, 
      video_available: false,
      createdAt: new Date()
    });

    // ⭐️ 3. USA O updateDoc PARA ADICIONAR O ID AO CAMPO 'id'
    await updateDoc(docRef, {
      id: docRef.id // O ID do documento gerado automaticamente
    });

    console.log("Notificação do usuário inserido e atualizado com o ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao inserir/atualizar a notificação do usuário: ", e);
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
      can_record: false,
      can_send_email: false,
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