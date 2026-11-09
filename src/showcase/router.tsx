import { createHashRouter } from 'react-router'
import { AppShell } from './layout/AppShell'
import { ComponentPage } from './pages/ComponentPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { StylingPage } from './pages/StylingPage'

// O hash funciona em qualquer subcaminho do GitHub Pages, sem 404.html.
export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'styling', element: <StylingPage /> },
      { path: 'components/:slug', element: <ComponentPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
