import React, { useState } from 'react'
import { BiBell, BiCamera, BiDownload, BiHistory, BiShield, BiVideo } from 'react-icons/bi';
import { BsActivity, BsArrowRight } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoBarChart } from 'react-icons/io5';

const LandingPage = () => {
  const [chosenLang, setChosenLang] = useState("pt");
  const selectedStyle = "font-bold";
  return (
    // O header, body e Footer são componentes únicos da Landingpage
    <>
      <div className='flex z-30 w-full justify-center py-4 bg-white shadow-md box-border'>
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
                  <div className='w-fit h-fit px-6 py-3 bg-gray-200 rounded-2xl'>
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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-red-200 z-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <span className="mb-4 bg-blue-600 hover:bg-blue-700">
              <BiShield className="w-3 h-3 mr-1" />
              Sistema de Segurança Profissional
            </span>
            <h1 className="mb-6 text-slate-900">
              Monitoramento de Câmeras de Segurança Inteligente
            </h1>
            <p className="mb-8 text-slate-600 max-w-2xl mx-auto">
              Plataforma completa de vigilância com visualização em tempo real, histórico detalhado de eventos, alertas inteligentes e diagnóstico avançado de câmeras.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700">
                Acessar Dashboard
                <BsArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button variant="outline">
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12 bg-gray-100 z-30">
        <div className="grid grid-cols-4 gap-6">
          <div className="p-6 text-center border-2 hover:border-blue-600 transition-colors">
            <BiCamera className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-slate-900 mb-1">Múltiplas Câmeras</div>
            <p className="text-sm text-slate-600">Gerencie todas suas câmeras</p>
          </div>
          <div className="p-6 text-center border-2 hover:border-green-600 transition-colors">
            <BsActivity className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <div className="text-slate-900 mb-1">Monitoramento 24/7</div>
            <p className="text-sm text-slate-600">Vigilância contínua em tempo real</p>
          </div>
          <div className="p-6 text-center border-2 hover:border-orange-600 transition-colors">
            <BiBell className="w-8 h-8 mx-auto mb-3 text-orange-600" />
            <div className="text-slate-900 mb-1">Alertas Inteligentes</div>
            <p className="text-sm text-slate-600">Notificações instantâneas</p>
          </div>
          <div className="p-6 text-center border-2 hover:border-purple-600 transition-colors">
            <BiHistory className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <div className="text-slate-900 mb-1">Histórico Completo</div>
            <p className="text-sm text-slate-600">Registro detalhado de eventos</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-slate-900">Recursos Principais</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Sistema completo de segurança com todas as ferramentas necessárias para proteger seu ambiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Feature 1 */}
          <div className="p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              {/* <div className="p-3 bg-blue-100 rounded-lg">
                <Grid3x3 className="w-6 h-6 text-blue-600" />
              </div> */}
              <div className="flex-1">
                <h3 className="mb-2 text-slate-900">Visualização em Grid Inteligente</h3>
                <p className="text-slate-600 mb-4">
                  Interface otimizada com uma câmera principal em destaque e três visualizações secundárias. Alterne entre câmeras com um clique para focar no que é mais importante.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Troca instantânea de câmera principal
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Layout responsivo e adaptável
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Status em tempo real de cada câmera
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BiBell className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-slate-900">Sistema de Alertas Avançado</h3>
                <p className="text-slate-600 mb-4">
                  Notificações inteligentes para eventos críticos como falhas de câmera, detecção de movimento e problemas de conexão. Responda rapidamente a qualquer situação.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    Notificações em tempo real
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    Acesso rápido à câmera afetada
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    Visualização de detalhes e diagnóstico
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BiHistory className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-slate-900">Histórico Completo de Eventos</h3>
                <p className="text-slate-600 mb-4">
                  Registro detalhado de todos os eventos de segurança com informações sobre tipo, localização, duração, gravidade e tamanho de gravação.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Classificação por tipo e severidade
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Timestamps precisos de cada evento
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    Rastreamento de duração e armazenamento
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BiDownload className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-slate-900">Exportação de Dados</h3>
                <p className="text-slate-600 mb-4">
                  Exporte eventos e gravações individuais com um clique. Ideal para relatórios, análise forense e compartilhamento com autoridades.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Exportação rápida de eventos individuais
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Formatos compatíveis para análise
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Inclui metadados e informações contextuais
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
            <h2 className="mb-4 text-white">Recursos Avançados</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Ferramentas profissionais para diagnóstico e análise completa do sistema
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 border-slate-700">
              <FiAlertTriangle className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="mb-2 text-white">Diagnóstico de Câmera</h3>
              <p className="text-slate-300 text-sm mb-4">
                Sistema completo de diagnóstico que identifica problemas de conexão, qualidade de imagem, e fornece recomendações detalhadas de solução.
              </p>
              <span variant="outline" className="text-yellow-500 border-yellow-500">Diagnóstico Automático</span>
            </div>

            <div className="p-6 bg-slate-800 border-slate-700">
              <IoBarChart className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="mb-2 text-white">Análise de Erros</h3>
              <p className="text-slate-300 text-sm mb-4">
                Informações técnicas detalhadas sobre cada erro, incluindo códigos, timestamps, e análise de causa raiz para resolução rápida.
              </p>
              <span variant="outline" className="text-blue-500 border-blue-500">Análise Profunda</span>
            </div>

            <div className="p-6 bg-slate-800 border-slate-700">
              <BiVideo className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="mb-2 text-white">Gerenciamento de Câmeras</h3>
              <p className="text-slate-300 text-sm mb-4">
                Sidebar intuitiva com lista completa de câmeras, status em tempo real, e lista de eventos recentes. Navegação simplificada entre câmeras.
              </p>
              <span variant="outline" className="text-green-500 border-green-500">Interface Intuitiva</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-slate-900">Como Funciona</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Navegação simples e intuitiva para monitoramento eficiente
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
                    Acesse a aba "Live Cameras" para ver todas as suas câmeras em tempo real. Clique em qualquer câmera secundária para torná-la a principal.
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
                    Navegue para "Event BiHistory" para ver um log completo de todos os eventos de segurança com detalhes sobre tipo, tempo, e severidade.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-slate-900">Alertas e Notificações</h3>
                  <p className="text-slate-600">
                    Receba alertas em tempo real no ícone de sino. Clique para ver detalhes, acessar a câmera afetada, ou abrir o diagnóstico completo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-slate-900">Exportação e Análise</h3>
                  <p className="text-slate-600">
                    Exporte eventos individuais ou acesse informações de diagnóstico detalhadas para resolução de problemas e análise profunda.
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
                  <span className="text-slate-700">Câmeras ao Vivo</span>
                  <span className="ml-auto bg-green-100 text-green-700">Online</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <BiHistory className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700">Histórico de Eventos</span>
                  <span className="ml-auto bg-blue-100 text-blue-700">24/7</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <BiBell className="w-5 h-5 text-orange-600" />
                  <span className="text-slate-700">Alertas Inteligentes</span>
                  <span className="ml-auto bg-orange-100 text-orange-700">Tempo Real</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <BiShield className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Diagnóstico Avançado</span>
                  <span className="ml-auto bg-purple-100 text-purple-700">Automático</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-red-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-white">Pronto para Começar?</h2>
          <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
            Acesse o dashboard completo e comece a monitorar suas câmeras de segurança com todas as ferramentas profissionais
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
          <p>© 2025 Sistema de Monitoramento de Segurança. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default LandingPage
