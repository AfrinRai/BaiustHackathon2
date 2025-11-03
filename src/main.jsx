import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import RegisterForm from './components/signup.jsx';
import Root from './components/Root.jsx';
import Auth_provider from './provider/Auth_provider.jsx';
import NotFound from './error.jsx'; 
import Mission1 from './components/Mission1.jsx';
// import Mission2 from './pages/Mission2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root contains Navbar + Outlet
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/mission1", element: <Mission1 /> },
      // { path: "/mission2", element: <Mission2 /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth_provider>
      <RouterProvider router={router} />
    </Auth_provider>
  </StrictMode>
);
