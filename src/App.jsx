import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Redirect from './pages/Redirect'
import AppLayout from './Layouts/AppLayout'
const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/link/:id",
        element:<Link/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/:id",
        element: <Redirect />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}

export default App
