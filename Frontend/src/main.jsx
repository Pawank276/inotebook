import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import App from './App.jsx'
import About from './components/About'
import Home from './Routes/Home.jsx';
import noteStore from './store/index.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import Editform from './components/Editform.jsx'
import Addnote from './components/Addnote.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import User from './components/User.jsx'
import Hero from './components/Hero.jsx'
import Note from './components/Note.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/home", element: <Home /> },
      { path: "/addnote", element: <Addnote /> },
      { path: '/about', element: <About /> },
      { path: '/editnote', element: <Editform /> },
      { path: '/fetchnote', element: <Note /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/user', element: <User /> },
    ]
  }
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={noteStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
