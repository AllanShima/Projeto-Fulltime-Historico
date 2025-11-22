import React from 'react'
import SoftwareIcon from './ui/SoftwareIcon';
import { useUserContext } from '../contexts/user-context';
// // Apenas a data:
// <p>{evento.dataHora.toLocaleDateString()}</p> // Resultado (no Brasil): "10/11/2025"

// // Apenas o horário:
// <p>{evento.dataHora.toLocaleTimeString()}</p> // Resultado (no Brasil): "16:30:00"

// // Data e horário completos (o mais recomendado se você precisa de ambos):
// <p>{evento.dataHora.toLocaleString()}</p> // Resultado: "10/11/2025 16:30:00"
const PdfViewer = ({setShowModal, selectedEvent}) => {
    const {userState, userDispatch} = useUserContext();

    const downloadPdf = () => {
        window.alert("Downloading");
        setShowModal(false);
    }

    const previewEvent = selectedEvent;

    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

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
            <div className='grid content-between w-200 h-150 p-5 bg-white rounded-2xl font-regular'>
                <span className='overflow-auto scroll-smooth'>
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
                                        <span className="text-gray-900">{previewEvent.video_available ? 'Sim' : 'Não'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">URL do vídeo (Vimeo):</span>
                                        <span className="text-gray-900">{previewEvent.video_recorded}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Dispositivo Origem:</span>
                                        <span className="text-gray-900">{previewEvent.device}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Descrição do Incidente</h3>
                            <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-3 rounded">
                                {previewEvent.description}
                            </p>
                        </div>

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
                    <button onClick={downloadPdf} className={`w-40 h-full rounded-lg text-white px-10 bg-amber-800 ml-auto mr-auto ${hoverStyle1}`}>
                        Baixar
                    </button>
                    <button onClick={() => setShowModal(false)} className='w-40 h-full bg-gray-200 rounded-lg ml-auto mr-auto hover:bg-gray-300 transition'>
                        Cancelar
                    </button>                        
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
