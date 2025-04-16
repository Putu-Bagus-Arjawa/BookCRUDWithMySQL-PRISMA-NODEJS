import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateBook from './pages/UpdateBook.jsx'
import CreateBook from './pages/CreateBook.jsx'
import NotFound from './pages/NotFound.jsx'
import Author from './pages/Author.jsx'
import CreateAuthor from './pages/CreateAuthor.jsx'
import Home from './pages/Home.jsx'

const router =  createBrowserRouter([
  {path:"/", element:<Home/>},
  {path:"/update/:id", element:<UpdateBook/>},
  {path:"/create", element: <CreateBook/>},
  {path:"/create/author", element: <CreateAuthor/>},
  {path: "/authors", element: <Author/>},
  {path:"*", element:<NotFound/>},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router ={router}/>
  </StrictMode>,
)

