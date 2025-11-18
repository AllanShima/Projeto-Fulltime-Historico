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
