import WindowMonitor from './components/WindowMonitor'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import TabHistory from './components/TabHistory'
import HeaderMonitor from './components/HeaderMonitor'
import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import HeaderUser from './components/HeaderUser'
import WindowUser from './components/WindowUser'

function App() {

  const router = createBrowserRouter([
    // Default path
    {
      //index: true, // Default child route
      path: '/',
      element: <LandingPage/>,
      errorElement: <NotFoundPage/>,
    },
    {
      path: '/monitor',
      element: (
        <>
          <HeaderMonitor/>
          <Outlet/>
        </>
      ),
      children: [
        {
          path: 'cameras',
          element: <WindowMonitor/>
        },
        {
          path: 'history',
          element: <TabHistory/>
        }
      ]
    },
    {
      path: '/user',
      element: (
        <>
          <HeaderUser/>
          <Outlet/>
        </>
      ),
      children: [
        {
          index: true, // Default child route
          path: 'home',
          element: <WindowUser/>
        }
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
  ])

  return (
    <div className='w-screen h-screen flex flex-col bg-white'>
      <RouterProvider router={router}/>              
    </div>      
  )
}

export default App
