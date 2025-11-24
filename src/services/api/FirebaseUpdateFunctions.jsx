import { doc, updateDoc } from "firebase/firestore";
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