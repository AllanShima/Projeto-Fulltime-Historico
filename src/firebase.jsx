// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// As APIS são utilizados para detectar o projeto firebase, não precisa esconder
const firebaseConfig = {
  apiKey: "AIzaSyAC3_QCymO3bSL53gSohMWGk3G9mkotOOg",
  authDomain: "fulltime-historico.firebaseapp.com",
  projectId: "fulltime-historico",
  storageBucket: "fulltime-historico.firebasestorage.app",
  messagingSenderId: "888352218511",
  appId: "1:888352218511:web:716be04e4fc99a649bbffa",
  measurementId: "G-VMZEKC1PF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// get the authentication firebase's functions
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


// -------------------------------------------------------------------


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const PDFDocument = require("pdfkit");

// admin.initializeApp();
// const db = admin.firestore();
// const storage = admin.storage();

// Função usada ****** --------------
// async function registrarHistorico(incidenteId, acao, detalhes = {}) {
//   await db.collection("historico").add({
//     incidenteId,
//     acao,
//     detalhes,
//     timestamp: new Date().toISOString()
//   });
// }

// exports.adicionarVideo = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId, videoUrl } = data;
//     const videoData = { videoUrl, dataUpload: new Date().toISOString() };
//     await db.collection("incidentes").doc(incidenteId).collection("videos").add(videoData);
//     await db.collection("incidentes").doc(incidenteId).update({ videoPrincipal: videoUrl });
//     await registrarHistorico(incidenteId, "video_adicionado", videoData);
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.adicionarFormularioUsuario = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId, respostas } = data;
//     const formData = { respostas, enviadoEm: new Date().toISOString() };
//     await db.collection("incidentes").doc(incidenteId).collection("formularioUsuario").add(formData);
//     await registrarHistorico(incidenteId, "formulario_adicionado", formData);
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.enviarNotificacaoPush = functions.https.onCall(async (data, context) => {
//   try {
//     const { tokenDispositivo, titulo, corpo } = data;
//     const mensagem = { notification: { title: titulo, body: corpo }, token: tokenDispositivo };
//     await admin.messaging().send(mensagem);
//     await registrarHistorico("global", "notificacao_enviada", { titulo, corpo });
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.registrarInteracaoOmnichannel = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId, canal, mensagem, remetente } = data;
//     const interacao = { canal, mensagem, remetente, timestamp: new Date().toISOString() };
//     await db.collection("incidentes").doc(incidenteId).collection("interacoesOmnichannel").add(interacao);
//     await registrarHistorico(incidenteId, "interacao_registrada", interacao);
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.getIncidente = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId } = data;
//     const docSnap = await db.collection("incidentes").doc(incidenteId).get();
//     if (!docSnap.exists) throw new Error("Incidente não encontrado");
//     const incidente = docSnap.data();
//     const videos = (await db.collection("incidentes").doc(incidenteId).collection("videos").get()).docs.map(d => d.data());
//     const formularios = (await db.collection("incidentes").doc(incidenteId).collection("formularioUsuario").get()).docs.map(d => d.data());
//     const interacoes = (await db.collection("incidentes").doc(incidenteId).collection("interacoesOmnichannel").get()).docs.map(d => d.data());
//     return { sucesso: true, incidente, videos, formularios, interacoes };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.atualizarIncidente = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId, novosDados } = data;
//     await db.collection("incidentes").doc(incidenteId).update(novosDados);
//     await registrarHistorico(incidenteId, "incidente_atualizado", novosDados);
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.deletarInteracao = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId, interacaoId } = data;
//     await db.collection("incidentes").doc(incidenteId).collection("interacoesOmnichannel").doc(interacaoId).delete();
//     await registrarHistorico(incidenteId, "interacao_deletada", { interacaoId });
//     return { sucesso: true };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });

// exports.gerarRelatorioPDF = functions.https.onCall(async (data, context) => {
//   try {
//     const { incidenteId } = data;
//     const incidenteRef = db.collection("incidentes").doc(incidenteId);
//     const doc = new PDFDocument({ margin: 50 });
//     const buffers = [];
//     doc.on("data", buffers.push.bind(buffers));
//     doc.fontSize(20).text(`Relatório do Incidente: ${incidenteId}`, { align: "center" });
//     doc.moveDown();
//     const [incidenteSnap, videosSnap, formSnap, interacoesSnap] = await Promise.all([
//       incidenteRef.get(),
//       incidenteRef.collection("videos").get(),
//       incidenteRef.collection("formularioUsuario").get(),
//       incidenteRef.collection("interacoesOmnichannel").get()
//     ]);
//     if (incidenteSnap.exists) {
//       const incidenteData = incidenteSnap.data();
//       doc.fontSize(12).text(`Dados do Incidente:`);
//       for (const [key, value] of Object.entries(incidenteData)) {
//         doc.text(`• ${key}: ${value}`);
//       }
//       doc.moveDown();
//     } else {
//       doc.text("Incidente não encontrado.");
//     }
//     doc.fontSize(14).text("📹 Vídeos:", { underline: true });
//     if (!videosSnap.empty) {
//       videosSnap.forEach((v, idx) => {
//         doc.fontSize(12).text(`${idx + 1}. ${v.data().videoUrl} (enviado em: ${new Date(v.data().dataUpload).toLocaleString()})`);
//       });
//     } else {
//       doc.text("Nenhum vídeo registrado.");
//     }
//     doc.moveDown();
//     doc.fontSize(14).text("📝 Formulários do Usuário:", { underline: true });
//     if (!formSnap.empty) {
//       formSnap.forEach((f, idx) => {
//         doc.fontSize(12).text(`${idx + 1}. Respostas: ${JSON.stringify(f.data().respostas)} (enviado em: ${new Date(f.data().enviadoEm).toLocaleString()})`);
//       });
//     } else {
//       doc.text("Nenhum formulário registrado.");
//     }
//     doc.moveDown();
//     doc.fontSize(14).text("💬 Interações Omnichannel:", { underline: true });
//     if (!interacoesSnap.empty) {
//       interacoesSnap.forEach((i, idx) => {
//         const d = i.data();
//         doc.fontSize(12).text(`${idx + 1}. [${d.canal}] ${d.remetente}: ${d.mensagem} (em: ${new Date(d.timestamp).toLocaleString()})`);
//       });
//     } else {
//       doc.text("Nenhuma interação registrada.");
//     }
//     doc.end();
//     await new Promise(resolve => doc.on("end", resolve));
//     const pdfData = Buffer.concat(buffers);
//     const filePath = `relatorios/${incidenteId}.pdf`;
//     const file = storage.bucket().file(filePath);
//     await file.save(pdfData, { contentType: "application/pdf" });
//     const [url] = await file.getSignedUrl({ action: "read", expires: "03-01-2030" });
//     await registrarHistorico(incidenteId, "relatorio_pdf_gerado", { url });
//     return { sucesso: true, url };
//   } catch (e) {
//     return { sucesso: false, erro: e.message };
//   }
// });