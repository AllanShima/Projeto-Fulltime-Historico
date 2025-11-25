import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const firestoreUpdateUserLocation = async (userState, userDispatch, newLocationData) => {
  try {
    if (!newLocationData) {
        throw new Error("Nenhuma localização selecionada!");
    }
    userDispatch({type: "SET_LOCATION", payload: {location: newLocationData}});
    // 1. Crie a referência DIRETA ao documento usando o UID
    const userDocRef = doc(db, "users", userState.uid);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(userDocRef, {
      location: newLocationData // O objeto ou valor que você deseja definir
    });

    console.log(`Localização do usuário ${userState.uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar a localização do usuário: ", e);
    return false;
  }
};

// Muda o status do alerta atual
export const firestoreUpdateCurrentEventStatusByUid = async (uid, newStatus) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "current_alerts", uid);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      status: newStatus // O objeto ou valor que você deseja definir
    });
    console.log(`Localização do usuário ${uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar o status do alerta: ", e);
    return false;
  }
};

export const firestoreUpdateCurrentEventVisualizedByUid = async (uid, newInfo) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "current_alerts", uid);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      visualized: newInfo // O objeto ou valor que você deseja definir
    });
    console.log(`Localização do usuário ${uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar a visualização do alerta: ", e);
    return false;
  }
};

export const firestoreUpdateCurrentEventCameraByUid = async (uid, cameraInfo) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "current_alerts", uid);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      camera: cameraInfo // O objeto ou valor que você deseja definir
    });
    console.log(`Camera do alerta atual ${uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar a câmera do alerta: ", e);
    return false;
  }
};

export const firestoreUpdateCurrentEventVideosByUid = async (uid, video_recorded) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "current_alerts", uid);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      videos_recorded: arrayUnion(video_recorded) // O objeto ou valor que você deseja definir
    });
    console.log(`Video gravado do alerta atual ${uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar videos_recorded do alerta atual: ", e);
    return false;
  }
};

export const firestoreUpdateUserCanRecord = async (uid, userDispatch, newBool) => {
  try {

    if (newBool) {
      await userDispatch({type: "SET_CAN_RECORD"});
    } else{
      await userDispatch({type: "RESET_CAN_RECORD"});
    }
    
    // 1. Crie a referência DIRETA ao documento usando o UID
    const userDocRef = doc(db, "users", uid);

    await updateDoc(userDocRef, {
      can_record: newBool
    });

    return true;

  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar 'can_record' do usuário: ", e);
    return false;
  }
};

export const firestoreUpdateUserCanSendEmail = async (uid, userDispatch, newBool) => {
  try {
    if (!newBool) {
      throw new Error("Nenhuma variável booleana selecionada!");
    }
    if (newBool) {
      await userDispatch({type: "SET_CAN_SEND_EMAIL"});
    } else{
      await userDispatch({type: "RESET_CAN_SEND_EMAIL"});
    }
    
    // 1. Crie a referência DIRETA ao documento usando o UID
    const userDocRef = doc(db, "users", uid);

    await updateDoc(userDocRef, {
      can_send_email: newBool
    });

    return true;

  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar 'can_send_email' do usuário: ", e);
    return false;
  }
};

// Adicionar o user_forms no evento
export const firestoreUpdateMonitorEventById = async (id, user_forms) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "monitor_events", id);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      user_forms: user_forms // O objeto ou valor que você deseja definir
    });
    console.log(`user_forms foi adicionado/alterado com sucesso!`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar o user_forms: ", e);
    return false;
  }
};

// Adicionar o video_recorded no evento do monitor
export const firestoreUpdateMonitorVideoById = async (id, video_url) => {
  try {
    const eventDocRef = doc(db, "monitor_events", id);

    // 2. Use arrayUnion para adicionar o novo video_url ao array existente
    await updateDoc(eventDocRef, {
      video_recorded: arrayUnion(video_url) 
    });
    
    console.log(`Novo video_url adicionado com sucesso ao monitor_events/${id}!`);
    return true;
  } catch (e) {
    console.error("Erro ao atualizar o video_recorded: ", e);
    return false;
  }
};

// Update em show_button na notificação do usuário que seja camera
export const firestoreUpdateUserNotificationShowButtonFalse = async (uid, notification_id) => {
  try {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const eventDocRef = doc(db, "users", uid, "notifications", notification_id);

    // 2. Use updateDoc para modificar APENAS o campo 'location'
    await updateDoc(eventDocRef, {
      show_button: false // O objeto ou valor que você deseja definir
    });
    console.log(`Localização do usuário ${uid} atualizada com sucesso.`);
    return true;
  } catch (e) {
    // Se o documento não existir, updateDoc lançará um erro.
    console.error("Erro ao atualizar a visualização do alerta: ", e);
    return false;
  }
};