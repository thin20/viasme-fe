import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar } from '@/store/modules/app.js'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

function SideBarMenu() {
    const visibleSideBar = useSelector((state) => state.app.visibleSideBar)
    const dispatch = useDispatch()

    const onCloSideBar = () => {
        dispatch(toggleSideBar({ onClose: true }))
    }
    return (
        <div className="card flex justify-content-center sidebar-menu">
            <Sidebar visible={visibleSideBar} onHide={() => onCloSideBar()} closeOnEscape={false} style={{display: "block"}}>
                <h2>Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>
        </div>
    );
}

export default SideBarMenu;
