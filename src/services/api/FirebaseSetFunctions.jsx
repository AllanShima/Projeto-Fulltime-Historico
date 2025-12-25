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

    // 2. GERA UM ID ÚNICO PARA USAR COMO CAMPO 'id' NO CONTEÚDO
    // Usamos o Auto-ID do Firestore para garantir unicidade e formato de ID
    const newAlertRef = doc(collection(db, "current_alerts"));
    const uniqueAlertId = newAlertRef.id;
    
    const alertType = sevOptions[event];

    // Informações para notificação do monitor:
    
    await setDoc(docRef, {
      monitor_id: uniqueAlertId, 
      uid: documentId,
      visualized: false,
      videos_recorded: [],
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

    const monitor_id = event.monitor_id;

    // 1. Define a referência para a subcoleção
    const docRef = doc(db, "monitor_events", monitor_id);

    const alertType = sevOptions[event.type]; // Assumindo que 'sevOptions' é definido

    // 2. Cria o documento sem o ID no campo 'id'
    // Deixe o campo 'id' fora ou como null temporariamente se preferir.
    // Eu o removi abaixo para simplificar a criação inicial.

    const baseData = {
      id: monitor_id,
      software_from: event.software_from,
      type: event.type,
      location: event.location,
      show_button: false,
      device: event.device,
      device_pfp: null,
      video_available: false,
      videos_recorded: event.videos_recorded,
      camera: event.camera,
      date: event.date,
      user_forms: null,
      finished: new Date()
    };
    
    if (event.software_from == "f/safe") {
      additionalDoc = await setDoc(docRef, {
        ...baseData,
        title: "Alerta de Segurança",
        uid: event.uid,
        description: "Alerta iminente de usuário f/safe",
        severity: EventsConstants.SEVERITIES.CRITICAL, // Assumindo 'EventsConstants'
        alert: alertType,
        style: EventsConstants.TYPES.EMERGENCY // Assumindo 'EventsConstants'
      });
    } else {
      additionalDoc = await setDoc(docRef, {
        ...baseData,
        title: event.title,
        uid: null,
        description: event.description,
        severity: event.severity,
        alert: event.alert,
        style: EventsConstants.TYPES.EMERGENCY // Assumindo 'EventsConstants'
      });
    }

    console.log("Evento inserido e atualizado com o ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao inserir/atualizar o evento: ", e);
  }
}


// Guardando as respostas do sinal de alerta
export const firestoreSetUserNotification = async(uid, type, report=null, monitor_id=null, camera_info=null) => {
  try {
    // se por algum motivo não existe nenhum alerta selecionado
    if (!type){
      throw new Error("Nenhum tipo passado!");
    }

    // 1. Define a referência para a coleção de notificações
    const notificationCollectionRef = collection(db, "users", uid, "notifications");
    
    // 2. GERA A REFERÊNCIA DO DOCUMENTO COM ID AUTOMÁTICO (Auto-ID)
    // Isso cria a referência do documento e obtém o ID, sem gravar ainda.
    const docRef = doc(notificationCollectionRef);
    const notificationId = docRef.id; // ✅ ID gerado (ex: "X7sP...")

    // 3. Define a estrutura base da notificação
    const baseNotification = {
        // ✅ OTIMIZAÇÃO: O 'id' do documento é inserido aqui na primeira gravação
        id: notificationId, 
        report: report,
        monitor_id: monitor_id,
        show_button: null, // Será definido nos ifs abaixo
        camera: camera_info, 
        video_available: false,
        uid: uid,
        software_from: EventsConstants.SOFTWARES.F_CENTER,
        date: new Date()
    };
    
    let notificationData;

    // 4. Determina os dados específicos com base no 'type'
    if (type == "incident_form"){
      notificationData = {
          ...baseNotification,
          title: "Formulário de Complemento do Incidente",
          description: `Conte a sua parte do ocorrido de ${new Date()}`,
          type: EventsConstants.TYPES.SYSTEM,
          alert: EventsConstants.ALERTS.FORMS,
          show_button: true, // Sobrescreve o null em baseNotification
      };
    } else if (type == "help_incoming") {
      notificationData = {
          ...baseNotification,
          title: "Ajuda à Caminho",
          description: "Um monitor visualizou o seu alerta e está a caminho do seu local",
          type: EventsConstants.TYPES.EMERGENCY,
          alert: EventsConstants.ALERTS.HELP,
          show_button: false,
      };
    } else if (type == "live_camera") {
      notificationData = {
          ...baseNotification,
          title: "Acesso temporário à Câmera",
          description: "O monitor habilitou o acesso à camera do local",
          type: EventsConstants.TYPES.ACCESS,
          alert: EventsConstants.ALERTS.CAMERA,
          show_button: true,
      };
    } else if (type == "report") {
      notificationData = {
          ...baseNotification,
          title: "Relatório de Incidente",
          description: `O relatório do último incidente foi disponibilizado`,
          type: EventsConstants.TYPES.SYSTEM,
          alert: EventsConstants.ALERTS.REPORT,
          show_button: true,
      };
    } else {
         throw new Error(`Tipo de notificação inválido: ${type}`);
    }

    // ⭐️ 5. EXECUTA setDoc (UMA ÚNICA GRAVAÇÃO)
    // Usa setDoc na referência (docRef) com o ID gerado, garantindo atomicidade.
    await setDoc(docRef, notificationData);

    console.log("Notificação do usuário inserida com o ID: ", notificationId);
    return notificationId; // Retorna o ID se precisar dele externamente

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

// Guardando nova câmera 
export const firestoreSetNewCamera = async(camera) => {
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!camera){
      throw new Error("Nenhuma câmera detectada!");
    }
    // Defining the ID of the message
    // 1. Define the reference to the subcollection
    const cameraCollectionRef = collection(db, "monitor_cameras");

    const docRef = doc(cameraCollectionRef);
    const documentId = docRef.id;

    // Informações para notificação do monitor:
    await setDoc(docRef, {
      id: documentId, 
      imageUrl: camera.imageUrl,
      name: camera.name,
      address: camera.address,
      status: camera.status,
      position: camera.position,
      createdAt: new Date()    
    });
    // id é o id do nome do documento inserido no banco, n o id do doc em si
    console.log("Alerta Atual (current_alert) inserido no db...");
  } catch (e) {
    console.error("Erro ao adicionar o alerta atual: ", e);
  }
}
