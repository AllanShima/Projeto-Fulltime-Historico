export const sendAlertEmail = async (emailData) => {
    try {
        const response = await fetch('/api/send-email', { // Use o seu endpoint real aqui
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Você deve incluir todos os dados necessários aqui para que o backend envie o email.
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            // Se o servidor retornar um erro (4xx, 5xx), lance-o.
            const errorData = await response.json();
            throw new Error(errorData.mensagem || `Erro no servidor: ${response.status}`);
        }

        const result = await response.json();
        console.log("E-mail de alerta enviado com sucesso:", result);
        return result;

    } catch (error) {
        console.error("Falha ao enviar e-mail de alerta:", error);
        // Você pode re-lançar ou retornar o erro para que a função 'endAlert' lide com ele.
        throw error;
    }
};