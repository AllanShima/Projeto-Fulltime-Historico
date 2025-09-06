import React from 'react'

const Login = () => {
  return (
    <div className='flex w-full h-full items-center justify-center bg-amber-50'>
        <div className='grid w-1/2 h-full items-center justify-center bg-amber-400'>
            {/* Fulltime Logo */}
            <div className='flex content-center mt-auto mb-auto w-1/2 space-x-4'>
                <img src="/icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
                <h1 className='mt-auto mb-auto font-regular text-primary'>
                    FullCenter
                </h1>
            </div>
            
            {/* Welcome title */}
            <h1>Bom te ver novamente</h1>
            {/* Sign in box */}        
            <div className='grid items-center w-120 h-80 bg-white shadow-lg rounded-sm p-6'>
                <span className=''>
                    <h3>Seu email</h3>
                    <input className='w-full h-10 pl-6 rounded-xs' type="text" value={"e.g.elon@gmail.com"} />                    
                </span>
                <span>
                    <h3>Sua senha</h3>
                    <input className='w-full h-10 pl-6 rounded-xs' type="text" value={"e.g.elon@gmail.com"} />                    
                </span> 
            
                <button className='w-5/6 h-10 ml-auto mr-auto rounded-2xl bg-amber-500'>
                    Sign In
                </button>
                
            </div>    
        </div>

    </div>
  )
}

export default Login
