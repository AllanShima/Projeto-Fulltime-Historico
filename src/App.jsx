import TabMonitor from './components/TabMonitor'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import TabHistory from './components/TabHistory'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import HomeUser from './components/HomeUser'
import LandingPage from './components/LandingPage'
import HeaderUser from './components/HeaderUser'
import UserContext from './contexts/user-context'

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
          <Header/>
          <Outlet/>
        </>
      ),
      children: [
        {
          path: 'monitor/cameras',
          element: <TabMonitor/>
        },
        {
          path: 'monitor/history',
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
          path: 'user/home',
          element: <HomeUser/>
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
    <UserContext>
      <div className='w-screen h-screen flex flex-col bg-white'>
        <RouterProvider router={router}/>              
      </div>      
    </UserContext>
  )
}

export default App
