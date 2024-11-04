import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import '@mantine/nprogress/styles.css';

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/movies",
        element: <h1>This is a movie</h1>
      },
      {
        path: "/series",
        element: <h1>This is a tv serie</h1>
      },
      {
        path: "/browse",
        element: <h1>This is a browse</h1>
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <NavigationProgress />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
