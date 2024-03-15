import React from 'react';
import { Outlet } from 'react-router-dom'

function BlankLayout() {
    return (
        <div className={"blank-layout"}>
            <Outlet />
        </div>)
}

export default BlankLayout;
