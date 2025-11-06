import React from 'react'

const PdfViewer = ({setShowModal}) => {
    const downloadPdf = () => {
        window.alert("Downloading");
        setShowModal(false);
    }

    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

    const iframeStyle = {
        width: '100%',
        height: '100%',
        border: 'none' // Remove a borda padrão do iframe
    };

    return (
        <div className='fixed z-0 flex justify-center items-center top-0 bg-black/50 min-h-screen w-screen h-screen'>
            <div className='grid content-between w-full h-full p-5 bg-white rounded-2xl font-regular'>
                <p className='text-center text-sm text-gray-600'>Arquivo pdf Aqui</p>
                <div className='w-full h-full'>
                    <iframe src="/Projeto FullCenter _ F.pdf" className='w-full h-full' frameborder="0"/>
                </div>
                
                <div className='flex justify-between px-10 w-full h-10'>
                    <button onClick={downloadPdf} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
                        Baixar
                    </button>
                    <button onClick={() => setShowModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
