import WindowMonitor from './components/WindowMonitor'
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
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { where, collection, query, doc, getDocs, getDoc } from 'firebase/firestore';
import Loading from './components/Loading'

function App() {

  const { userState, userDispatch } = useUserContext();

  const searchUserById = async (uid) => {
    // 1. Crie a referência DIRETA ao documento usando o UID
    const userDocRef = doc(db, "users", uid); 
    // Caminho: users/ [o valor do uid]

    // 2. Busque o documento
    const documentSnapshot = await getDoc(userDocRef);

    if (!documentSnapshot.empty) {
        // Pega o primeiro documento do array de resultados (como o UID é único, é o que queremos)
        const userData = documentSnapshot.data();
        // Retorna o objeto de dados do documento.
        //console.log(userData);
        return userData;
    } else {
        // O documento não existe.
        console.log("Nenhum usuário encontrado com este UID!");
        return null;
    }
  };

  // Armazenar o usuário logado ou não no data layer
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // se estiver logado
      if (user){
        // Buscando o usuário registrado no firestore
        const userData = await searchUserById(user.uid);
        // Armazenando o usuário logado no data layer
        //const fullName = userData.first + " " + userData.last;
        await userDispatch({ type: "LOGIN", payload: {uid: userData.uid, first: userData.first, last: userData.last, usertype: userData.usertype}});
        if(userData.usertype === "monitor"){
          //console.log("é monitor");
        } else{
          //console.log("é usuário");
        }
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
          element: <WindowMonitor/>
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
