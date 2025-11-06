import { doc, deleteDoc } from 'firebase/firestore'; // Importe deleteDoc
import { db } from '../firebase';

export const firestoreDeleteAlertOnByUid = async (userState, userDispatch) => {
    try {
        if (!userState.uid) {
            console.error("UID do usuário ausente.");
            return;
        }
        userDispatch({type: "RESET_ALERT"});

        // 2. Defina a referência COMPLETA do documento a ser apagado
        const documentId = "current_alert";
        const docRef = doc(
            db, 
            "users", 
            userState.uid, 
            "alert_on", 
            documentId // <-- O ID do documento a ser apagado
        );

        // 3. Use deleteDoc para apagar o documento
        await deleteDoc(docRef);

        console.log(`Documento de alerta "${documentId}" apagado com sucesso.`);

    } catch (e) {
        // Pode ser que o documento nem exista, o que não é necessariamente um erro fatal
        console.error("Erro ao apagar o alerta:", e);
    }
}