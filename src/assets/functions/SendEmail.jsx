// SendEmail.jsx (Este código roda no navegador, dentro do seu projeto React/Vite)

/**
 * Envia uma requisição HTTP POST para o endpoint do backend (/api/send-email)
 * para solicitar o envio de um e-mail através do SendGrid.
 * * @param {object} emailData - Objeto contendo {toEmail, subject, text, html}
 * @returns {Promise<object>} O resultado do envio (sucesso ou falha)
 */
export const sendAlertEmail = async (emailData) => {
    
    // ATENÇÃO: Se você estiver usando um servidor de desenvolvimento local
    // que não reconhece /api/send-email (como o servidor padrão do Vite),
    // você precisará ajustar o proxy no vite.config.js para redirecionar 
    // essa chamada para sua função serverless.
    const apiUrl = '/api/send-email'; 

    try {
        console.log("Iniciando requisição fetch para o backend:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Envia o objeto de dados do e-mail serializado como JSON
            body: JSON.stringify({
                toEmail: emailData.toEmail,
                subject: emailData.subject,
                text: emailData.text,
                html: emailData.html
            }),
        });
        
        // Tentativa de ler o corpo da resposta (mesmo em caso de erro)
        const result = await response.json();

        if (!response.ok) {
            // Se o status HTTP não for 2xx (ex: 400, 500), lança um erro
            console.error("Resposta do servidor com erro:", result);
            throw new Error(result.mensagem || `Erro no servidor: ${response.status}`);
        }

        console.log("E-mail solicitado com sucesso:", result.mensagem);
        return result;

    } catch (error) {
        console.error("Falha na comunicação com o backend de e-mail:", error);
        // Re-lança o erro para ser capturado no seu componente NotificationResponse.jsx
        throw error;
    }
};