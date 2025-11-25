import React, { useState } from 'react'
import { firestoreUpdateMonitorEventById, firestoreUpdateUserNotificationShowButtonFalse } from '../services/api/FirebaseUpdateFunctions';
import { firestoreGetAllMonitorEvents } from '../services/api/FirebaseGetFunctions';
import { useUserContext } from '../contexts/user-context';

const UserReport = ({currentNotification, setNotificationButtonModal}) => {

    const {userState, userDispatch} = useUserContext();

    const [text1, setText1] = useState('');
    const [isText1Focused, setIsText1Focused] = useState(false);

    const [text2, setText2] = useState('');
    const [isText2Focused, setIsText2Focused] = useState(false);

    const [text3, setText3] = useState('');
    const [isText3Focused, setIsText3Focused] = useState(false);

    const [text4, setText4] = useState('');
    const [isText4Focused, setIsText4Focused] = useState(false);

    const [text5, setText5] = useState('');
    const [isText5Focused, setIsText5Focused] = useState(false);

  const storeForms = async() => {
    if (text1 == '' || text2 == '' || text3 == '' || text4 == '' || text5 == '') {
        window.alert("Falta preencher!");
        return;
    }

    // currentNotification = user notification;
    // monitor_events = monitor events;

    // Pegando o documento do monitor_events que seja da mesma notificação
    const monitor_events = await firestoreGetAllMonitorEvents();

    let monitorEventId

    for (let i = 0; i < monitor_events.length; i++) {
        // Pegando o id do evento do monitor
        if (monitor_events[i].id == currentNotification.monitor_id) {
            monitorEventId = monitor_events[i].id;
        }
    }

    const formsTemplate = {
      incident_cause: text1,
      estimated_time: text2,
      incident_injures: text3,
      evidences: text4,
      monitor_answer: text5
    }
    await firestoreUpdateMonitorEventById(monitorEventId, formsTemplate);

    await firestoreUpdateUserNotificationShowButtonFalse(userState.uid, currentNotification.id);

    setNotificationButtonModal(false);
    window.alert("Obrigado pela sua colaboração! Formulário enviado.");
  }

  const hoverStyle1 = "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:cursor-pointer transition duration-200";
  const hoverStyle2 = "bg-linear-to-t from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 hover:cursor-pointer transition duration-200";

    // objeto de entrada do 'report'
    // {
    //   incident_cause: null,
    //   estimated_time: null,
    //   incident_injures: null,
    //   evidences: null,
    //   monitor_answer: null,
    // }

  return (
    <div className='grid content-between w-fit h-fit p-5 bg-white rounded-2xl font-regular'>
        <div className='flex flex-col mb-5 w-fit h-fit justify-center'>
            <span className='flex flex-col w-full'>
                <h2 className='text-center font-bold'>
                    {currentNotification?.title}
                </h2>
                <span className='text-center text-sm text-gray-700'>
                    <p>
                        Preencha o formulário com a sua perspectiva do Incidente de {currentNotification?.location}
                    </p>
                </span>                         
            </span>
            <hr className='mt-2 pb-5'/>
            <span className='grid grid-cols-2 w-fit space-y-5 space-x-5'>
                <span className='flex flex-col w-fit space-y-2'>
                    <h3 className='text-gray-700 text-sm'>Qual foi a principal causa do incidente?</h3>
                    <span className={`flex items-center w-fit h-fit outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                            ${isText1Focused === true ? ("outline-2 outline-gray-600") : ("")}`
                        }>
                        <textarea name="message" rows="5" cols="40" 
                        className={`w-90 h-20 pl-2 focus:outline-none resize-none`} 
                        onFocus={() => setIsText1Focused(true)} 
                        onBlur={() => setIsText1Focused(false)} 
                        type="text" 
                        value={text1} 
                        onChange={(e) => setText1(e.target.value)} 
                        placeholder='e.g.Falta de energia no local com vários avisos de antecedência...' 
                        />                            
                    </span>
                </span> 
                <span className='flex flex-col w-fit space-y-2'>
                    <h3 className='text-gray-700 text-sm'>Quando começou, e quando terminou (teve um alívio)? </h3>
                    <span className={`flex items-center w-fit h-fit outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                            ${isText2Focused === true ? ("outline-2 outline-gray-600") : ("")}`
                        }>
                        <textarea name="message" rows="5" cols="40" 
                        className={`w-90 h-20 pl-2 focus:outline-none resize-none`} 
                        onFocus={() => setIsText2Focused(true)} 
                        onBlur={() => setIsText2Focused(false)} 
                        type="text" 
                        value={text2} 
                        onChange={(e) => setText2(e.target.value)} 
                        placeholder='e.g.Começou e terminou no dia 24/11 das 6hrs da manhâ até 23:30 da noite' 
                        />                            
                    </span>
                </span> 
                <span className='flex flex-col w-fit space-y-2'>
                    <h3 className='text-gray-700 text-sm'>Houve feridos? Se sim quantos e qual a severidade? </h3>
                    <span className={`flex items-center w-fit h-fit outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                            ${isText3Focused === true ? ("outline-2 outline-gray-600") : ("")}`
                        }>
                        <textarea name="message" rows="5" cols="40" 
                        className={`w-90 h-20 pl-2 focus:outline-none resize-none`} 
                        onFocus={() => setIsText3Focused(true)} 
                        onBlur={() => setIsText3Focused(false)} 
                        type="text" 
                        value={text3} 
                        onChange={(e) => setText3(e.target.value)} 
                        placeholder='e.g.Nenhum...' 
                        />                            
                    </span>
                </span> 

                <span className='flex flex-col w-fit space-y-2'>
                    <h3 className='text-gray-700 text-sm'>Tem alguma evidência importante?</h3>
                    <span className={`flex items-center w-fit h-fit outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                            ${isText4Focused === true ? ("outline-2 outline-gray-600") : ("")}`
                        }>
                        <textarea name="message" rows="5" cols="40" 
                        className={`w-90 h-20 pl-2 focus:outline-none resize-none`} 
                        onFocus={() => setIsText4Focused(true)} 
                        onBlur={() => setIsText4Focused(false)} 
                        type="text" 
                        value={text4} 
                        onChange={(e) => setText4(e.target.value)} 
                        placeholder='e.g.Não...' 
                        />                            
                    </span>
                </span> 
                <span className='space-y-2'>
                    <h3 className='text-gray-700 text-sm'>O monitor respondeu a tempo? Se não, quanto?</h3>
                    <span className={`flex items-center w-fit h-fit outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                            ${isText5Focused === true ? ("outline-2 outline-gray-600") : ("")}`
                        }>
                        <textarea name="message" rows="5" cols="40" 
                        className={`w-90 h-20 pl-2 focus:outline-none resize-none`} 
                        onFocus={() => setIsText5Focused(true)} 
                        onBlur={() => setIsText5Focused(false)} 
                        type="text" 
                        value={text5} 
                        onChange={(e) => setText5(e.target.value)} 
                        placeholder='e.g.Sim...' 
                        />                            
                    </span>
                </span> 

            </span>
        </div>

        <div className='flex justify-center w-full h-10 space-x-45'>
        <button onClick={storeForms} className={`w-40 h-full bg-gradient-to-r bg-red-500 to-90% rounded-lg text-white ${hoverStyle2}`}>
            Enviar
        </button>
        <button onClick={() => setNotificationButtonModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
            Cancelar
        </button>
        </div>              
    </div>
  )
}

export default UserReport
