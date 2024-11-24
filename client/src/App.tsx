import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage'
import Register from './pages/register'
import { TaskProvider } from './context/taskContext'
import { ModalProvider } from './context/modalContext'
import { BoardProvider } from './context/boardContext'
import Login from './pages/login'
import { UserProvider } from './context/userContext'
import Fullname from './pages/fullname'
import InviteHandler from './components/InviteHandler'
import { GoogleOAuthProvider } from '@react-oauth/google'


const GOOGLE_AUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/set-info',
      element: <Fullname />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/invite',
      element: <InviteHandler />
    }
  ])

  return (
    <UserProvider>
      <TaskProvider>
        <ModalProvider>
          <BoardProvider>
            <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
              <RouterProvider router={router} />
            </GoogleOAuthProvider>
          </BoardProvider>
        </ModalProvider>
      </TaskProvider>
    </UserProvider>
  )
}

export default App
