import React,{ useState } from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteLayout from './RouteLayout/RouteLayout';

import Tabs from './Pages/Home/Home';
function App() {

  const router = createBrowserRouter([
    {
      path: "/My-Todo-App",
      element: <RouteLayout />,
      //errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Tabs /> },
        // { path: '/explore', element: <ExporePage /> },
        // { path: '/reel', element: <ReelPage /> },
        // { path: '/messages', element: <MessagesPage /> },
        // { path: '/profile', element: <ProfilePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
