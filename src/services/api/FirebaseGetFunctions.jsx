import { where, collection, query, doc, getDocs, getDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../../contexts/user-context';

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

export const firestoreGetContacts = async(userType) => {
  try {
  // const userCollection = (userState.first + userState.last).toLowerCase();
  const chatCollectionRef = collection(db, "users");
  
  // 2. Pegando o resultado a partir da query
  const q = query(chatCollectionRef);
  // 3. Pegando o resultado a partir da query
  const collectionSnapshot = await getDocs(q);
  if (!collectionSnapshot.empty) {
      // Pega o primeiro documento do array de resultados (como o UID é único, é o que queremos)
      // 1. MAPEIA os DocumentSnapshots para um array de objetos JavaScript.
      //    Aqui chamamos .data() em CADA doc.
      const allContactsData = collectionSnapshot.docs.map(doc => ({
          id: doc.id, // Inclui o ID do documento, se necessário
          ...doc.data() // Pega os campos do documento
      }));
      const filteredContacts = allContactsData.filter(contact => {
          // Note: Assumindo que o campo com o tipo de contato é 'usertype'
          return userType 
              ? contact.usertype === "f/safe" 
              : contact.usertype === "f/center";
      });
      return filteredContacts;
  } else {
      // O documento não existe.
      console.log("Nenhum usuário encontrado!");
      return null;
  }
      } catch (e) {
          console.log("Erro Ocorrido (Possivelmente contato inexistente): " + e);
      } 
};

export const firebaseGetMessages = async(selectedContact, userState) => {
  // Verifica se há algum documento na coleção
  // Definindo referencia da coleção das mensagens
  // Defining the ID of the message
  // 1. Define the collection references (already done)
  const userMessagesCollection = (userState.first + "_" + userState.last).toLowerCase();
  const senderMessagesCollection = (selectedContact.first + "_" + selectedContact.last).toLowerCase();
  const senderChatCollectionRef = collection(db, "users", selectedContact.uid, "chats", userMessagesCollection, "messages");
  const userChatCollectionRef = collection(db, "users", userState.uid, "chats", senderMessagesCollection, "messages");
  // 2. Define the queries (already done, but sorting *before* combining is often good practice)
  // Note: We use orderBy("createdAt", "desc") in the queries as well for efficiency,
  // although the final combined sort ensures the overall order.
  const q1 = query(senderChatCollectionRef,
      orderBy("createdAt", "desc")
  );
  const q2 = query(userChatCollectionRef,
      orderBy("createdAt", "desc")
  );
  // 3. Execute the queries and get the snapshots
  const snapshot1 = await getDocs(q1); // Changed variable name for clarity
  const snapshot2 = await getDocs(q2);
  // 4. Combine and Map the data
  // Extract the data from both snapshots into arrays, including the document ID if needed.
  const allMessages = [];
  // Process snapshot1
  snapshot1.forEach(doc => {
      allMessages.push({
          id: doc.id,
          ...doc.data()
      });
  });
  
  // console.log("Todas as mensagens SNAPSHOT 1: ");
  // console.log(allMessages);
  // Process snapshot2
  snapshot2.forEach(doc => {
      allMessages.push({
          id: doc.id,
          ...doc.data()
      });
  });
  // console.log("Todas as mensagens SNAPSHOT 2: ");
  // console.log(allMessages);
  // 5. Sort the combined array by 'createdAt' in descending order
  // Note: The 'createdAt' property must be a proper Date object or a comparable value (like a Firebase Timestamp)
  // If it's a Firebase Timestamp, you might need to use its toDate() method for accurate comparison.
  const combinedAndSortedMessages = allMessages.sort((a, b) => {
      // Assuming 'createdAt' is a Firebase Timestamp object, convert to milliseconds for comparison
      const timeA = a.createdAt.toMillis();
      const timeB = b.createdAt.toMillis();
      // Para uma ordem crescente (Mais velho primeiro), subtraia B de A
      return timeA - timeB;
  });
  return combinedAndSortedMessages;
};