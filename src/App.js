import React from 'react';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import { Navigate, useRoutes } from "react-router-dom";
import BasicLayout from '@layouts/BasicLayout.jsx'
import BlankLayout from '@layouts/BlankLayout.jsx';
import Home from "@/pages/user/Home.jsx";
import Home2 from "@/pages/user/Home2.jsx";
import Login from '@/pages/auth/Login.jsx'
import Register from '@/pages/auth/Register.jsx'
import './assets/style/index.scss'

const App = () => {
    const routes = useRoutes([
        {
            path: "/",
            index: true,
            element: <Navigate to="/home" />,
        },
        {
            path: "/auth",
            element: <BlankLayout />,
            children: [
                {
                    path: "/auth/login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />
                }
            ],
        },
        {
            path: "/",
            element: <BasicLayout />,
            children: [
                {
                    path: "home",
                    element: <Home />,
                },
                {
                    path: "home2",
                    element: <Home2 />,
                },
            ],
        },
    ]);

    console.log('routes: ', routes)

    return routes;
};

export default App;
