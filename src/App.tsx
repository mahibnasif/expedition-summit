import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Summit from './pages/Summit'
import Mun from './pages/Mun'
import Speakers from './pages/Speakers'
import Committees from './pages/Committees'
import Schedule from './pages/Schedule'
import Sponsors from './pages/Sponsors'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Portal from './pages/Portal'
import Organizer from './pages/Organizer'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/summit', element: <Summit /> },
      { path: '/mun', element: <Mun /> },
      { path: '/speakers', element: <Speakers /> },
      { path: '/committees', element: <Committees /> },
      { path: '/schedule', element: <Schedule /> },
      { path: '/sponsors', element: <Sponsors /> },
      { path: '/faq', element: <Faq /> },
      { path: '/contact', element: <Contact /> },
      { path: '/register', element: <Register /> },
      { path: '/portal', element: <Portal /> },
      { path: '/organizer', element: <Organizer /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
