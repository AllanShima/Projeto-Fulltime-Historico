import TabMonitor from './components/TabMonitor'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import TabHistory from './components/TabHistory'
import Header from './components/Header'
import Login from './components/Login'

function App() {

  const router = createBrowserRouter([
    // Default path
    {
      path: '/',
      element: (
        <>
          <Header/>
          <Outlet/>
        </>
      ),
      errorElement: <NotFoundPage/>,
      children: [
        {
          index: true, // Default child route
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
      path: '/login',
      element: <Login/>
    },
  ])

  return (
    <div className='w-screen h-screen flex flex-col bg-white'>
      <RouterProvider router={router}/>              
    </div>
  )
}

export default App
