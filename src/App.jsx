import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Redirect from './pages/Redirect'
import AppLayout from './Layouts/AppLayout'
import UrlProvider from './Context'
import Requireauth from './components/Requireauth'
import Links from './pages/Link'
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
        element:(
          <Requireauth>
            <Dashboard/>
          </Requireauth>
        )
      },
      {
        path:"/link/:id",
        element:(
          <Requireauth>
            <Links/>
          </Requireauth>
        )
      },
      {
        path:"/auth",
        element:
          <Auth/>
      },
      {
        path:"/:id",
        element: <Redirect />
      }
    ]
  }
])
function App() {
  return <UrlProvider>
    <RouterProvider router={router}/>
  </UrlProvider>
}

export default App
