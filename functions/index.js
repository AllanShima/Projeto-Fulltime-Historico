// functions/index.js (Versão Corrigida)

const functions = require('firebase-functions');
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const sgMail = require('@sendgrid/mail');

setGlobalOptions({ maxInstances: 10 });

// --- MUDANÇA CRÍTICA AQUI ---
// Defina a chave SendGrid GLOBALMENTE usando process.env
// O nome da variável de ambiente DEVE ser process.env.SENDGRID_API_KEY
// e não process.env.sendgrid.key
// ----------------------------


// Cria uma função que pode ser chamada por uma requisição HTTP
exports.helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Olá do Firebase Functions V2!");
});

const SENDER_EMAIL = 'allanshinhama@gmail.com'; 
// Exponha a função SendGrid como uma função HTTP do Firebase
exports.sendAlertEmail = onRequest(async (req, res) => {
    // ⚠️ Removido o bloco 'try/catch' com sgMail.setApiKey
    
    // Verificação inicial se a chave está presente
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith("SG.")) {
        return res.status(500).json({ mensagem: 'Erro de Configuração: Chave SendGrid ausente.' });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // <--- AGORA ESTÁ AQUI
    
    if (req.method !== 'POST') {
        return res.status(405).json({ mensagem: 'Método não permitido.' }); 
    }
    
    const { toEmail, subject, text, html } = req.body;

    try {
        if (!toEmail || !subject || (!text && !html)) {
            return res.status(400).json({ mensagem: 'Dados de e-mail incompletos.' });
        }

        const msg = {
            to: toEmail,
            from: SENDER_EMAIL, 
            subject: subject,
            text: text,
            html: html,
        };

        await sgMail.send(msg);

        return res.status(200).json({ mensagem: 'E-mail enviado com sucesso.' });

    } catch (error) {
        logger.error('Erro ao enviar e-mail via SendGrid:', error);
        return res.status(500).json({ 
            mensagem: 'Falha no envio do e-mail no servidor.', 
            detalhes: error.message 
        });
    }
});