import React from 'react'

const LandingPage = () => {
  return (
    // O header, body e Footer são componentes únicos da Landingpage
    <>
      <div className='flex w-full h-20 justify-center p-2 bg-amber-300'>
        <div className='w-5/6 h-full bg-amber-800'> 

        <nav className='w-full h-full'>
          <ul className='w-full h-full'>
            <img className='w-fit h-full' src="https://fulltime.com.br/wp-content/themes/fulltime-brasil-1/images/logo.png" alt="Fulltime-logo" />
            <li>

            </li>
          </ul>
        </nav>
        
          
        
          
        </div>
      </div>
      <div className='w-full h-fit'>
        <h1>Landing Page body</h1>
      </div>
      <div className='w-full h-fit'>
        <h1>Landing Page Footer</h1>
      </div>
    </>
  )
}

export default LandingPage
