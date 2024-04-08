import React from 'react';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import "primereact/resources/primereact.min.css";
import { Navigate, useRoutes } from "react-router-dom";
import BasicLayout from '@layouts/BasicLayout.jsx'
import BlankLayout from '@layouts/BlankLayout.jsx';
import SuKienDeXuat from "@/pages/user/sukien-dexuat/Index.jsx"
import SuKienKeHoach from "@/pages/user/sukien-kehoach/Index.jsx"
import DiemDanhSuKien from "@/pages/user/diemdanh-sukien/Index.jsx"
import QuanLyDongPhi from "@/pages/user/sukien-dongphi/Index.jsx"
import SuKienBaoCao from "@/pages/user/sukien-baocao/Index.jsx"
import Login from '@/pages/auth/Login.jsx'
import Register from '@/pages/auth/Register.jsx'
import './assets/style/index.scss'

const App = () => {
    const routes = useRoutes([
        {
            path: "/",
            index: true,
            element: <Navigate to="hoinghihoithao" />,
        },
        {
            path: "auth",
            element: <BlankLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />
                }
            ],
        },
        {
            path: "hoinghihoithao",
            element: <BasicLayout />,
            children: [
                {
                    path: "sukien-dexuat",
                    element: <SuKienDeXuat />,
                },
                {
                    path: "sukien-kehoach",
                    element: <SuKienKeHoach />,
                },
                {
                    path: "diemdanh-sukien",
                    element: <DiemDanhSuKien />,
                },
                {
                    path: "sukien-dongphi",
                    element: <QuanLyDongPhi />,
                },
                {
                    path: "sukien-baocao",
                    element: <SuKienBaoCao />,
                },
            ],
        },
        {
            path: '/*',
            element: <BasicLayout />
        }
    ]);

    return routes;
};

export default App;
