import { addDoc, collection, getDocs, limit, orderBy, query, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { useUserContext } from '../../contexts/user-context';
import { firebaseGetMessages } from './FirebaseGetFunctions';

// Guardando o Sinal de alerta do usuário no banco de dados Firestore
export const firestoreSetAlertSignal = async(alert, userState) => {
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

// Guardando o Sinal de alerta do usuário no banco de dados Firestore
export const firestoreSetAlertOnByUid = async(alert, userState, userDispatch) => {
  try {
    // se por algum motivo não existe algum alerta selecionado
    if (!alert){
      throw new Error("Sem alerta selecionado!");
    }
    userDispatch({type: "SET_ALERT", payload: {alertOn: alert}});
    // Também armazena no histórico de sinais
    firestoreSetAlertSignal(alert, userState);
    // Defining the ID of the message
    // 1. Define the reference to the subcollection
    const documentId = "current_alert";
    const docRef = doc(db, "users", userState.uid, "alert_on", documentId);
 
    await setDoc(docRef, {
        title: alert.title,
        createdAt: new Date()
    });
    // id é o id do nome do documento inserido no banco, n o id do doc em si
    console.log("Current Alert inserido no db...");
  } catch (e) {
    console.error("Erro ao adicionar o alerta: ", e);
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