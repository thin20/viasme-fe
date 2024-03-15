import React from "react";
import SideBarMenu from "@components/SideBar/SideBarMenu.jsx";
import { Outlet } from 'react-router-dom'
import Header from '@components/Header/Header.jsx'

function BasicLayout(prop) {
    return (
        <div className="basic-layout">
            <Header />
            <div className="viasm-container">
                <SideBarMenu></SideBarMenu>
                <div className="viasm-content">
                    <Outlet/>
                </div>
            </div>
            <div className="viasm-footer">Footer</div>
        </div>
    );
}

export default BasicLayout;
