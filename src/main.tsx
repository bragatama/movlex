import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const theme = createTheme({
  // 
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/movies",
    element: <h1>This is a movie</h1>
  },
  {
    path: "/series",
    element: <h1>This is a tv serie</h1>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
