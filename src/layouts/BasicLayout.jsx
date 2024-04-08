import React, { useEffect } from "react";
import SideBarMenu from "@components/SideBar/SideBarMenu.jsx";
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.jsx';
import { useSelector } from "react-redux";

function BasicLayout() {
    const visibleSideBar = useSelector((state) => state.app.visibleSideBar)

    const calcWidthContent = () => {
        const swapSidebar = document.getElementById('swap-sidebar')
        if (swapSidebar) {
            swapSidebar.style.width = '0px';
            swapSidebar.style.width = visibleSideBar ? 'var(--sidebar-width)' : '0px'
            swapSidebar.style.display = visibleSideBar ? 'block' : 'none'
        }
    }

    useEffect(() => {
        calcWidthContent()
    }, [visibleSideBar])

    return (
        <div className="basic-layout">
            <Header />
            <div className="viasm-container">
                <div id="swap-sidebar">
                    <SideBarMenu></SideBarMenu>
                </div>
                <div className="viasm-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default BasicLayout;
