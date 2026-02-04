import React, { useState } from 'react'
import { BiBell, BiCamera, BiDownload, BiHistory, BiShield, BiVideo } from 'react-icons/bi';
import { BsActivity, BsArrowRight } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoBarChart } from 'react-icons/io5';
import SoftwareIcon from './ui/SoftwareIcon';
import { FaScrewdriverWrench } from "react-icons/fa6";
import { RiUserFill } from "react-icons/ri";
import { MdGpsFixed } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";

const LandingPage = () => {
  const [chosenLang, setChosenLang] = useState("pt");
  const selectedStyle = "font-bold";
  return (
    // O header, body e Footer são componentes únicos da Landingpage
    <div className='flex flex-col min-h-screen justify-start mx-auto'>
      <div className='flex z-30 w-full justify-center py-4 shadow-md box-border'>
        <div className='w-5/6 h-full '> 
          <nav className='w-full h-full'>
            <ul className='flex w-full h-full items-center justify-between'>
              <a href="https://fulltime.com.br/">
                <img className='w-30 h-fit' src="https://fulltime.com.br/wp-content/themes/fulltime-brasil-1/images/logo.png" alt="Fulltime-logo" />
              </a>
              <li>
                <h3>Sobre Nós</h3>
              </li>
              <li>
                <h3>Blog</h3>
              </li>
              <li>
                <h3>Soluções</h3>
              </li>
              <li>
                <h3>Fale Conosco</h3>
              </li>
              <li>
                <h3>Agenda</h3>
              </li>
              <li>
                <h3>FAQ</h3>
              </li>
              {/* Botão de logar na plataforma */}
              <li>
                <a href="/login">
                  <div className='w-fit h-fit px-6 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition'>
                      <h3 className='font-regular'>
                        Login na Plataforma
                      </h3>
                  </div>                  
                </a>
              </li>
              <li>
                <span className='flex w-fit h-fit'>
                  <div style={{
                    backgroundImage: `url(${chosenLang === "pt" ? "https://static.todamateria.com.br/upload/ba/nd/bandeiradobrasil-2-cke.jpg" : "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/330px-Flag_of_the_United_Kingdom.svg.png"})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }} className={`grid content-center justify-center w-8 h-8 rounded-full bg-gray-200`}/>
                  <span className='flex ml-2 space-x-1 font-light text-sm'>
                    <button onClick={() => setChosenLang("en")} className={`cursor-pointer ${chosenLang==="en"}`}>EN</button>
                    <button onClick={() => setChosenLang("pt")} className='cursor-pointer'>PT</button>                    
                  </span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-gradient-to-br max-h-screen from-white via-slate-100 to-red-200 z-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
          <div className="container mx-auto px-6 py-20 relative">
            <div className="text-center max-w-4xl mx-auto">
              <span className="flex mb-4">
                <span className='flex mx-auto space-x-4'>
                  <SoftwareIcon title={"FullCenter"} showTitle={true}/>
                  <span className='text-2xl font-semibold text-red-600'>
                    +
                  </span>
                  <SoftwareIcon title={"f/safe"} showTitle={true}/>
                </span>

              </span>
              <h1 className="mb-6 text-slate-900">
                Melhoria da Experiência do Usuário e Implementação de Novos Recursos para Comunicação dos Softwares FullCenter (Central de Monitoramento) e F/Safe
              </h1>
              <p className="mb-8 text-slate-600 max-w-2xl mx-auto">
                Plataforma completa de vigilância com visualização em tempo real, histórico detalhado de eventos, alertas inteligentes e diagnósticos.
              </p>
              <div className="flex gap-4 justify-center">
                <a href='/login' className="flex bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold text-xs">
                  Acessar Plataforma
                  <BsArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="container mx-auto px-40 py-12 bg-gray-100 z-30">
          <div className="grid grid-cols-4 gap-6">
            <div className="p-6 text-center border-2 rounded-2xl text-gray-200 hover:border-blue-600 transition-colors">
              <BiCamera className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="text-slate-900 mb-1">Gravação das Câmeras</div>
              <p className="text-sm text-slate-600">Registro dos vídeos no relatório</p>
            </div>
            <div className="p-6 text-center border-2 rounded-2xl text-gray-200 hover:border-green-600 transition-colors">
              <IoMdChatbubbles className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <div className="text-slate-900 mb-1">LiveChat entre usuários</div>
              <p className="text-sm text-slate-600">Conversa entre os dois softwares em tempo real</p>
            </div>
            <div className="p-6 text-center border-2 rounded-2xl text-gray-200 hover:border-orange-600 transition-colors">
              <MdGpsFixed className="w-8 h-8 mx-auto mb-3 text-orange-600" />
              <div className="text-slate-900 mb-1">Geolocalização dos eventos e usuários</div>
              <p className="text-sm text-slate-600">Visualização da localização no Maps</p>
            </div>
            <div className="p-6 text-center border-2 rounded-2xl text-gray-200 hover:border-purple-600 transition-colors">
              <SiGoogleforms className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-slate-900 mb-1">Formulário de Complemento</div>
              <p className="text-sm text-slate-600">Perguntas sobre o incidente à vítima que complementam no relatório</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-16 bg-gray-100">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-slate-900">Principal Problema</h2>
            <div className="w-250 text-slate-600 max-w-2xl mx-auto">
              <p className=''>
                Com base na empresa proposta (FullTime), foi analisado e concluído que um dos problemas foi a falta de funções e conforto do usuário ao utilizar o software, em específico, o software recém lançado 'F/Safe'.     
                No entanto, o software só pode funcionar com a ajuda de outro software central que recebe esses avisos, e foi visto uma                       
              </p>
    
              <p className='text-red-600'>falta de recursos e funcionalidades na comunicação entre os dois.</p>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-slate-900">Projeto Solução</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A solução foi desenvolver novas funções que podem auxiliar na comunicação entre o monitor usuário FullCenter e principalmente para o usuário F/Safe.
            </p>
          </div>
          <div className="text-center mb-12">
            <h2 className="mb-4 text-slate-900">Recursos Principais</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Todos os recursos adicionados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8 px-25">
            {/* Feature 1 */}
            <div className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <RiUserFill className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-slate-900">Experiência do Usuário</h3>
                  <p className="text-slate-600 mb-4">
                    Melhoria no controle e manuseio da plataforma para garantir praticidade e produtividade.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Protocolos de Segurança F/Safe
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      + Controle de novos Alertas Iminentes
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      + Detalhamento dos Eventos
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Acesso à câmera durante Incidente ao usuário F/Safe
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Compartilhamento fácil do Relatório ao usuário
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      Fácil exportação do relatório em PDF
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FaScrewdriverWrench className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-slate-900">Recursos e Funcionalidades</h3>
                  <p className="text-slate-600 mb-4">
                    Funções que ajudam diretamente na comunicação entre os dois softwares
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      Registro e gravação de Vídeos durante o Alerta
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      Armazenamento e visualização de relatórios automatizados
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      LiveChat entre os usuários
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      Geolocalização dos usuários e Alertas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      Formulário de complemento pós incidente da vítima
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="bg-slate-900 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-white">Tecnologias Utilizadas</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Principais ferramentas para o desenvolvimento do Protótipo
              </p>
            </div>

            <div className="flex h-20 justify-center gap-12 mx-auto px-30 mb-12">
              <div className="h-full p-6 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://vite.org/logo-large.png" 
                alt="vite logo" 
                className='h-full'
                />
              </div>
              <div className="h-full p-2 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://1000logos.net/wp-content/uploads/2024/09/Figma-Logo.png" 
                alt="figma logo" 
                className='h-full'
                />
              </div>
              <div className="h-full p-6 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Tailwind_CSS_logo_with_dark_text.svg/2560px-Tailwind_CSS_logo_with_dark_text.svg.png" 
                alt="tailwind logo" 
                className='h-full'
                />
              </div>
              <div className="w-fit h-full p-6 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/New_Firebase_logo.svg/2560px-New_Firebase_logo.svg.png" 
                alt="firebase logo" 
                className='h-full'
                />
              </div>
              <div className="w-fit h-full p-4 rounded-xl bg-slate-800 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://b73-1056645.smushcdn.com/1056645/wp-content/uploads/2024/01/React-Js-logo.png?lossy=2&strip=1&webp=1" 
                alt="react logo" 
                className='h-full'
                />
              </div>
            </div>
            <div className="flex h-20 justify-center gap-12 mx-auto px-30">
              <div className="w-fit h-full p-2 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://pyjun01.github.io/react-google-map-wrapper/_astro/logo.l2bwXLJ9.svg" 
                alt="react google maps logo" 
                className='h-full'
                />
              </div>
              <div className="w-fit h-full p-6 rounded-xl bg-slate-200 border-slate-700 hover:shadow-xl hover:scale-105 transition duration-200">
                <img 
                src="https://miro.medium.com/v2/resize:fit:610/1*AK-jZW4skGC5BzP9Rj0Hfw.png" 
                alt="jsPdf logo" 
                className='h-full'
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-30 py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-slate-900">Funcionamento FullCenter</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Etapas para navegação simples e intuitiva para o monitoramento eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Visualização de Câmeras</h3>
                    <p className="text-slate-600">
                      Acesse a aba "Câmeras" para ver todas as suas câmeras em tempo real + Eventos recentes. Clique em qualquer câmera secundária para torná-la a principal.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Histórico de Eventos</h3>
                    <p className="text-slate-600">
                      Navegue para "Histórico de Eventos" para ver um log completo de todos os eventos de segurança com detalhes sobre tipo, tempo, e severidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Chat de Conversas e GPS</h3>
                    <p className="text-slate-600">
                      Navegue para "Live Chat + GPS" para conversas com os usuários. Pra mostrar a sua localização basta clicar na conversa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Dropdown de Notificações</h3>
                    <p className="text-slate-600">
                      Ao pressionar o sino localizado acima no canto direito, mostrará os alertas ativados atualmente
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="mb-4 text-slate-900">Interface Unificada</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiCamera className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">Câmeras e Eventos</span>
                    <span className="ml-auto bg-green-100 text-green-700 text-xs rounded-2xl p-2">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiHistory className="w-5 h-5 text-purple-600" />
                    <span className="text-slate-700">Histórico de Eventos</span>
                    <span className="ml-auto bg-blue-100 text-blue-700 text-xs rounded-2xl p-2">Armazenado</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiBell className="w-5 h-5 text-orange-600" />
                    <span className="text-slate-700">LiveChat + Geolocalização</span>
                    <span className="ml-auto bg-orange-100 text-orange-700 text-xs rounded-2xl p-2">Tempo Real</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiShield className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">Notificações de Alertas</span>
                    <span className="ml-auto bg-purple-100 text-purple-700 text-xs rounded-2xl p-2">Automático</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section 2 */}
        <section className="container mx-auto px-30 py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-slate-900">Funcionamento F/Safe</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Etapas para uma comunicação direta com o monitor e envio dos alertas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Lista de Notificações</h3>
                    <p className="text-slate-600">
                      Acesse a aba "Notificações" para ver todas as recentes notificações enviadas do software FullCenter
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Opções de Alertas</h3>
                    <p className="text-slate-600">
                      Escolha e pressione o tipo de alerta em necessidade para enviar um sinal ao monitor
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 text-slate-900">Live Chat</h3>
                    <p className="text-slate-600">
                      Acesse a aba de 'Live Chat' para conversar com o monitor
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <h3 className="mb-4 text-slate-900">Interface Unificada</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiCamera className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">Painel de Alertas</span>
                    <span className="ml-auto bg-green-100 text-green-700 text-xs rounded-2xl p-2">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiHistory className="w-5 h-5 text-purple-600" />
                    <span className="text-slate-700">Live Chat com Monitor</span>
                    <span className="ml-auto bg-blue-100 text-blue-700 text-xs rounded-2xl p-2">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiBell className="w-5 h-5 text-orange-600" />
                    <span className="text-slate-700">Lista de Notificações</span>
                    <span className="ml-auto bg-orange-100 text-orange-700 text-xs rounded-2xl p-2">Tempo Real</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <BiShield className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">Protocolos de Segurança</span>
                    <span className="ml-auto bg-purple-100 text-purple-700 text-xs rounded-2xl p-2">Automático</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-slate-900 to-red-600 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-4 text-white">Quer saber mais?</h2>
            <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
              Acesse o protótipo completo com as novas funcionalidades
            </p>
            {/* Botão p entrar na plataforma */}
            <a href="/register" className='flex w-fit h-fit ml-auto mr-auto '>
              <div className='flex items-center w-full h-fit justify-center p-5 rounded-2xl text-white bg-red-500 shadow-lg hover:bg-red-400 transition'>
                <h1 className='flex font-bold'>
                  Cadastrar um Novo Usuário
                </h1>
                <span>
                  <BsArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>          
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8">
          <div className="container mx-auto px-6 text-center text-slate-400">
            <p>© 2025 - Por Allan Shinhama, Enzo Brumatee, Maria Eduarda, Gabriel Claus, Carlos Eduardo e Emanuelly. TM4 - A, BCC</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
