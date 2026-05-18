import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import AnalysisPage from './pages/analysis'
import SettingsPage from './pages/settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/analysis/:id',
    element: <AnalysisPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}