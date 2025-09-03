import { useState } from 'react'
import Header from './components/Header'
import Home from './Home'

function App() {

  return (
    <>
      <div className='w-screen h-screen flex flex-col bg-white'>
        <Header/>
        {/* Flex 1: Tailwind shortcut, which tells the element to grow and shrink to fill all available vertical space. */}
        <div className='flex flex-1 bg-white'>
          <Home/>                 
        </div>
      </div>
    </>
  )
}

export default App
