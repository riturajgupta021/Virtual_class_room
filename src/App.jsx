import Register from './Components/Register'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Components/HomePage'
import VideoPage from './Components/VideoPage'
import Login from './Components/Login'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <HomePage/>
    },
    {
      path:"/room/:id",
      element: <VideoPage/>
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/register",
      element: <Register/>
    }
  ])

  return (
    <>
     <div className='App'>
      <RouterProvider router={router}/>

     </div>

    </>
  )
}

export default App
