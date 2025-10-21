import { where, collection, query, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Pegar usuário de acordo com o ID
export const firestoreGetUserById = async (uid) => {
  // 1. Crie a referência DIRETA ao documento usando o UID
  const userDocRef = doc(db, "users", uid); 
  // Caminho: users/ [o valor do uid]
  // 2. Busque o documento
  const documentSnapshot = await getDoc(userDocRef);
  if (!documentSnapshot.empty) {
      // Pega o primeiro documento do array de resultados (como o UID é único, é o que queremos)
      const userData = documentSnapshot.data();
      // Retorna o objeto de dados do documento.
      return userData;
  } else {
      // O documento não existe.
      console.log("Nenhum usuário encontrado com este UID!");
      return null;
  }
};

export const firestoreGetNotifications = async () => {

}