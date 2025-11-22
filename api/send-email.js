// api/send-email.js (Função Serverless)
const sgMail = require('@sendgrid/mail');
// ⚠️ Certifique-se de que a variável de ambiente está carregada
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define o e-mail que o SendGrid usará como remetente
const SENDER_EMAIL = 'seu-email-verificado-no-sendgrid@exemplo.com';

export default async (req, res) => {
    // A função só aceita requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ mensagem: 'Método não permitido.' });
    }

    try {
        // Pega os dados do e-mail do corpo da requisição
        const { toEmail, subject, text, html } = req.body;

        if (!toEmail || !subject || (!text && !html)) {
            return res.status(400).json({ mensagem: 'Dados de e-mail incompletos.' });
        }

        const msg = {
            to: toEmail,
            from: SENDER_EMAIL, // Seu e-mail verificado no SendGrid
            subject: subject,
            text: text,
            html: html,
        };

        // Envia o e-mail via SendGrid
        await sgMail.send(msg);

        // Resposta de sucesso para o front-end
        return res.status(200).json({ mensagem: 'E-mail enviado com sucesso.' });

    } catch (error) {
        console.error('Erro ao enviar e-mail via SendGrid:', error);
        
        // Retorna um erro 500 para o front-end
        return res.status(500).json({ 
            mensagem: 'Falha no envio do e-mail no servidor.', 
            // 🚨 Em produção, evite mostrar detalhes internos do erro
            detalhes: error.message 
        });
    }
};