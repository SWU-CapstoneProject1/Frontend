import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import AnalysisPage from './pages/analysis'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/analysis/:id',
    element: <AnalysisPage />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}