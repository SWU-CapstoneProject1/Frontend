import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import HomePage from './pages/home'
import AnalysisPage from './pages/analysis'
import SettingsPage from './pages/settings'
import LibraryPage from './pages/library';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/analysis',
    element: <Navigate to="/analysis/netflix" replace />,
  },
  {
    path: '/analysis/:id',
    element: <AnalysisPage />,
  },
  {
    path: '/library', 
    element: <LibraryPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}