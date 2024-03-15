import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home.jsx';
import CharacterSheet from './pages/charactersheet.jsx';
import Encounters from './pages/encounters.jsx';
import Monsters from './pages/monsters.jsx';
import Profile from './pages/profile.jsx';
import Login from './pages/login.jsx';
import SignOut from './pages/signout.jsx';
import SignUp from './pages/signup.jsx';
import NotFound from './pages/NotFound.jsx';
import Gameboard from './pages/Gameboard.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/charactersheet',
        element: <CharacterSheet />
      },
      {
        path: '/encounters',
        element: <Encounters />
      },
      {
        path: '/monsters',
        element: <Monsters />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signout',
        element: <SignOut />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/gameboard',
        element: <Gameboard />
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
