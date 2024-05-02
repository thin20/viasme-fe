import React, { useEffect, useState } from 'react';
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
import { store } from '@/store/store.js';
import { loginByTokenStore, loginByTokenAsync, initUser } from "@store/modules/user.js";
import { useCookies } from "react-cookie";
import { COOKIE_USER_INFO } from '@/constants/appConstants.ts'
import { useDispatch, useSelector } from 'react-redux';
import { loginByToken } from "@/services/user/index.js";

const App = () => {
    const dispatch = useDispatch();
    // const useInfo = useSelector((state) => state.user.info)
    const [cookies, setCookie] = useCookies([COOKIE_USER_INFO]);
    const [authen, setAuthen] = useState(cookies[COOKIE_USER_INFO])

    // useEffect(() => {
    //     // dispatch(loginByTokenAsync(cookies[COOKIE_USER_INFO]))
    //     dispatch(loginByTokenAsync(cookies[COOKIE_USER_INFO]))
    // }, [dispatch])

    useEffect(() => {
        loginByToken(cookies[COOKIE_USER_INFO]).then(rs => {
            dispatch(initUser(rs))
            setAuthen(!!rs)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const isLogin = () => {
        const user = store?.getState()?.user

        if (!user || !user.token) return false

        return true
    }

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
                    element: authen ? <SuKienDeXuat/> : <Navigate to="/auth/login" />,
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
