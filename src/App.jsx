import Header from './components/Header'
import HomeMonitor from './components/HomeMonitor'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import HomeCam from './components/HomeCam'
import HomeHistory from './components/HomeHistory'

function App() {

  const router = createBrowserRouter([
    // Default path
    {
      path: '/',
      element: (
        <>
          <Header/>
          <HomeHistory/>
          {/* <HomeMonitor/> */}
        </>
      ),
      errorElement: <NotFoundPage/>,
      children: [
        {
          path: '/monitor/cameras',
          element: <HomeCam/>
        },
        {
          path: '/monitor/history',
          element: <HomeHistory/>
        }
      ]
    },
  ])

  return (
    <div className='w-screen h-screen flex flex-col bg-white'>
      <RouterProvider router={router}/>              
    </div>
  )
}

export default App
