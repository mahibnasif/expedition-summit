import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/layout/Layout'
import PageLoader from './components/ui/PageLoader'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Events = lazy(() => import('./pages/Events'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const Register = lazy(() => import('./pages/Register'))
const Portal = lazy(() => import('./pages/Portal'))
const Organizer = lazy(() => import('./pages/Organizer'))
const NotFound = lazy(() => import('./pages/NotFound'))

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/events', element: <Events /> },
  { path: '/faq', element: <Faq /> },
  { path: '/contact', element: <Contact /> },
  { path: '/register', element: <Register /> },
  { path: '/portal', element: <Portal /> },
  { path: '/organizer', element: <Organizer /> },
  { path: '*', element: <NotFound /> },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes.map((route) => ({
      ...route,
      element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>,
    })),
  },
])

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
