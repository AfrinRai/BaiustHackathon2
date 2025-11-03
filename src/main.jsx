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
import Mission2 from './components/Mission2.jsx';
import Mission3 from './components/Mission3.jsx';
import Mission4 from './components/Mission4.jsx';
import CommunityMap from './components/Mission2.jsx';
import PrivateRoute from './provider/privateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root contains Navbar + Outlet
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/mission1", element: <PrivateRoute><Mission1 /></PrivateRoute> },
      { path: "/mission2", element: <Mission2 /> },
      { path: "/mission3", element: <Mission3 /> },
      { path: "/mission4", element: <Mission4 /> },
      { path: "/mission3", element: <Mission3/> },
      { path: "/mission2", element: <PrivateRoute><CommunityMap /></PrivateRoute> },
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
