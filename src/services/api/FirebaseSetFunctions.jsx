import { addDoc, collection, getDocs, limit, orderBy, query, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { useUserContext } from '../../contexts/user-context';

// Guardando o Sinal de alerta do usuário no banco de dados Firestore
export const firestoreSetAlertSignal = async(alert) => {
  const { userState, userDispatch } = useUserContext();
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!alert){
      throw new Error("Sem alerta selecionado!");
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

export const firestoreSetNewUser = async(userId, firstName, lastName, email, type) => {
  try {
    //const userNamePath = (firstName + "_" + lastName).toLowerCase();
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, {
        uid: userId,
        first: firstName,
        last: lastName,
        email: email,
        usertype: type,
        pfpUrl: null,
        createdAt: new Date()
    });
    console.log("Usuário inserido com o ID: ", userId);
  } catch (e) {
    console.error("Erro ao adicionar o usuário: ", e);
  }
}