import React, { useRef } from 'react'
import SoftwareIcon from './ui/SoftwareIcon';
import { useUserContext } from '../contexts/user-context';
import { firestoreSetUserNotification } from '../services/api/FirebaseSetFunctions';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
// // Apenas a data:
// <p>{evento.dataHora.toLocaleDateString()}</p> // Resultado (no Brasil): "10/11/2025"

// // Apenas o horário:
// <p>{evento.dataHora.toLocaleTimeString()}</p> // Resultado (no Brasil): "16:30:00"

// // Data e horário completos (o mais recomendado se você precisa de ambos):
// <p>{evento.dataHora.toLocaleString()}</p> // Resultado: "10/11/2025 16:30:00"
const PdfViewer = ({setShowModal, selectedEvent, sent_to_user=true}) => {
    const {userState, userDispatch} = useUserContext();

    // ⭐️ A. Crie a referência para o conteúdo do relatório
    const reportRef = useRef(null);

    let previewEvent;

    if (selectedEvent.software_from == "f/center") {
        // Se for uma notificação do usuário, ele vai pegar o report, que contem as informações do monitor_event
        previewEvent = selectedEvent.report;
    } else {
        previewEvent = selectedEvent;
    }

    // ⭐️ B. Lógica de Download do PDF
    const downloadPdf = async () => {
        const input = reportRef.current;
        const parentContainer = input.parentElement; // O elemento pai que limita a altura e tem 'h-165'

        if (!input) return;

        // --- ⭐️ Passo 1: Preparar para Captura ⭐️ ---
        // 1. Guardar e forçar estilos para remover rolagem/limite
        const originalStyle = {
            maxHeight: parentContainer.style.maxHeight,
            overflow: input.style.overflow,
            height: input.style.height
        };

        // Remove o limite de altura e rolagem do elemento principal do relatório
        input.style.overflow = 'visible';
        // Opcional: Remova o limite de altura do container pai (se houver)
        if (parentContainer) {
            parentContainer.style.height = 'auto';
            parentContainer.style.maxHeight = 'none';
        }

        // O elemento que estamos convertendo precisa ter seu estilo de rolagem removido, 
        // e o pai precisa permitir que ele se expanda.
        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            // Ignora a rolagem da janela principal, focando no elemento
            scrollX: 0, 
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        });

        // --- ⭐️ Passo 2: Restaurar o DOM ⭐️ ---
        // 1. Restaurar os estilos originais do elemento e do container pai
        input.style.overflow = originalStyle.overflow;
        if (parentContainer) {
            parentContainer.style.height = originalStyle.height || '100%'; // Revertendo o que foi alterado
            parentContainer.style.maxHeight = originalStyle.maxHeight || '100%';
        }

        // --- ⭐️ Passo 3: Criar o PDF de Múltiplas Páginas ⭐️ ---
        
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 297 mm
        
        // 1. Calcula a Altura Proporcional da imagem se ela ocupasse toda a largura do PDF
        const originalImgHeight = (imgProps.height * pdfWidth) / imgProps.width; 

        let finalPdfHeight = originalImgHeight;
        let finalPdfWidth = pdfWidth;

        // 2. Verifica se a altura da imagem é maior que a altura da página A4
        if (originalImgHeight > pageHeight) {
            // Se for maior, calcula a escala necessária para que a altura caiba exatamente na página (297mm)
            const scaleFactor = pageHeight / originalImgHeight;
            
            // Aplica o fator de escala à altura e largura para comprimir proporcionalmente
            finalPdfHeight = pageHeight;
            finalPdfWidth = pdfWidth * scaleFactor;
            
            // Opcional: Centralizar a imagem na largura se ela foi reduzida
            // let xOffset = (pdfWidth - finalPdfWidth) / 2;
            // pdf.addImage(imgData, 'JPEG', xOffset, 0, finalPdfWidth, finalPdfHeight);
            
        }
        
        // 3. Adiciona a imagem ao PDF
        // Se a imagem couber normalmente, ela usará a altura proporcional (originalImgHeight)
        // Se a imagem for muito alta, ela usará a altura comprimida (finalPdfHeight)
        pdf.addImage(imgData, 'JPEG', 0, 0, finalPdfWidth, finalPdfHeight);


        // 4. Salva o PDF
        const pdfName = `Relatorio_Seguranca_${previewEvent.id}.pdf`;
        pdf.save(pdfName);

        setShowModal(false);
    };

    const sendUserNotification = async() => {
        await firestoreSetUserNotification(selectedEvent.uid, "report", selectedEvent, selectedEvent.id);
        window.alert("Relatório enviado para usuário...");
    }

    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition";
    const hoverStyle2 = "bg-primary hover:bg-gray-800 transition";

    // ⭐️ NOVA LÓGICA DE TRATAMENTO DE DATA (Para ser usada no retorno)
    let startDate = previewEvent.date;
    if (startDate && typeof startDate === 'object' && startDate.seconds) {
        startDate = startDate.seconds * 1000;
    }
    const eventStartDate = new Date(startDate); // eventDate é agora um objeto Date
    // ⭐️ STRING DE DATA FORMATADA + HORA (Dia, Mês, Ano) (Hora e Minuto)
    const formattedStartDate = eventStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedStartTime = eventStartDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let endDate = previewEvent.finished;
    if (endDate && typeof endDate === 'object' && endDate.seconds) {
        endDate = endDate.seconds * 1000;
    }
    const eventEndDate = new Date(endDate); // eventDate é agora um objeto Date

    const formattedEndDate = eventEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedEndTime = eventEndDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const totalDuration = new Date(endDate - startDate);

    const formattedDuration = totalDuration.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const ClassTranslated = {
        "emergency": "emergência",
        "system": "sistema",
        "motion": "movimentação",
        "access": "Acesso"
    }

    return (
        <div className='fixed z-20 flex justify-center items-center top-0 bg-black/50 min-h-screen w-screen h-screen'>
            <div className='grid content-between w-200 h-165 p-5 bg-white rounded-2xl font-regular'>
                <span ref={reportRef} className='overflow-auto scroll-smooth'>
                    <div className="space-y-6 p-6 bg-white text-black rounded-lg border-2 border-gray-200">
                        {/* Report Header */}
                            <div className="text-center border-b border-gray-300 pb-4">
                                <h1 className="text-2xl font-bold text-gray-900">RELATÓRIO DE SEGURANÇA FULLCENTER</h1>
                                <p className="text-sm text-gray-600 mt-2">Documentação & Análise do Incidente</p>
                                <p className="text-xs text-gray-500 mt-1">Relatório Gerado: {new Date().toLocaleString()}</p>
                            </div>

                        {/* Event Overview */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Detalhes do Evento</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">ID do Evento:</span>
                                        <span className="text-gray-900">#{previewEvent.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Tipo de Evento:</span>
                                        <span className="text-gray-900 capitalize">{previewEvent.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Titulo do Evento:</span>
                                        <span className="text-gray-900">{previewEvent.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Gravidade do Alerta:</span>
                                        <span className={`capitalize font-medium ${
                                            previewEvent.severity === 'critical' ? 'text-red-600' :
                                            previewEvent.severity === 'high' ? 'text-orange-600' :
                                            previewEvent.severity === 'medium' ? 'text-yellow-600' :
                                            'text-green-600'
                                        }`}>
                                        {previewEvent.severity}
                                    </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Timestamp & Duração</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Data & Horário de Início:</span>
                                        <span className="text-gray-900">{formattedStartDate}</span>
                                        <span className="text-gray-900">{formattedStartTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Data & Horário de Término:</span>
                                        <span className="text-gray-900">{formattedEndDate}</span>
                                        <span className="text-gray-900">{formattedEndTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Duração Total:</span>
                                        <span className="text-gray-900">{formattedDuration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Fuso Horário:</span>
                                        <span className="text-gray-900">BR (GMT-3)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location & Camera Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Equipamento e Localização</h3>
                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Software Origem:</span>
                                        <span className='w-7 h-7'>
                                           <SoftwareIcon title={previewEvent.software_from}/>
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Localização: </span>
                                        <span className="text-gray-900 ml-1">{previewEvent.location}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Gravação Disponível:</span>
                                        <span className="text-gray-900">{previewEvent.videos_recorded.length >= 1 ? 'Sim' : 'Não'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Dispositivo Origem:</span>
                                        <span className="text-gray-900">{previewEvent.device}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* URL video */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">URL do Vídeo</h3>
                            <p className="text-xs text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                {previewEvent.videos_recorded}
                            </p>
                        </div>
                        {/* Event Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Descrição do Incidente</h3>
                            <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                {previewEvent.description}
                            </p>
                        </div>

                        {/* Informations from the User Forms */}
                        {previewEvent.software_from == "f/safe" && previewEvent.user_forms != null && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Relato do Usuário</h3>
                                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                    Causa do Incidente: {previewEvent.user_forms.incident_cause}
                                </p>
                                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                    Duração estimada do Incidente: {previewEvent.user_forms.estimated_time}
                                </p>
                                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                    Fatalidades: {previewEvent.user_forms.incident_injures}
                                </p>
                                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                    Possível evidência(s):  {previewEvent.user_forms.evidences}
                                </p>
                                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                    Monitor respondeu como esperado? {previewEvent.user_forms.monitor_answer}
                                </p>
                            </div>                            
                        )}

                        {/* Technical Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Detalhes Técnicos</h3>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium text-gray-700 block">Classificação do Evento</span>
                                    <span className="text-gray-900 capitalize">{ClassTranslated[previewEvent.style]}</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium text-gray-700 block">Método de Detecção</span>
                                    <span className="text-gray-900">Sistema Automatizado</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="font-medium text-gray-700 block">Monitor Responsável</span>
                                    <span className="text-gray-900">{userState.first + " " + userState.last}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Ações Recomendadas Pós-Incidente</h3>
                            <div className="text-sm space-y-2">
                            {previewEvent.severity === 'critical' && (
                                <div className="bg-red-50 border border-red-200 p-3 rounded">
                                    <span className="text-red-800 font-medium">• Investigação imediata necessária</span><br />
                                    <span className="text-red-700">• Revise os protocolos de segurança</span><br />
                                    <span className="text-red-700">• Considerar medidas de segurança adicionais</span>
                                </div>
                            )}
                            {previewEvent.severity === 'high' && (
                                <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                                    <span className="text-orange-800 font-medium">• Revise dentro de 24 hrs</span><br />
                                    <span className="text-orange-700">• Documento no log de segurança</span><br />
                                    <span className="text-orange-700">• Monitoramento para eventos semelhantes</span>
                                </div>
                            )}
                            {(previewEvent.severity === 'medium' || previewEvent.severity === 'low') && (
                                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                                    <span className="text-blue-800 font-medium">• Documentação padrão necessária</span><br />
                                    <span className="text-blue-700">• Arquivo para revisão de rotina</span><br />
                                    <span className="text-blue-700">• Atualizar medidas de segurança</span>
                                </div>
                            )}
                            </div>
                        </div>

                        {/* Report Footer */}
                        <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
                            <p>Esse relatório foi automaticamente gerado pelo Sistema FullTime</p>
                            <p>Qualquer questão relacionada ao relatório, contate o Departamento da Administração de Segurança</p>
                            <p className="mt-2 font-medium">ID: RPT-{previewEvent.id}-{Date.now()}</p>
                        </div>
                    </div>                    
                </span>

                <div className='flex px-10 w-full h-10 mt-5 justify-center'>
                    <button onClick={downloadPdf} className={`w-40 h-full rounded-lg text-white px-10 ml-auto mr-auto ${hoverStyle1}`}>
                        Baixar
                    </button>
                    {selectedEvent.software_from == "f/safe" &&  sent_to_user && (
                        <button onClick={sendUserNotification} className={`w-fit h-full rounded-lg text-white px-10 ml-auto mr-auto ${hoverStyle2}`}>
                            Enviar para usuário
                        </button>                        
                    )}
                    <button onClick={() => setShowModal(false)} className='w-40 h-full bg-gray-200 rounded-lg ml-auto mr-auto hover:bg-gray-300 transition'>
                        Cancelar
                    </button>                        
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
