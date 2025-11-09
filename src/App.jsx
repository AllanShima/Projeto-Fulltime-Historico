import TabCamera from './components/TabCamera'
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import TabHistory from './components/TabHistory'
import HeaderMonitor from './components/HeaderMonitor'
import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import HeaderUser from './components/HeaderUser'
import WindowUser from './components/WindowUser'
import { useUserContext } from './contexts/user-context'
import TabChat from './components/TabChat'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import Loading from './components/Loading'
import { firestoreGetAlertOnByUid, firestoreGetUserById } from './services/api/FirebaseGetFunctions'
import { auth } from './services/firebase'

function App() {
  const { userState, userDispatch } = useUserContext();
  // Armazenar o usuário logado ou não no data layer
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // se estiver logado
      if (user){
        // Buscando o usuário registrado no firestore
        const userData = await firestoreGetUserById(user.uid);
        const currentAlert = await firestoreGetAlertOnByUid(user.uid);
        // console.log("Logando...Tipo de alerta ligado: " + currentAlert);
        // Armazenando o usuário logado no data layer
        //const fullName = userData.first + " " + userData.last;
        await userDispatch({ type: "LOGIN", payload: {uid: userData.uid, first: userData.first, last: userData.last, usertype: userData.usertype, alertOn: currentAlert}});
      } else {
        userDispatch({ type: "LOGOUT" })
      }
    })
  }, []);

  const mainRouter = createBrowserRouter([
    // Caminho Padrão
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
          element: <TabCamera/>
        },
        {
          path: 'history',
          element: <TabHistory/>
        },
        {
          path: 'chat',
          element: <TabChat/>
        },
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
    {
      path: '/loading',
      element: <Loading/>
    },
  ])

  // const guestRouter = createBrowserRouter([
  //   // Caminho do visitante
  //   {
  //     //index: true, // Default child route
  //     path: '/',
  //     element: <LandingPage/>,
  //     errorElement: <NotFoundPage/>,
  //   },
  //   {
  //     path: '/login',
  //     element: <Login/>
  //   },
  //   {
  //     path: '/register',
  //     element: <Register/>
  //   },
  // ])

  return (
    <div className='w-screen h-screen flex flex-col bg-white'>
      <RouterProvider router={mainRouter}/>
    </div>      
  )
}

export default App
