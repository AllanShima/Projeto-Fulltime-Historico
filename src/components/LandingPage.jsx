import React, { useState } from 'react'

const LandingPage = () => {
  const [chosenLang, setChosenLang] = useState("pt");
  const selectedStyle = "font-bold";
  return (
    // O header, body e Footer são componentes únicos da Landingpage
    <>
      <div className='flex w-full h-20 justify-center p-2 bg-amber-300 shadow-md'>
        <div className='w-5/6 h-full bg-amber-800'> 
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
                      <h3 className='font-bold'>
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
      <div className='w-full h-fit'>
        <h1>Landing Page body</h1>
        {/* Botão p entrar na plataforma */}
        <a href="/register" className='flex w-fit h-fit ml-auto mr-auto'>
          <div className='flex w-full h-fit justify-center p-5 rounded-2xl text-white bg-red-500 shadow-lg'>
            <h1 className='flex font-bold'>
              Cadastrar um Novo Usuário
            </h1>
          </div>          
        </a>

      </div>
      <div className='w-full h-fit'>
        <h1>Landing Page Footer</h1>
      </div>
    </>
  )
}

export default LandingPage
